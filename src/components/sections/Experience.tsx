"use client"

import { Container } from "@/components/ui/Container"
import { Timeline } from "@/components/ui/timeline"
import { useTranslation } from "@/lib/i18n"

function RoleBadge({ company }: { company: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-[var(--color-accent-muted)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--color-accent)] ring-1 ring-inset ring-[var(--color-accent)]/20 dark:text-[var(--color-accent-light)]">
      {company}
    </span>
  )
}

function HighlightList({ items }: { items: string[] }) {
  if (items.length === 0) return null
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-xs text-zinc-600 md:text-sm dark:text-zinc-400"
        >
          <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-[var(--color-accent)] dark:bg-[var(--color-accent-light)]" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function Experience() {
  const { t, tArray } = useTranslation()

  const timelineData = [
    {
      title: t("experience.integraninja.period"),
      content: (
        <div>
          <h4 className="mb-1 font-[family-name:var(--font-display)] text-lg font-bold text-zinc-900 md:text-2xl dark:text-zinc-50">
            {t("experience.integraninja.role")}
          </h4>
          <RoleBadge company={t("experience.integraninja.company")} />
          <p className="mt-4 text-xs font-normal text-zinc-600 md:text-sm dark:text-zinc-400">
            {t("experience.integraninja.description")}
          </p>
          <HighlightList items={tArray("experience.integraninja.highlights")} />
        </div>
      ),
    },
    {
      title: t("experience.director.period"),
      content: (
        <div>
          <h4 className="mb-1 font-[family-name:var(--font-display)] text-lg font-bold text-zinc-900 md:text-2xl dark:text-zinc-50">
            {t("experience.director.role")}
          </h4>
          <RoleBadge company={t("experience.director.company")} />
          <p className="mt-4 text-xs font-normal text-zinc-600 md:text-sm dark:text-zinc-400">
            {t("experience.director.description")}
          </p>
        </div>
      ),
    },
    {
      title: t("experience.headOps.period"),
      content: (
        <div>
          <h4 className="mb-1 font-[family-name:var(--font-display)] text-lg font-bold text-zinc-900 md:text-2xl dark:text-zinc-50">
            {t("experience.headOps.role")}
          </h4>
          <RoleBadge company={t("experience.headOps.company")} />
          <p className="mt-4 text-xs font-normal text-zinc-600 md:text-sm dark:text-zinc-400">
            {t("experience.headOps.description")}
          </p>
          <HighlightList items={tArray("experience.headOps.highlights")} />
        </div>
      ),
    },
    {
      title: t("experience.managerCS.period"),
      content: (
        <div>
          <h4 className="mb-1 font-[family-name:var(--font-display)] text-lg font-bold text-zinc-900 md:text-2xl dark:text-zinc-50">
            {t("experience.managerCS.role")}
          </h4>
          <RoleBadge company={t("experience.managerCS.company")} />
          <p className="mt-4 text-xs font-normal text-zinc-600 md:text-sm dark:text-zinc-400">
            {t("experience.managerCS.description")}
          </p>
        </div>
      ),
    },
    {
      title: t("experience.analystCS.period"),
      content: (
        <div>
          <h4 className="mb-1 font-[family-name:var(--font-display)] text-lg font-bold text-zinc-900 md:text-2xl dark:text-zinc-50">
            {t("experience.analystCS.role")}
          </h4>
          <RoleBadge company={t("experience.analystCS.company")} />
          <p className="mt-4 text-xs font-normal text-zinc-600 md:text-sm dark:text-zinc-400">
            {t("experience.analystCS.description")}
          </p>
        </div>
      ),
    },
  ]

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <Container>
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] uppercase dark:text-[var(--color-accent-light)]">
          03
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          {t("experience.title")}
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-zinc-600 md:text-base dark:text-zinc-400">
          {t("experience.subtitle")}
        </p>
        <div className="mt-4 h-px w-12 bg-[var(--color-accent)]" />
      </Container>
      <div className="mt-10">
        <Timeline data={timelineData} />
      </div>
    </section>
  )
}
