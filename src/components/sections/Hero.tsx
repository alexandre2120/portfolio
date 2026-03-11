"use client"

import Image from "next/image"
import { Container } from "@/components/ui/Container"
import { Typewriter } from "@/components/ui/typewriter"
import { GitHubIcon, LinkedInIcon, InstagramIcon, MailIcon } from "@/components/icons/SocialIcons"
import { useTranslation } from "@/lib/i18n"

function SocialLink({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  href: string
  label: string
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="group flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="h-5 w-5 fill-zinc-500 transition group-hover:fill-[var(--color-accent)] dark:fill-zinc-400 dark:group-hover:fill-[var(--color-accent-light)]" />
    </a>
  )
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8 1v12M3 9l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Hero() {
  const { t, tArray, locale } = useTranslation()

  const roles = tArray("hero.roles")

  return (
    <section id="hero" className="hero-gradient relative overflow-hidden">
      {/* Dot grid pattern overlay */}
      <div className="dot-grid absolute inset-0" />

      <Container className="relative py-20 sm:py-28 lg:py-36">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
          {/* Text content */}
          <div className="max-w-2xl lg:flex-1">
            {/* Greeting — mono accent */}
            <p className="font-[family-name:var(--font-mono)] text-sm tracking-wider text-[var(--color-accent)] dark:text-[var(--color-accent-light)]">
              {t("hero.greeting")}
            </p>

            {/* Name — extreme display font */}
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-zinc-50">
              {t("hero.title")}
            </h1>

            {/* Typewriter roles */}
            <div className="mt-4 h-[2rem] sm:h-[2.5rem]" aria-label={roles.join(", ")}>
              <Typewriter
                key={locale}
                text={roles}
                speed={60}
                deleteSpeed={35}
                waitTime={2000}
                loop
                className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-accent)] sm:text-xl dark:text-[var(--color-accent-light)]"
                cursorChar="_"
                cursorClassName="ml-0.5 text-[var(--color-accent)] dark:text-[var(--color-accent-light)]"
              />
            </div>

            {/* Subtitle — editorial serif body */}
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("hero.subtitle")}
            </p>

            {/* Social links + CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 font-[family-name:var(--font-display)] text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-accent-light)] hover:shadow-md active:scale-[0.98]"
              >
                {t("hero.cta")}
                <ArrowDownIcon className="h-4 w-4" />
              </a>
              <div className="flex items-center">
                <SocialLink
                  href="https://github.com/alexandrejaques"
                  icon={GitHubIcon}
                  label="GitHub"
                />
                <SocialLink
                  href="https://linkedin.com/in/alexandrejaques"
                  icon={LinkedInIcon}
                  label="LinkedIn"
                />
                <SocialLink
                  href="https://www.instagram.com/alexandrejaquees/"
                  icon={InstagramIcon}
                  label="Instagram"
                />
                <SocialLink
                  href="mailto:alexandrjaques@gmail.com"
                  icon={MailIcon}
                  label="Email"
                />
              </div>
            </div>
          </div>

          {/* Profile photo — asymmetric with accent accent */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Accent border offset */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-teal-600 opacity-20 blur-sm" />
              <div className="relative h-56 w-56 overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-[var(--color-border)] dark:bg-zinc-800 dark:ring-[var(--color-border-dark)]">
                <Image
                  src="/profile.png"
                  alt="Alexandre Jaques"
                  fill
                  className="object-cover"
                  sizes="224px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
