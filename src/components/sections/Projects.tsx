"use client"

import Image from "next/image"
import { Container } from "@/components/ui/Container"
import { useTranslation } from "@/lib/i18n"

type Project = {
  name: string
  description: { en: string; pt: string }
  tags: string[]
  image: string
  href?: string
}

const projects: Project[] = [
  {
    name: "BunnieMonki Marketplace",
    description: {
      en: "Full-stack marketplace platform connecting service providers with customers across multiple categories, from automotive and beauty to construction and education. Built with Next.js frontend, Fastify API backend, and Flutter mobile app. Features multi-language support, real-time service matching, and custom onboarding flows.",
      pt: "Plataforma marketplace full-stack conectando prestadores de serviços a clientes em múltiplas categorias, de automotivo e beleza a construção e educação. Construída com frontend Next.js, backend Fastify API e app mobile Flutter. Com suporte multilíngue, correspondência de serviços em tempo real e fluxos de onboarding personalizados.",
    },
    tags: ["Next.js", "Fastify", "Flutter", "PostgreSQL"],
    image: "/images/projects/bunniemonki.png",
    href: "https://bunniemonki.com",
  },
  {
    name: "JIPPfy",
    description: {
      en: "WhatsApp scheduling and automation platform with AI-powered assistant. Responds to customers 24/7, handles appointment booking, confirmation, and rescheduling, all without manual intervention. Designed for beauty salons, clinics, and service businesses who lose customers by not answering WhatsApp fast enough.",
      pt: "Plataforma de agendamento e automação WhatsApp com assistente de IA. Responde aos clientes 24/7, gerencia agendamentos, confirmações e reagendamentos, tudo sem intervenção manual. Projetada para salões de beleza, clínicas e empresas de serviços que perdem clientes por não responder o WhatsApp rápido o suficiente.",
    },
    tags: ["Next.js", "AI", "WhatsApp API", "Automation"],
    image: "/images/projects/jippfy.png",
    href: "https://www.jippfy.pt",
  },
  {
    name: "The Skin Aesthetic",
    description: {
      en: "Professional website for a home-based therapeutic massage and aesthetic treatment business serving Lisbon and Setúbal. Features an elegant warm-toned design, trilingual support (PT/EN/ES), free consultation booking, and service showcase with before/after results.",
      pt: "Website profissional para negócio de massagens terapêuticas e tratamentos estéticos ao domicílio em Lisboa e Setúbal. Design elegante com tons quentes, suporte trilíngue (PT/EN/ES), agendamento de consulta gratuita e vitrine de serviços com resultados antes/depois.",
    },
    tags: ["Next.js", "Tailwind CSS", "i18n", "SEO"],
    image: "/images/projects/theskinaesthetic.png",
    href: "https://www.theskinaesthetic.pt",
  },
  {
    name: "ChatGuru Import Tool",
    description: {
      en: "Custom Next.js automation panel that enables bulk chat importing, a feature not natively supported by the ChatGuru platform. Identified a real customer pain point where clients needed to migrate thousands of conversations, and built this tool to automate the entire process via the ChatGuru API.",
      pt: "Painel de automação Next.js personalizado que permite importação em massa de conversas, funcionalidade não suportada nativamente pela plataforma ChatGuru. Identifiquei uma dor real dos clientes que precisavam migrar milhares de conversas, e construí esta ferramenta para automatizar todo o processo via API do ChatGuru.",
    },
    tags: ["Next.js", "ChatGuru API", "Automation", "Vercel"],
    image: "/images/projects/chatguru-tool.png",
    href: "https://cgtools.vercel.app",
  },
  {
    name: "BunnieMonki Agency",
    description: {
      en: "Digital agency website showcasing web development, automation, and integration services. Features a modern design with project portfolio, testimonials, and service offerings, from websites and mobile apps to smart automations and landing pages.",
      pt: "Website da agência digital apresentando serviços de desenvolvimento web, automação e integrações. Design moderno com portfólio de projetos, depoimentos e ofertas de serviços, de websites e apps mobile a automações inteligentes e landing pages.",
    },
    tags: ["Next.js", "Branding", "Integrations"],
    image: "/images/projects/agency.png",
    href: "https://agency.bunniemonki.com",
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
                06
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

          {/* Project cards */}
          <div className="space-y-8 lg:col-span-8">
            {projects.map((project, index) => (
              <div
                key={project.name}
                className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] transition hover:border-[var(--color-accent)]/30 hover:shadow-lg dark:border-[var(--color-border-dark)] dark:bg-[var(--color-surface-elevated-dark)] dark:hover:border-[var(--color-accent)]/30"
              >
                {/* Screenshot preview */}
                <div className="relative aspect-video overflow-hidden border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Image
                        src={project.image}
                        alt={`${project.name} screenshot`}
                        fill
                        className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 800px"
                      />
                    </a>
                  ) : (
                    <Image
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 800px"
                    />
                  )}
                </div>

                {/* Card content */}
                <div className="relative p-6 sm:p-8">
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
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
