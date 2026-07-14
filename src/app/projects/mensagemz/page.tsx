import { type Metadata } from "next"

import { MensagemzCaseStudy } from "@/components/case-studies/MensagemzCaseStudy"
import { RevealObserver } from "@/components/RevealObserver"

export const metadata: Metadata = {
  title: "Mensagemz - Case Study",
  description:
    "Architecture and solution design of Mensagemz: a multi-tenant, AI-powered messaging and scheduling SaaS designed and engineered solo, with AI as a force multiplier.",
}

export default function MensagemzPage() {
  return (
    <>
      <MensagemzCaseStudy />
      <RevealObserver />
    </>
  )
}
