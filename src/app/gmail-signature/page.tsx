import { type Metadata } from "next"
import { Container } from "@/components/ui/Container"
import { GmailSignatureGenerator } from "@/components/GmailSignatureGenerator"

export const metadata: Metadata = {
  title: "Gmail Signature Generator",
  description: "Generate a professional Gmail signature",
}

export default function GmailSignaturePage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mb-12">
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] uppercase dark:text-[var(--color-accent-light)]">
            Tool
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Gmail Signature
          </h1>
          <div className="mt-4 h-px w-12 bg-[var(--color-accent)]" />
          <p className="mt-4 max-w-lg text-sm text-zinc-600 dark:text-zinc-400">
            Copy the signature below directly into your Gmail settings, or download as an image.
          </p>
        </div>

        <GmailSignatureGenerator />
      </Container>
    </section>
  )
}
