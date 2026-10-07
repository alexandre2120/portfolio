import type { Metadata } from "next"

import { LinksPainel } from "@/components/links/LinksPainel"

export const metadata: Metadata = {
  title: "Painel de links",
  robots: { index: false, follow: false },
}

export default function Painel() {
  return <LinksPainel />
}
