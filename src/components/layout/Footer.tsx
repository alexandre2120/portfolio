"use client"

import { Container } from "@/components/ui/Container"
import { useTranslation } from "@/lib/i18n"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="mt-20 flex-none border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 font-[family-name:var(--font-display)] text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a
              href="#about"
              className="transition hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-light)]"
            >
              {t("nav.about")}
            </a>
            <a
              href="#projects"
              className="transition hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-light)]"
            >
              {t("nav.projects")}
            </a>
            <a
              href="#contact"
              className="transition hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-light)]"
            >
              {t("nav.contact")}
            </a>
          </div>
          <p className="font-[family-name:var(--font-mono)] text-xs text-zinc-400 dark:text-zinc-600">
            &copy; {new Date().getFullYear()} Alexandre Jaques.{" "}
            {t("footer.rights")}
          </p>
        </div>
      </Container>
    </footer>
  )
}
