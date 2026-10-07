import { after, NextResponse, type NextRequest } from "next/server"

import { findLink } from "@/content/links"
import { isPrefetch, pickUtm, refHost, sendEvent } from "@/lib/links-tracking"

export const dynamic = "force-dynamic"

/**
 * Beacon endpoint for the /links page: page views, and clicks on links that
 * cannot go through the redirect route (mailto). Same origin on purpose, so
 * blockers that drop third-party collectors leave it alone.
 */
export async function POST(request: NextRequest) {
  if (isPrefetch(request.headers)) return new NextResponse(null, { status: 204 })

  let body: Record<string, unknown> = {}
  try {
    body = JSON.parse((await request.text()).slice(0, 4000)) as Record<string, unknown>
  } catch {
    return new NextResponse(null, { status: 400 })
  }

  const type = body.type === "click" ? "click" : "view"
  const link = typeof body.link === "string" ? findLink(body.link) : undefined
  if (type === "click" && !link) return new NextResponse(null, { status: 400 })

  const headers = new Headers(request.headers)
  after(() =>
    sendEvent(
      {
        type,
        link: link?.id,
        ref: refHost(typeof body.ref === "string" ? body.ref : undefined),
        path: "/links",
        ...pickUtm(body),
      },
      headers,
    ),
  )

  return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } })
}
