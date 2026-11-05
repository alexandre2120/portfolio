"use client"

import {
  ArrowUpRight,
  EnvelopeSimple,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  YoutubeLogo,
} from "@phosphor-icons/react"
import Image from "next/image"
import type { CSSProperties } from "react"

import {
  career,
  copy,
  email,
  revenue,
  sideProjects,
  skills,
  socials,
  startups,
  type Startup,
  type Tone,
} from "@/content/home"
import { useTranslation, type Locale } from "@/lib/i18n"

import styles from "./IndieHome.module.css"

const socialIcons = {
  linkedin: LinkedinLogo,
  github: GithubLogo,
  youtube: YoutubeLogo,
  instagram: InstagramLogo,
}

function tone(name: Tone) {
  return { "--tone": `var(--${name})` } as CSSProperties
}

function money(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "pt" ? "pt-PT" : "en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Math.round(value))
}

/** Axis label: the currency is in the headline, so only "0", "2.5k", "5k". */
function axisLabel(value: number, locale: Locale) {
  if (value === 0) return "0"
  const n = new Intl.NumberFormat(locale === "pt" ? "pt-PT" : "en-US", { maximumFractionDigits: 1 })
  return value >= 1000 ? `${n.format(value / 1000)}k` : n.format(value)
}

function monthLabel(month: string, locale: Locale) {
  const [year, m] = month.split("-").map(Number)
  const label = new Intl.DateTimeFormat(locale === "pt" ? "pt-PT" : "en-US", {
    month: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, m - 1, 1)))
  return label.replace(".", "")
}

function dateLabel(date: string, locale: Locale) {
  const [year, m, d] = date.split("-").map(Number)
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-PT" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(Date.UTC(year, m - 1, d)))
    .replace(".", "")
}

/** Rounds the chart ceiling up to 1, 2, 2.5 or 5 times a power of ten. */
function niceCeiling(value: number) {
  if (value <= 0) return 100
  const power = 10 ** Math.floor(Math.log10(value))
  const step = [1, 2, 2.5, 5, 10].find((s) => s * power >= value) ?? 10
  return step * power
}

const servicesByMonth = revenue.months.map((_, i) =>
  startups.filter((s) => s.kind === "services").reduce((sum, s) => sum + (s.monthly[i] ?? 0), 0),
)
const productsByMonth = revenue.months.map((_, i) =>
  startups.filter((s) => s.kind === "product").reduce((sum, s) => sum + (s.monthly[i] ?? 0), 0),
)
const totalByMonth = servicesByMonth.map((v, i) => v + productsByMonth[i])
const yearTotal = totalByMonth.reduce((a, b) => a + b, 0)
const ceiling = niceCeiling(Math.max(...totalByMonth))

function RevenueChart({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const last = revenue.months.length - 1
  const summary = revenue.months
    .map((month, i) => `${monthLabel(month, locale)} ${money(totalByMonth[i], locale)}`)
    .join(", ")

  return (
    <section className={styles.panel} aria-labelledby="revenue-title">
      <header className={styles.revenueHead}>
        <h2 id="revenue-title" className={styles.revenueTotal}>
          <span className={styles.num}>{money(yearTotal, locale)}</span>{" "}
          <span className={styles.revenueSuffix}>{t.revenueSuffix}</span>
        </h2>
        <ul className={styles.legend}>
          <li>
            <i className={styles.keyServices} aria-hidden="true" />
            {t.services}
          </li>
          <li>
            <i className={styles.keyProducts} aria-hidden="true" />
            {t.products}
          </li>
        </ul>
      </header>

      <div className={styles.chart} role="img" aria-label={summary}>
        <div className={styles.axis} aria-hidden="true">
          {[1, 0.5, 0].map((f) => (
            <span key={f} style={{ "--y": f } as CSSProperties}>
              {axisLabel(ceiling * f, locale)}
            </span>
          ))}
        </div>
        <div className={styles.plot}>
          {[1, 0.5, 0].map((f) => (
            <i key={f} className={styles.gridline} style={{ "--y": f } as CSSProperties} aria-hidden="true" />
          ))}
          {revenue.months.map((month, i) => {
            const partial = revenue.lastIsPartial && i === last
            const services = (servicesByMonth[i] / ceiling) * 100
            const products = (productsByMonth[i] / ceiling) * 100
            return (
              <div
                key={month}
                className={styles.column}
                data-partial={partial || undefined}
                tabIndex={0}
                aria-label={`${monthLabel(month, locale)}: ${money(totalByMonth[i], locale)}`}
                style={{ "--i": i } as CSSProperties}
              >
                <div className={styles.stack}>
                  {products > 0 ? (
                    <span
                      className={styles.barProducts}
                      data-top={services === 0 || undefined}
                      style={{ height: `max(${products}%, 2px)` }}
                    />
                  ) : null}
                  {services > 0 ? (
                    <span className={styles.barServices} style={{ height: `max(${services}%, 2px)` }} />
                  ) : null}
                </div>
                <span className={styles.tip} role="tooltip">
                  <b>
                    {monthLabel(month, locale)}
                    {partial ? ` · ${t.inProgress}` : ""}
                  </b>
                  <span>
                    {t.services} <em>{money(servicesByMonth[i], locale)}</em>
                  </span>
                  <span>
                    {t.products} <em>{money(productsByMonth[i], locale)}</em>
                  </span>
                </span>
                <span className={styles.month} aria-hidden="true">
                  {monthLabel(month, locale)}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <p className={styles.note}>
        {t.revenueNote} {dateLabel(revenue.updated, locale)}.
      </p>
    </section>
  )
}

function Sparkline({ values, partial }: { values: number[]; partial: boolean }) {
  const w = 300
  const h = 56
  const pad = 4
  const max = Math.max(...values)
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w
    const y = max > 0 ? h - pad - (v / max) * (h - pad * 2) : h - pad
    return [x, y] as const
  })
  const solid = partial ? points.slice(0, -1) : points
  const line = solid.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
  const area = `${line} L${solid[solid.length - 1][0].toFixed(1)},${h} L0,${h} Z`
  const tail = partial
    ? `M${points[points.length - 2][0].toFixed(1)},${points[points.length - 2][1].toFixed(1)} L${points[points.length - 1][0].toFixed(1)},${points[points.length - 1][1].toFixed(1)}`
    : null

  return (
    <svg className={styles.spark} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <path className={styles.sparkArea} d={area} />
      <path className={styles.sparkLine} d={line} vectorEffect="non-scaling-stroke" />
      {tail ? <path className={styles.sparkTail} d={tail} vectorEffect="non-scaling-stroke" /> : null}
    </svg>
  )
}

function Tile({ item }: { item: { name: string; tone: Tone; logo?: Startup["logo"]; mark?: string } }) {
  return (
    <span className={styles.tile} data-fit={item.logo?.fit} style={tone(item.tone)} aria-hidden="true">
      {item.logo ? <Image src={item.logo.src} alt="" width={28} height={28} unoptimized /> : <b>{item.mark}</b>}
    </span>
  )
}

function StartupCard({ startup, locale }: { startup: Startup; locale: Locale }) {
  const t = copy[locale]
  return (
    <li>
      <a
        className={styles.card}
        href={startup.href}
        target="_blank"
        rel="noopener noreferrer"
        style={tone(startup.tone)}
      >
        <span className={styles.cardHead}>
          <Tile item={startup} />
          <span className={styles.cardName}>{startup.name}</span>
          <span className={styles.mrr} title={t.last30}>
            {money(startup.last30, locale)}
            <small>{t.perMonth}</small>
          </span>
        </span>
        <span className={styles.cardDesc}>{startup.description[locale]}</span>
        {startup.badge ? <span className={styles.badge}>{startup.badge[locale]}</span> : null}
        <Sparkline values={startup.monthly} partial={revenue.lastIsPartial} />
      </a>
    </li>
  )
}

export function IndieHome() {
  const { locale, setLocale } = useTranslation()
  const t = copy[locale]

  return (
    <div className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />

      <button
        type="button"
        className={styles.lang}
        onClick={() => setLocale(locale === "en" ? "pt" : "en")}
        aria-label={t.switchLabel}
      >
        {t.switchTo}
      </button>

      <div className={styles.layout}>
        <aside className={styles.profile}>
          <Image
            className={styles.avatar}
            src="/avatar-iconico.webp"
            alt="Alexandre Jaques"
            width={112}
            height={112}
            priority
          />
          <h1 className={styles.name}>Alexandre Jaques</h1>
          <p className={styles.role}>{t.role}</p>
          <p className={styles.tagline}>{t.tagline}</p>

          <p className={styles.stats}>
            {t.stats.map((s) => (
              <span key={s.label}>
                <b className={styles.num}>{s.value}</b> {s.label}
              </span>
            ))}
          </p>

          <p className={styles.status}>
            <i className={styles.pulse} aria-hidden="true" />
            {t.status}
          </p>
          <p className={styles.location}>{t.location}</p>

          <a className={styles.cta} href={`mailto:${email}`}>
            <EnvelopeSimple size={16} weight="bold" aria-hidden="true" />
            {t.emailCta}
          </a>

          <ul className={styles.socials}>
            {socials.map((s) => {
              const Icon = socialIcons[s.id]
              return (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <Icon size={18} weight="regular" aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>
        </aside>

        <main className={styles.main}>
          <RevenueChart locale={locale} />

          <section aria-labelledby="startups-title">
            <header className={styles.sectionHead}>
              <h2 id="startups-title">{t.startupsTitle}</h2>
              <span className={styles.count}>{startups.length}</span>
            </header>
            <ul className={styles.cards}>
              {startups.map((s) => (
                <StartupCard key={s.id} startup={s} locale={locale} />
              ))}
            </ul>
          </section>

          <section aria-labelledby="also-title">
            <header className={styles.sectionHead}>
              <h2 id="also-title">{t.alsoTitle}</h2>
            </header>
            <ul className={styles.side}>
              {sideProjects.map((p) => {
                const body = (
                  <>
                    <Tile item={p} />
                    <span className={styles.sideText}>
                      <span className={styles.sideName}>
                        {p.name}
                        <span className={styles.sideBadge} data-state={p.badgeTone}>
                          {p.badge[locale]}
                        </span>
                      </span>
                      <span className={styles.sideDesc}>{p.description[locale]}</span>
                    </span>
                  </>
                )
                return (
                  <li key={p.name}>
                    {p.href ? (
                      <a className={styles.sideItem} href={p.href} target="_blank" rel="noopener noreferrer">
                        {body}
                      </a>
                    ) : (
                      <div className={styles.sideItem}>{body}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>

          <section aria-labelledby="skills-title">
            <header className={styles.sectionHead}>
              <h2 id="skills-title">{t.skillsTitle}</h2>
            </header>
            <dl className={`${styles.panel} ${styles.skills}`}>
              {skills.map((group) => (
                <div key={group.group.en} className={styles.skillRow}>
                  <dt>{group.group[locale]}</dt>
                  <dd>
                    {group.items.map((item) => (
                      <span key={item} className={styles.chip}>
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
              <div className={styles.skillRow}>
                <dt>{locale === "pt" ? "Línguas" : "Languages"}</dt>
                <dd className={styles.languages}>{t.languages}</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="career-title">
            <header className={styles.sectionHead}>
              <h2 id="career-title">{t.careerTitle}</h2>
            </header>
            <ol className={`${styles.panel} ${styles.career}`}>
              {career.map((r) => (
                <li
                  key={`${r.company}-${r.period.en}`}
                  className={styles.job}
                  data-current={r.current || undefined}
                  data-parallel={r.parallel || undefined}
                >
                  <span className={styles.dot} aria-hidden="true" />
                  <div className={styles.roleHead}>
                    <span className={styles.roleTitle}>
                      {r.role[locale]} <span className={styles.roleCompany}>· {r.company}</span>
                    </span>
                    <span className={styles.period}>
                      {r.current ? <em>{t.now}</em> : null}
                      {r.parallel ? <em>{t.parallel}</em> : null}
                      {r.period[locale]}
                    </span>
                  </div>
                  <p className={styles.roleDetail}>{r.detail[locale]}</p>
                </li>
              ))}
            </ol>
          </section>

          <footer className={styles.footer}>
            <span>© 2026 Alexandre Jaques</span>
            <a href={`mailto:${email}`}>
              {email}
              <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
            </a>
            <span>{t.footer}</span>
          </footer>
        </main>
      </div>
    </div>
  )
}
