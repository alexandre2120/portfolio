"use client"

import { ThemeProvider } from "next-themes"
import { useEffect } from "react"
import { useTheme } from "next-themes"
import { LanguageProvider } from "@/lib/i18n"

function ThemeWatcher() {
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")

    function onMediaChange() {
      const systemTheme = media.matches ? "dark" : "light"
      if (resolvedTheme === systemTheme) {
        setTheme("system")
      }
    }

    onMediaChange()
    media.addEventListener("change", onMediaChange)

    return () => {
      media.removeEventListener("change", onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ThemeWatcher />
        {children}
      </ThemeProvider>
    </LanguageProvider>
  )
}
