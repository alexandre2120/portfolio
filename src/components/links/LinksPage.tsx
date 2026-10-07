"use client"

import {
  ArrowUpRight,
  CaretRight,
  EnvelopeSimple,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  WhatsappLogo,
} from "@phosphor-icons/react"
import Image from "next/image"
import { useEffect, type CSSProperties } from "react"

import {
  featured,
  groups,
  linksCopy,
  pipeline,
  profile,
  socials,
  type LinkBadge,
  type LinkIcon,
  type LinkItem,
  type LinksLocale,
} from "@/content/links"

import styles from "./LinksPage.module.css"
import { beacon, useLinksLocale, useVisitContext, visitParams } from "./useLinksContext"

const icons: Record<LinkIcon, typeof LinkedinLogo> = {
  linkedin: LinkedinLogo,
  github: GithubLogo,
  instagram: InstagramLogo,
  whatsapp: WhatsappLogo,
  email: EnvelopeSimple,
}

let viewSent = false

function tone(name: string) {
  return { "--tone": `var(--${name})` } as CSSProperties
}

function Badges({ badges, locale }: { badges?: LinkBadge[]; locale: LinksLocale }) {
  if (!badges?.length) return null
  return (
    <span className={styles.badges}>
      {badges.map((badge) => (
        <span
          key={badge.label.en}
          className={styles.badge}
          data-tone={badge.tone}
          style={tone(badge.tone)}
        >
          {badge.live ? <i className={styles.pulse} aria-hidden="true" /> : null}
          {badge.label[locale]}
        </span>
      ))}
    </span>
  )
}

export function LinksPage() {
  const [locale, setLocale] = useLinksLocale()
  const visit = useVisitContext()

  useEffect(() => {
    if (viewSent) return
    viewSent = true
    // Read the context directly: during hydration the hook still returns
    // the empty server snapshot.
    beacon({ type: "view", ...visitParams() })
  }, [])

  // mailto cannot go through a redirect reliably inside in-app browsers, so
  // it is counted with a beacon and opened directly.
  const hrefFor = (link: LinkItem) =>
    link.href.startsWith("mailto:") ? link.href : `/links/go/${link.id}${visit.query}`

  const onClick = (link: LinkItem) => () => {
    if (link.href.startsWith("mailto:")) beacon({ type: "click", link: link.id, ...visit.params })
  }

  let index = 0
  const stagger = () => ({ "--i": index++ }) as CSSProperties

  return (
    <main className={styles.page} lang={locale}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.column}>
        <header className={styles.bar} style={stagger()}>
          <span className={styles.url}>alexandrejaques.com/links</span>
          <span className={styles.barRight}>
            <span className={styles.live}>
              <i className={styles.pulse} aria-hidden="true" />
              {profile.status[locale]}
            </span>
            <button
              type="button"
              className={styles.lang}
              onClick={() => setLocale(locale === "pt" ? "en" : "pt")}
              aria-label={linksCopy.switchLabel[locale]}
            >
              {linksCopy.switchTo[locale]}
            </button>
          </span>
        </header>

        <section className={styles.head} style={stagger()}>
          <div className={styles.avatar}>
            <Image src="/links-avatar.webp" alt="" width={156} height={156} priority />
          </div>
          <div className={styles.identity}>
            <h1>{profile.name}</h1>
            <p className={styles.role}>
              <span aria-hidden="true">&gt;</span> {profile.role[locale]}
              <i className={styles.cursor} aria-hidden="true" />
            </p>
            <p className={styles.chips}>
              {profile.chips.map((chip) => (
                <span key={chip.en}>{chip[locale]}</span>
              ))}
            </p>
          </div>
        </section>

        <nav className={styles.socials} aria-label={linksCopy.socialLabel[locale]} style={stagger()}>
          {socials.map((link) => {
            const Icon = icons[link.icon ?? "email"]
            return (
              <a
                key={link.id}
                href={hrefFor(link)}
                onClick={onClick(link)}
                aria-label={link.title[locale]}
                title={link.title[locale]}
                style={tone(link.tone)}
              >
                <Icon size={21} weight="regular" />
              </a>
            )
          })}
        </nav>

        <p className={styles.label} style={stagger()}>
          <span>{"// "}{linksCopy.featuredLabel[locale]}</span>
          <span>01</span>
        </p>
        <a className={styles.featured} href={hrefFor(featured)} style={stagger()}>
          <span className={styles.featuredTop}>
            {featured.logo ? (
              <span className={styles.tile} data-logo={featured.logo.fit} aria-hidden="true">
                <Image src={featured.logo.src} alt="" width={44} height={44} unoptimized />
              </span>
            ) : null}
            <span className={styles.featuredBody}>
              <strong>{featured.title[locale]}</strong>
              <span className={styles.featuredText}>{featured.description?.[locale]}</span>
            </span>
            <span className={styles.go} aria-hidden="true">
              <ArrowUpRight size={18} weight="bold" />
            </span>
          </span>
          <span className={styles.pipeline} aria-hidden="true">
            {pipeline.map((step, stepIndex) => (
              <span key={step.en} className={styles.step}>
                {stepIndex > 0 ? <i className={styles.wire} /> : null}
                <span className={styles.node} data-last={stepIndex === pipeline.length - 1}>
                  {step[locale]}
                </span>
              </span>
            ))}
          </span>
          <Badges badges={featured.badges} locale={locale} />
        </a>

        {groups.map((group) => (
          <section key={group.id} aria-label={group.label[locale]}>
            <p className={styles.label} style={stagger()}>
              <span>{"// "}{group.label[locale]}</span>
              <span>{String(group.items.length).padStart(2, "0")}</span>
            </p>
            <ul className={styles.list}>
              {group.items.map((link) => {
                const Icon = link.icon ? icons[link.icon] : null
                return (
                  <li key={link.id} style={stagger()}>
                    <a className={styles.row} href={hrefFor(link)} onClick={onClick(link)}>
                      <span
                        className={styles.tile}
                        data-logo={link.logo?.fit}
                        style={tone(link.tone)}
                        aria-hidden="true"
                      >
                        {link.logo ? (
                          <Image src={link.logo.src} alt="" width={44} height={44} unoptimized />
                        ) : Icon ? (
                          <Icon size={21} weight="bold" />
                        ) : (
                          link.mark
                        )}
                      </span>
                      <span className={styles.text}>
                        <strong>{link.title[locale]}</strong>
                        {link.description ? (
                          <span className={styles.description}>{link.description[locale]}</span>
                        ) : null}
                        <Badges badges={link.badges} locale={locale} />
                      </span>
                      <CaretRight className={styles.caret} size={16} weight="bold" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}

        <footer className={styles.footer} style={stagger()}>
          <span>{profile.footer}</span>
          <span>v2026.10</span>
        </footer>
      </div>
    </main>
  )
}
