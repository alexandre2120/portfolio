"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
  tValue: <T = unknown>(key: string) => T | undefined
}

const TranslationContext = createContext<TranslationContextType | null>(null)

function getNested(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split(".")
  let current: unknown = obj
  for (const key of keys) {
    if (current === null || current === undefined) return undefined
    current = (current as Record<string, unknown>)[key]
  }
  return current
}

const localeListeners = new Set<() => void>()

function readLocale(): Locale {
  if (typeof window === "undefined") return "en"
  const saved = window.localStorage.getItem("locale")
  return saved === "pt" ? "pt" : "en"
}

function subscribeLocale(callback: () => void): () => void {
  localeListeners.add(callback)
  const onStorage = (e: StorageEvent) => {
    if (e.key === "locale") callback()
  }
  window.addEventListener("storage", onStorage)
  return () => {
    localeListeners.delete(callback)
    window.removeEventListener("storage", onStorage)
  }
}

function getServerLocale(): Locale {
  return "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribeLocale, readLocale, getServerLocale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((newLocale: Locale) => {
    window.localStorage.setItem("locale", newLocale)
    document.documentElement.lang = newLocale
    localeListeners.forEach((listener) => listener())
  }, [])

  const t = useCallback(
    (key: string): string => {
      const value = getNested(dictionaries[locale], key)
      return typeof value === "string" ? value : key
    },
    [locale],
  )

  const tArray = useCallback(
    (key: string): string[] => {
      const value = getNested(dictionaries[locale], key)
      return Array.isArray(value) ? (value as string[]) : []
    },
    [locale],
  )

  const tValue = useCallback(
    <T,>(key: string): T | undefined => {
      return getNested(dictionaries[locale], key) as T | undefined
    },
    [locale],
  )

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t, tArray, tValue }}>
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
