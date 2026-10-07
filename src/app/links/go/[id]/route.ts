import { after, NextResponse, type NextRequest } from "next/server"

import { findLink } from "@/content/links"
import {
  buildTarget,
  isPrefetch,
  pickUtm,
  refHost,
  sendEvent,
} from "@/lib/links-tracking"

export const dynamic = "force-dynamic"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const link = findLink(id)

  if (!link) {
    return NextResponse.redirect(new URL("/links", request.url), 302)
  }

  const query = request.nextUrl.searchParams
  const utm = pickUtm(query)
  const target = buildTarget(link, utm)

  if (!isPrefetch(request.headers)) {
    const headers = new Headers(request.headers)
    after(() =>
      sendEvent(
        { type: "click", link: link.id, ref: refHost(query.get("ref")), path: "/links", ...utm },
        headers,
      ),
    )
  }

  const response = NextResponse.redirect(target, 302)
  response.headers.set("Cache-Control", "no-store")
  response.headers.set("X-Robots-Tag", "noindex, nofollow")
  return response
}
