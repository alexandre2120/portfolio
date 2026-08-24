"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { useTranslation } from "@/lib/i18n"

type Project = {
  num: string
  href: string
  title: React.ReactNode
  tags: string[]
  img: string
  caseStudy?: boolean
}

const PROJECTS: Project[] = [
  {
    num: "/01",
    href: "/projects/mensagemz",
    title: (
      <>
        Mensagemz <em>AI Platform</em>
      </>
    ),
    tags: ["Next.js", "Fastify", "BullMQ", "Supabase", "LLM", "Docker"],
    img: "/images/projects/mensagemz.png",
    caseStudy: true,
  },
  {
    num: "/02",
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
    num: "/03",
    href: "https://www.jippfy.pt",
    title: <>JIPPfy</>,
    tags: ["Next.js", "AI", "WhatsApp API", "Automation"],
    img: "/images/projects/jippfy.png",
  },
  {
    num: "/04",
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
    num: "/05",
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
    num: "/06",
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
  const { t } = useTranslation()
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
            <div className="lab">{t("projects.label")}</div>
          </div>
          <div className="title-col">
            <h2>
              {t("projects.headlinePrefix")}
              <span className="it">{t("projects.headlineEm")}</span>
              <br />
              {t("projects.headlineSuffix")}
            </h2>
          </div>
          <div className="meta-col mono">
            {t("projects.metaYears")}
            <br />
            {t("projects.metaCount")}
          </div>
        </div>

        <div className="proj-list" ref={listRef}>
          {PROJECTS.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target={p.caseStudy ? undefined : "_blank"}
              rel={p.caseStudy ? undefined : "noopener noreferrer"}
              className="proj"
            >
              <div className="p-num">{p.num}</div>
              <div className="p-title">{p.title}</div>
              <div className="p-tags">
                {p.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="p-meta">
                {p.caseStudy ? t("projects.caseStudy") : t("projects.live")}{" "}
                <span className="arrow">{p.caseStudy ? "→" : "↗"}</span>
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
