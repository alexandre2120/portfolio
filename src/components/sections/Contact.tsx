"use client"

import { Container } from "@/components/ui/Container"
import { MailIcon, GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons"
import { useTranslation } from "@/lib/i18n"

function MapPinIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  )
}

type ContactItemProps = {
  href?: string
  icon: React.ReactNode
  label: string
  value: string
  external?: boolean
}

function ContactItem({ href, icon, label, value, external }: ContactItemProps) {
  const content = (
    <div className="group flex min-h-[44px] items-center gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 transition hover:border-[var(--color-accent)]/30 hover:shadow-sm dark:border-[var(--color-border-dark)] dark:bg-[var(--color-surface-elevated-dark)] dark:hover:border-[var(--color-accent)]/30">
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-[var(--color-accent-muted)]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {label}
        </p>
        <p className="truncate font-[family-name:var(--font-mono)] text-xs text-zinc-500 dark:text-zinc-400">
          {value}
        </p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    )
  }

  return content
}

export function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Section label */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] uppercase dark:text-[var(--color-accent-light)]">
                07
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                {t("contact.title")}
              </h2>
              <div className="mt-4 h-px w-12 bg-[var(--color-accent)]" />
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                {t("contact.subtitle")}
              </p>
            </div>
          </div>

          {/* Contact items */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            <ContactItem
              href="mailto:alexandrjaques@gmail.com"
              icon={
                <MailIcon className="h-5 w-5 stroke-[var(--color-accent)] [&_path]:fill-transparent [&_path]:stroke-[var(--color-accent)]" />
              }
              label={t("contact.email")}
              value="alexandrjaques@gmail.com"
            />
            <ContactItem
              href="https://github.com/alexandrejaques"
              icon={
                <GitHubIcon className="h-5 w-5 fill-[var(--color-accent)]" />
              }
              label={t("contact.github")}
              value="github.com/alexandrejaques"
              external
            />
            <ContactItem
              href="https://linkedin.com/in/alexandrejaques"
              icon={
                <LinkedInIcon className="h-5 w-5 fill-[var(--color-accent)]" />
              }
              label="LinkedIn"
              value="linkedin.com/in/alexandrejaques"
              external
            />
            <ContactItem
              icon={
                <MapPinIcon className="h-5 w-5 stroke-[var(--color-accent)]" />
              }
              label={t("contact.location")}
              value="Lisboa, Portugal"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
