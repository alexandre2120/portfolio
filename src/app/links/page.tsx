import type { Metadata } from "next"

import { LinksPage } from "@/components/links/LinksPage"

export const metadata: Metadata = {
  title: "Links",
  description:
    "Oficina Studio, Orquestra de Um, Mensagi, Aestum e onde encontrar o Alexandre Jaques.",
  alternates: { canonical: "/links" },
  openGraph: {
    title: "Alexandre Jaques · Links",
    description: "Oficina Studio, Orquestra de Um, Mensagi, Aestum e redes.",
    url: "/links",
    type: "website",
    siteName: "Alexandre Jaques",
  },
}

export default function Links() {
  return <LinksPage />
}
