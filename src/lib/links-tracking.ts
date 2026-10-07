import "server-only"

import { OWN_DOMAINS, type LinkItem } from "@/content/links"

/**
 * Click tracking for /links. Events go to the links-api service on the
 * products VPS (repo alexandre2120/links-api), which also serves the
 * aggregated numbers to /links/painel. The service never stores the IP or the
 * user agent: it derives a daily visitor hash, the device and the browser,
 * then drops both.
 */
export const LINKS_API_URL =
  process.env.LINKS_API_URL ?? "https://links-api.169.58.162.165.sslip.io"

/**
 * Only production sends events, so local dev and Vercel previews never
 * pollute the real numbers. LINKS_TRACK=1 forces it on for a test.
 */
const TRACKING_ON =
  process.env.VERCEL_ENV === "production" || process.env.LINKS_TRACK === "1"

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>

export type TrackedEvent = Utm & {
  type: "view" | "click"
  link?: string
  ref?: string
  path?: string
}

function clean(value: string | null | undefined, max = 100) {
  if (!value) return undefined
  const trimmed = value.trim().slice(0, max)
  return trimmed || undefined
}

export function pickUtm(params: URLSearchParams | Record<string, unknown>): Utm {
  const get = (key: string) =>
    params instanceof URLSearchParams
      ? params.get(key)
      : typeof params[key] === "string"
        ? (params[key] as string)
        : null

  const utm: Utm = {}
  for (const key of UTM_KEYS) {
    const value = clean(get(key))
    if (value) utm[key] = value.toLowerCase()
  }
  return utm
}

/** Referrer host only, without www. Anything unparsable is dropped. */
export function refHost(value: string | null | undefined) {
  const raw = clean(value, 300)
  if (!raw) return undefined
  try {
    const host = new URL(raw.includes("://") ? raw : `https://${raw}`).hostname
    return host.replace(/^www\./, "") || undefined
  } catch {
    return undefined
  }
}

function isOwnDomain(href: string) {
  try {
    const host = new URL(href).hostname.replace(/^www\./, "")
    return OWN_DOMAINS.some((domain) => host === domain || host.endsWith(`.${domain}`))
  } catch {
    return false
  }
}

/**
 * Outbound URL. Own domains receive:
 * utm_source=alexandrejaques.com, utm_medium=link-in-bio,
 * utm_campaign=<channel the visitor came from, or "direto">,
 * utm_content=<link id>.
 */
export function buildTarget(link: LinkItem, utm: Utm) {
  if (!isOwnDomain(link.href)) return link.href
  const url = new URL(link.href)
  url.searchParams.set("utm_source", "alexandrejaques.com")
  url.searchParams.set("utm_medium", "link-in-bio")
  url.searchParams.set("utm_campaign", utm.utm_source ?? "direto")
  url.searchParams.set("utm_content", link.id)
  return url.toString()
}

export function requestContext(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  return {
    ip: forwarded || headers.get("x-real-ip") || undefined,
    ua: headers.get("user-agent") || undefined,
    country: headers.get("x-vercel-ip-country") || undefined,
  }
}

/** Prefetches and previews must never count as visits or clicks. */
export function isPrefetch(headers: Headers) {
  const purpose = `${headers.get("purpose") ?? ""} ${headers.get("sec-purpose") ?? ""}`
  return (
    purpose.includes("prefetch") ||
    purpose.includes("prerender") ||
    headers.has("next-router-prefetch")
  )
}

export async function sendEvent(event: TrackedEvent, headers: Headers) {
  if (!TRACKING_ON) return
  try {
    await fetch(`${LINKS_API_URL}/e`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...event, ...requestContext(headers) }),
      signal: AbortSignal.timeout(2500),
      cache: "no-store",
    })
  } catch {
    // Tracking must never break navigation.
  }
}
