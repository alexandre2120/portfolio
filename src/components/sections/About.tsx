"use client"

import { Container } from "@/components/ui/Container"
import { useTranslation } from "@/lib/i18n"

export function About() {
  const { t, tArray } = useTranslation()

  const paragraphs = tArray("about.paragraphs")

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Section label — editorial style */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] uppercase dark:text-[var(--color-accent-light)]">
                01
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                {t("about.title")}
              </h2>
              <div className="mt-4 h-px w-12 bg-[var(--color-accent)]" />
            </div>
          </div>

          {/* Content — editorial serif paragraphs */}
          <div className="space-y-6 lg:col-span-8">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? "text-lg leading-relaxed text-zinc-700 dark:text-zinc-300"
                    : "text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
