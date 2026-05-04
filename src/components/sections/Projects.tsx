"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

type Project = {
  num: string
  href: string
  title: React.ReactNode
  tags: string[]
  img: string
}

const PROJECTS: Project[] = [
  {
    num: "/01",
    href: "https://bunniemonki.com",
    title: (
      <>
        BunnieMonki <em>Marketplace</em>
      </>
    ),
    tags: ["Next.js", "Fastify", "Flutter", "PostgreSQL"],
    img: "/images/projects/bunniemonki.png",
  },
  {
    num: "/02",
    href: "https://www.jippfy.pt",
    title: <>JIPPfy</>,
    tags: ["Next.js", "AI", "WhatsApp API", "Automation"],
    img: "/images/projects/jippfy.png",
  },
  {
    num: "/03",
    href: "https://www.theskinaesthetic.pt",
    title: (
      <>
        The Skin <em>Aesthetic</em>
      </>
    ),
    tags: ["Next.js", "Tailwind", "i18n", "SEO"],
    img: "/images/projects/theskinaesthetic.png",
  },
  {
    num: "/04",
    href: "https://cgtools.vercel.app",
    title: (
      <>
        ChatGuru <em>Import Tool</em>
      </>
    ),
    tags: ["Next.js", "ChatGuru API", "Automation", "Vercel"],
    img: "/images/projects/chatguru-tool.png",
  },
  {
    num: "/05",
    href: "https://agency.bunniemonki.com",
    title: (
      <>
        BunnieMonki <em>Agency</em>
      </>
    ),
    tags: ["Next.js", "Branding", "Integrations"],
    img: "/images/projects/agency.png",
  },
]

export function Projects() {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const items = list.querySelectorAll<HTMLAnchorElement>(".proj")

    const cleanup: Array<() => void> = []
    items.forEach((p) => {
      const preview = p.querySelector<HTMLDivElement>(".preview")
      if (!preview) return
      const onEnter = () => p.classList.add("is-hover")
      const onLeave = () => p.classList.remove("is-hover")
      const onMove = (ev: MouseEvent) => {
        preview.style.left = ev.clientX + "px"
        preview.style.top = ev.clientY + "px"
      }
      p.addEventListener("mouseenter", onEnter)
      p.addEventListener("mouseleave", onLeave)
      p.addEventListener("mousemove", onMove)
      cleanup.push(() => {
        p.removeEventListener("mouseenter", onEnter)
        p.removeEventListener("mouseleave", onLeave)
        p.removeEventListener("mousemove", onMove)
      })
    })

    return () => cleanup.forEach((fn) => fn())
  }, [])

  return (
    <section className="sec projects" id="work">
      <div className="wrap">
        <div className="sec-head">
          <div className="num-col">
            <div className="big">/02</div>
            <div className="lab">Selected Work</div>
          </div>
          <div className="title-col">
            <h2>
              Things I&apos;ve <span className="it">built</span>
              <br />
              and shipped.
            </h2>
          </div>
          <div className="meta-col mono">
            2021 → 2026
            <br />
            05 projects
          </div>
        </div>

        <div className="proj-list" ref={listRef}>
          {PROJECTS.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="proj"
            >
              <div className="p-num">{p.num}</div>
              <div className="p-title">{p.title}</div>
              <div className="p-tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="p-meta">
                Live <span className="arrow">↗</span>
              </div>
              <div className="preview">
                <Image src={p.img} alt="" width={380} height={260} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
