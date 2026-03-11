"use client"

import { Container } from "@/components/ui/Container"
import { useTranslation } from "@/lib/i18n"

type Project = {
  name: string
  description: { en: string; pt: string }
  tags: string[]
  href?: string
}

const projects: Project[] = [
  {
    name: "Portfolio Website",
    description: {
      en: "Personal portfolio built with Next.js 16, TypeScript, and Tailwind CSS. Features bilingual support, dark mode, and responsive design.",
      pt: "Portfólio pessoal construído com Next.js 16, TypeScript e Tailwind CSS. Com suporte bilíngue, modo escuro e design responsivo.",
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "Workflow Automation Suite",
    description: {
      en: "Custom automation workflows built with n8n and Make, integrating multiple SaaS tools to streamline operations.",
      pt: "Workflows de automação personalizados com n8n e Make, integrando múltiplas ferramentas SaaS para otimizar operações.",
    },
    tags: ["n8n", "Make", "Python", "APIs"],
  },
  {
    name: "AI-Powered Tools",
    description: {
      en: "Collection of AI-powered tools leveraging LLM APIs for content generation, data analysis, and process automation.",
      pt: "Coleção de ferramentas com IA utilizando APIs de LLM para geração de conteúdo, análise de dados e automação de processos.",
    },
    tags: ["AI", "LLM APIs", "Python"],
  },
]

function ArrowIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 12 12 4M12 4H6M12 4v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Projects() {
  const { t, locale } = useTranslation()

  return (
    <section id="projects" className="section-fade relative py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Section label */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] uppercase dark:text-[var(--color-accent-light)]">
                05
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                {t("projects.title")}
              </h2>
              <div className="mt-4 h-px w-12 bg-[var(--color-accent)]" />
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                {t("projects.subtitle")}
              </p>
            </div>
          </div>

          {/* Project cards — vertical stack */}
          <div className="space-y-6 lg:col-span-8">
            {projects.map((project, index) => (
              <div
                key={project.name}
                className="group relative rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 transition hover:border-[var(--color-accent)]/30 hover:shadow-lg sm:p-8 dark:border-[var(--color-border-dark)] dark:bg-[var(--color-surface-elevated-dark)] dark:hover:border-[var(--color-accent)]/30"
              >
                {/* Index number */}
                <span className="absolute top-6 right-6 font-[family-name:var(--font-mono)] text-xs text-zinc-300 sm:top-8 sm:right-8 dark:text-zinc-700">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2"
                    >
                      {project.name}
                      <ArrowIcon className="h-4 w-4 text-zinc-400 transition group-hover/link:text-[var(--color-accent)]" />
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.description[locale]}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-zinc-100 px-2 py-0.5 font-[family-name:var(--font-mono)] text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-[family-name:var(--font-display)] text-sm font-medium text-[var(--color-accent)] transition hover:text-[var(--color-accent-light)]"
                  >
                    {t("projects.viewProject")}
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
