"use client"

import { Container } from "@/components/ui/Container"
import { useTranslation } from "@/lib/i18n"

/* ─── Testimonial data ─── */

type Testimonial = {
  name: string
  role: { en: string; pt: string }
  company: string
  relationship: { en: string; pt: string }
  quote: { en: string; pt: string }
}

const testimonials: Testimonial[] = [
  {
    name: "Fernando Cavalcanti",
    role: {
      en: "CEO & Co-Founder",
      pt: "CEO & Co-Fundador",
    },
    company: "ChatGuru",
    relationship: {
      en: "Managed Alexandre directly",
      pt: "Gerenciou Alexandre diretamente",
    },
    quote: {
      en: "Alexandre was our very first hire at ChatGuru, and since then he has proven to be an extremely versatile, committed, and responsible professional. He has a unique ability to learn and adapt, is easy to work with, intelligent, and someone you can trust completely.",
      pt: "Alexandre foi nosso primeiro contratado no ChatGuru, e desde então ele provou ser um profissional extremamente versátil, comprometido e responsável. Ele tem uma habilidade única de aprender e se adaptar, é fácil de trabalhar, inteligente, e alguém em quem você pode confiar completamente.",
    },
  },
  {
    name: "Iaron Simis",
    role: {
      en: "Co-Founder & CTO",
      pt: "Co-Fundador & CTO",
    },
    company: "ChatGuru",
    relationship: {
      en: "Senior colleague",
      pt: "Colega sênior",
    },
    quote: {
      en: "Alex was one of the first people at ChatGuru and played a key role in our growth. He learns fast, adapts quickly, and consistently delivered what we needed, even in the most demanding moments. Besides being a strong professional, he's also a genuinely good person — reliable, easy to work with, and very attentive to details.",
      pt: "Alex foi uma das primeiras pessoas no ChatGuru e desempenhou um papel fundamental no nosso crescimento. Ele aprende rápido, se adapta rapidamente e entregou consistentemente o que precisávamos, mesmo nos momentos mais exigentes. Além de ser um profissional forte, ele também é uma pessoa genuinamente boa — confiável, fácil de trabalhar e muito atento aos detalhes.",
    },
  },
]

/* ─── Decorative quote mark ─── */

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  )
}

/* ─── Main Section ─── */

export function Testimonials() {
  const { t, locale } = useTranslation()

  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Section label */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] uppercase dark:text-[var(--color-accent-light)]">
                04
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                {t("testimonials.title")}
              </h2>
              <div className="mt-4 h-px w-12 bg-[var(--color-accent)]" />
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                {t("testimonials.subtitle")}
              </p>
            </div>
          </div>

          {/* Testimonial cards */}
          <div className="space-y-6 lg:col-span-8">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="group relative rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 transition hover:border-[var(--color-accent)]/30 hover:shadow-lg sm:p-8 dark:border-[var(--color-border-dark)] dark:bg-[var(--color-surface-elevated-dark)] dark:hover:border-[var(--color-accent)]/30"
              >
                {/* Decorative quote */}
                <QuoteMark className="absolute top-5 right-6 h-10 w-10 text-zinc-100 sm:top-6 sm:right-8 sm:h-12 sm:w-12 dark:text-zinc-800/60" />

                {/* Quote text */}
                <blockquote className="relative">
                  <p className="text-sm leading-relaxed text-zinc-700 italic sm:text-base dark:text-zinc-300">
                    &ldquo;{testimonial.quote[locale]}&rdquo;
                  </p>
                </blockquote>

                {/* Attribution */}
                <figcaption className="mt-5 flex items-center gap-3 border-t border-[var(--color-border)] pt-5 dark:border-[var(--color-border-dark)]">
                  {/* Initials avatar */}
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[var(--color-accent-muted)]">
                    <span className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--color-accent)] dark:text-[var(--color-accent-light)]">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {testimonial.name}
                    </p>
                    <p className="font-[family-name:var(--font-mono)] text-xs text-zinc-500 dark:text-zinc-400">
                      {testimonial.role[locale]}, {testimonial.company}
                      <span className="mx-1.5 text-zinc-300 dark:text-zinc-600">
                        ·
                      </span>
                      {testimonial.relationship[locale]}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
