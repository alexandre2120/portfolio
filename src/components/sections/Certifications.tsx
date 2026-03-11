"use client"

import { Container } from "@/components/ui/Container"
import { useTranslation } from "@/lib/i18n"

/* ─── Certificate Icon ─── */

function CertificateIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 15l-2 5 2-1.5L14 20l-2-5z" stroke="currentColor" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="10" r="6" stroke="currentColor" />
      <path d="M9.5 9.5l1.5 1.5 3-3" stroke="currentColor" />
    </svg>
  )
}

/* ─── Certification data ─── */

type Certification = {
  name: { en: string; pt: string }
  provider: string
  date: string
  expires?: string
  credentialUrl?: string
}

type CertGroup = {
  provider: string
  color: string
  certs: Certification[]
}

const certGroups: CertGroup[] = [
  {
    provider: "Duolingo",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    certs: [
      {
        name: {
          en: "English Proficiency Certificate",
          pt: "Certificado de Proficiência em Inglês",
        },
        provider: "Duolingo English Test",
        date: "Jan 2026",
        expires: "Jan 2028",
      },
    ],
  },
  {
    provider: "G4",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    certs: [
      {
        name: {
          en: "G4 Customer Experience Certification",
          pt: "Certificação G4 Customer Experience",
        },
        provider: "G4",
        date: "Jan 2023",
      },
    ],
  },
  {
    provider: "Udemy",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    certs: [
      {
        name: {
          en: "JavaScript, React, Next.js, Vue, Node & More",
          pt: "Javascript React Next Vue Node HTML CSS jQuery Bootstrap Webpack Gulp MySQL",
        },
        provider: "Udemy",
        date: "May 2022",
        credentialUrl: "https://www.udemy.com/certificate/UC-675b5f21-3647-4aa9-8beb-2faf8c08b8e0/",
      },
      {
        name: {
          en: "Next.js & React - Complete Course",
          pt: "Next.js e React - Curso Completo",
        },
        provider: "Udemy",
        date: "May 2022",
      },
    ],
  },
  {
    provider: "Alura",
    color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    certs: [
      {
        name: {
          en: "React: Understanding How the Library Works",
          pt: "React: Entendendo como a biblioteca funciona",
        },
        provider: "Alura",
        date: "Oct 2021",
      },
      {
        name: {
          en: "JavaScript: First Steps with the Language",
          pt: "JavaScript: primeiros passos com a linguagem",
        },
        provider: "Alura",
        date: "Jun 2021",
      },
      {
        name: {
          en: "HTML5 & CSS3 Part 3: Forms and Tables",
          pt: "HTML5 e CSS3 parte 3: Trabalhando com formulários e tabelas",
        },
        provider: "Alura",
        date: "May 2021",
      },
      {
        name: {
          en: "Git & Github: Version Control",
          pt: "Git e Github: Controle e compartilhe seu código",
        },
        provider: "Alura",
        date: "May 2021",
      },
      {
        name: {
          en: "HTML5 & CSS3 Part 2: Positioning & Navigation",
          pt: "HTML5 e CSS3 parte 2: Posicionamento, listas e navegação",
        },
        provider: "Alura",
        date: "May 2021",
      },
      {
        name: {
          en: "HTML5 & CSS3 Part 1: Your First Web Page",
          pt: "HTML5 e CSS3 parte 1: A primeira página da Web",
        },
        provider: "Alura",
        date: "May 2021",
      },
    ],
  },
]

/* ─── Main Section ─── */

export function Certifications() {
  const { t, locale } = useTranslation()

  return (
    <section id="certifications" className="section-fade relative py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Section label */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] uppercase dark:text-[var(--color-accent-light)]">
                04
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                {t("certifications.title")}
              </h2>
              <div className="mt-4 h-px w-12 bg-[var(--color-accent)]" />
            </div>
          </div>

          {/* Certification groups */}
          <div className="space-y-8 lg:col-span-8">
            {certGroups.map((group) => (
              <div key={group.provider}>
                {/* Provider heading */}
                <div className="mb-4 flex items-center gap-3">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-md ${group.color}`}>
                    <CertificateIcon className="h-4 w-4" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-sm font-bold tracking-tight text-zinc-900 uppercase dark:text-zinc-100">
                    {group.provider}
                  </h3>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-zinc-400 dark:text-zinc-600">
                    {group.certs.length === 1
                      ? `1 ${locale === "pt" ? "certificado" : "certificate"}`
                      : `${group.certs.length} ${locale === "pt" ? "certificados" : "certificates"}`}
                  </span>
                </div>

                {/* Cert list */}
                <div className="space-y-2">
                  {group.certs.map((cert, i) => (
                    <div
                      key={i}
                      className="group flex items-start justify-between gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 transition hover:border-[var(--color-accent)]/30 sm:items-center sm:px-5 dark:border-[var(--color-border-dark)] dark:bg-[var(--color-surface-elevated-dark)] dark:hover:border-[var(--color-accent)]/30"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                          {cert.credentialUrl ? (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-light)]"
                            >
                              {cert.name[locale]}
                              <span className="ml-1.5 inline-block text-zinc-400 transition group-hover:translate-x-0.5 dark:text-zinc-500">
                                &rarr;
                              </span>
                            </a>
                          ) : (
                            cert.name[locale]
                          )}
                        </p>
                        {cert.expires && (
                          <p className="mt-0.5 font-[family-name:var(--font-mono)] text-xs text-zinc-400 dark:text-zinc-500">
                            {t("certifications.expires")}: {cert.expires}
                          </p>
                        )}
                      </div>
                      <span className="flex-none font-[family-name:var(--font-mono)] text-xs tabular-nums text-zinc-400 dark:text-zinc-500">
                        {cert.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
