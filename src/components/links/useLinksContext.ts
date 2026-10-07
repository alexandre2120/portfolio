"use client"

import { useSyncExternalStore } from "react"

import type { LinksLocale } from "@/content/links"

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]

/* Locale: Portuguese by default, English on the toggle, remembered per viewer. */

const LOCALE_KEY = "links-locale"
const localeListeners = new Set<() => void>()

function readLocale(): LinksLocale {
  try {
    return window.localStorage.getItem(LOCALE_KEY) === "en" ? "en" : "pt"
  } catch {
    return "pt"
  }
}

function subscribeLocale(callback: () => void) {
  localeListeners.add(callback)
  return () => {
    localeListeners.delete(callback)
  }
}

export function useLinksLocale() {
  const locale = useSyncExternalStore(subscribeLocale, readLocale, () => "pt" as const)
  const setLocale = (next: LinksLocale) => {
    try {
      window.localStorage.setItem(LOCALE_KEY, next)
    } catch {
      // Private mode: the toggle still works for this render.
    }
    document.documentElement.lang = next === "pt" ? "pt" : "en"
    localeListeners.forEach((listener) => listener())
  }
  return [locale, setLocale] as const
}

/*
 * Visit context: the UTM parameters this page was opened with, plus the
 * referrer. It is appended to every outbound /links/go/<id> URL so each click
 * keeps the channel the visitor came from.
 */

let cachedContext: { query: string; params: Record<string, string> } | null = null

function readContext() {
  if (cachedContext) return cachedContext
  const params: Record<string, string> = {}
  const search = new URLSearchParams(window.location.search)
  for (const key of UTM_KEYS) {
    const value = search.get(key)?.trim()
    if (value) params[key] = value.slice(0, 100)
  }
  // Short alias for hand-typed links: /links?s=instagram
  const alias = search.get("s")?.trim()
  if (alias && !params.utm_source) params.utm_source = alias.slice(0, 100)

  const referrer = document.referrer
  if (referrer && !referrer.startsWith(window.location.origin)) params.ref = referrer.slice(0, 300)

  const query = new URLSearchParams(params).toString()
  cachedContext = { query: query ? `?${query}` : "", params }
  return cachedContext
}

export function visitParams() {
  return readContext().params
}

const emptyContext = { query: "", params: {} as Record<string, string> }

export function useVisitContext() {
  return useSyncExternalStore(
    () => () => {},
    readContext,
    () => emptyContext,
  )
}

export function beacon(payload: Record<string, string | undefined>) {
  const body = JSON.stringify(payload)
  try {
    if (navigator.sendBeacon?.("/links/api/e", body)) return
  } catch {
    // Fall through to fetch.
  }
  void fetch("/links/api/e", { method: "POST", body, keepalive: true }).catch(() => {})
}
