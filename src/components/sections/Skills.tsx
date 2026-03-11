"use client"

import clsx from "clsx"
import { Container } from "@/components/ui/Container"
import { useTranslation } from "@/lib/i18n"

/* ─── Skill Icons (inline SVG for tree-shaking) ─── */

function CodeIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" stroke="currentColor" />
    </svg>
  )
}

function BrainIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7ZM9 21h6M10 17v4M14 17v4" stroke="currentColor" />
    </svg>
  )
}

function ServerIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="8" rx="2" stroke="currentColor" />
      <rect x="2" y="14" width="20" height="8" rx="2" stroke="currentColor" />
      <path d="M6 6h.01M6 18h.01" stroke="currentColor" />
    </svg>
  )
}

function UsersIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" />
    </svg>
  )
}

/* ─── Skill data ─── */

type SkillCategory = {
  key: string
  index: string
  icon: React.ComponentType<React.ComponentPropsWithoutRef<"svg">>
  skills: { name: string; level: number }[]
}

const skillCategories: SkillCategory[] = [
  {
    key: "development",
    index: "01",
    icon: CodeIcon,
    skills: [
      { name: "JavaScript / TypeScript", level: 85 },
      { name: "React & Next.js", level: 85 },
      { name: "RESTful APIs", level: 95 },
      { name: "Supabase & MongoDB", level: 90 },
    ],
  },
  {
    key: "ai",
    index: "02",
    icon: BrainIcon,
    skills: [
      { name: "Claude Code", level: 95 },
      { name: "OpenClaw", level: 85 },
      { name: "AI LLM APIs", level: 95 },
      { name: "n8n / Make", level: 95 },
      { name: "Python Scripting", level: 90 },
    ],
  },
  {
    key: "infrastructure",
    index: "03",
    icon: ServerIcon,
    skills: [
      { name: "Cloud Servers", level: 80 },
      { name: "Docker / Kubernetes", level: 65 },
      { name: "Workflow Automation", level: 95 },
      { name: "Data Analysis", level: 90 },
    ],
  },
  {
    key: "leadership",
    index: "04",
    icon: UsersIcon,
    skills: [
      { name: "Team Management", level: 95 },
      { name: "Strategic Planning", level: 85 },
      { name: "Performance Metrics", level: 90 },
      { name: "Process Optimization", level: 95 },
    ],
  },
]

/* ─── Subcomponents ─── */

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="group/skill">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-[family-name:var(--font-mono)] text-sm text-zinc-700 dark:text-zinc-300">
          {name}
        </span>
        <span className="font-[family-name:var(--font-mono)] text-xs tabular-nums text-zinc-400 dark:text-zinc-500">
          {level}%
        </span>
      </div>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className={clsx(
            "h-full rounded-full transition-all duration-500 ease-out",
            level >= 90
              ? "bg-[var(--color-accent)]"
              : level >= 75
                ? "bg-[var(--color-accent)]/70"
                : "bg-zinc-400 dark:bg-zinc-600",
          )}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  )
}

/* ─── Main Section ─── */

export function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="section-fade relative py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Section label */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] uppercase dark:text-[var(--color-accent-light)]">
                02
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                {t("skills.title")}
              </h2>
              <div className="mt-4 h-px w-12 bg-[var(--color-accent)]" />
            </div>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-8">
            {skillCategories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.key} className="group">
                  {/* Category header with animated icon */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent-muted)]">
                      <Icon className="skill-icon h-4 w-4 text-[var(--color-accent)] dark:text-[var(--color-accent-light)]" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-[family-name:var(--font-mono)] text-xs text-zinc-400 dark:text-zinc-600">
                        {category.index}
                      </span>
                      <h3 className="font-[family-name:var(--font-display)] text-sm font-bold tracking-tight text-zinc-900 uppercase dark:text-zinc-100">
                        {t(`skills.categories.${category.key}`)}
                      </h3>
                    </div>
                  </div>

                  {/* Skill bars */}
                  <div className="mt-5 space-y-4">
                    {category.skills.map((skill) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
