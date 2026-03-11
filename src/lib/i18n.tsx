"use client"

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"

import en from "@/content/en.json"
import pt from "@/content/pt.json"

export type Locale = "en" | "pt"

const dictionaries: Record<Locale, Record<string, unknown>> = { en, pt }

type TranslationContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  tArray: (key: string) => string[]
}

const TranslationContext = createContext<TranslationContextType | null>(null)

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".")
  let current: unknown = obj
  for (const key of keys) {
    if (current === null || current === undefined) return path
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === "string" ? current : path
}

function getNestedArray(obj: Record<string, unknown>, path: string): string[] {
  const keys = path.split(".")
  let current: unknown = obj
  for (const key of keys) {
    if (current === null || current === undefined) return []
    current = (current as Record<string, unknown>)[key]
  }
  return Array.isArray(current) ? (current as string[]) : []
}

function getSavedLocale(): Locale {
  if (typeof window === "undefined") return "en"
  const saved = localStorage.getItem("locale")
  return saved === "pt" ? "pt" : "en"
}

const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export function LanguageProvider({ children }: { children: ReactNode }) {
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [locale, setLocaleState] = useState<Locale>("en")

  if (isMounted && locale === "en") {
    const saved = getSavedLocale()
    if (saved !== locale) {
      setLocaleState(saved)
    }
  }

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
    document.documentElement.lang = newLocale
  }, [])

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(dictionaries[locale], key)
    },
    [locale],
  )

  const tArray = useCallback(
    (key: string): string[] => {
      return getNestedArray(dictionaries[locale], key)
    },
    [locale],
  )

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t, tArray }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation(): TranslationContextType {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}
