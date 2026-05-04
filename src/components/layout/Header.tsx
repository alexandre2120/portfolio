"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/lib/i18n"

const NAV_LINKS = [
  { num: "01", id: "about", label: "About" },
  { num: "02", id: "work", label: "Work" },
  { num: "03", id: "mockups", label: "Mockups" },
  { num: "04", id: "experience", label: "Experience" },
  { num: "05", id: "skills", label: "Skills" },
  { num: "06", id: "contact", label: "Contact" },
] as const

function useLisbonClock() {
  const [time, setTime] = useState<string>("--:--:--")
  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Europe/Lisbon",
      })
      setTime(t)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export function Header() {
  const time = useLisbonClock()
  const { locale, setLocale } = useTranslation()

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="logo">
          <span className="dot" />
          <span>
            Alexandre <em>Jaques</em>
          </span>
        </a>
        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`}>
              <span className="nl-num">{link.num}</span>
              {link.label}
            </a>
          ))}
        </div>
        <div className="nav-cta">
          <div className="clock">
            <span className="pulse" />
            <span>{time} · LIS</span>
          </div>
          <div className="lang">
            <button
              className={locale === "en" ? "on" : ""}
              onClick={() => setLocale("en")}
              type="button"
            >
              EN
            </button>
            <span style={{ opacity: 0.4 }}>/</span>
            <button
              className={locale === "pt" ? "on" : ""}
              onClick={() => setLocale("pt")}
              type="button"
            >
              PT
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
