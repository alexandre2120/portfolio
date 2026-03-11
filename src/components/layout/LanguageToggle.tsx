"use client"

import clsx from "clsx"
import { useTranslation, type Locale } from "@/lib/i18n"

export function LanguageToggle() {
  const { locale, setLocale } = useTranslation()

  const languages: { code: Locale; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "pt", label: "PT" },
  ]

  return (
    <div className="flex items-center gap-0.5 font-[family-name:var(--font-mono)] text-xs">
      {languages.map(({ code, label }, i) => (
        <span key={code} className="flex items-center">
          <button
            type="button"
            onClick={() => setLocale(code)}
            aria-label={`Switch language to ${label}`}
            className={clsx(
              "min-h-[44px] min-w-[44px] rounded-lg px-2 py-2 font-medium tracking-wider transition",
              locale === code
                ? "text-[var(--color-accent)] dark:text-[var(--color-accent-light)]"
                : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300",
            )}
          >
            {label}
          </button>
          {i === 0 && (
            <span className="text-zinc-300 dark:text-zinc-600">/</span>
          )}
        </span>
      ))}
    </div>
  )
}
