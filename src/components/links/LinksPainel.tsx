"use client"

import {
  ArrowClockwise,
  Check,
  Copy,
  DownloadSimple,
  SignOut,
} from "@phosphor-icons/react"
import { useCallback, useEffect, useMemo, useState, type CSSProperties, type FormEvent } from "react"

import { allLinks } from "@/content/links"

import styles from "./LinksPainel.module.css"

/*
 * Private dashboard for /links. Reads aggregated numbers straight from the
 * links-api service (CORS allows this origin). The password lives only on the
 * server; here it is kept in localStorage as a per-device convenience.
 */

const API = process.env.NEXT_PUBLIC_LINKS_API_URL ?? "https://links-api.169.58.162.165.sslip.io"
const KEY = "links-painel"

type Group = { name: string; views: number; clicks: number; visitors: number }
type Totals = { views: number; visitors: number; clicks: number; ctr: number }
type Stats = {
  days: 1 | 7 | 30 | 90
  range: { from: string; to: string }
  totals: Totals
  previous: Totals
  series: { date: string; views: number; clicks: number; visitors: number }[]
  links: { link: string; clicks: number; clickers: number }[]
  sources: Group[]
  mediums: Group[]
  campaigns: Group[]
  countries: Group[]
  devices: Group[]
  browsers: Group[]
  linkBySource: { link: string; source: string; clicks: number }[]
  recent: {
    ts: string
    type: "view" | "click"
    link: string | null
    source: string
    medium: string | null
    campaign: string | null
    country: string | null
    device: string
  }[]
  hours: number[]
}

const RANGES = [
  { days: 1, label: "24h" },
  { days: 7, label: "7d" },
  { days: 30, label: "30d" },
  { days: 90, label: "90d" },
] as const

const linkMeta = new Map(allLinks.map((link) => [link.id, link]))

function linkName(id: string | null) {
  if (!id) return "página"
  return linkMeta.get(id)?.title.pt ?? id
}

function linkTone(id: string) {
  return { "--tone": `var(--${linkMeta.get(id)?.tone ?? "neutral"})` } as CSSProperties
}

const number = new Intl.NumberFormat("pt-PT")
const percent = (value: number) => `${(value * 100).toFixed(1).replace(".", ",")}%`

function delta(current: number, previous: number) {
  if (previous === 0) return current > 0 ? { text: "novo", dir: "up" } : { text: "sem dados", dir: "flat" }
  const change = (current - previous) / previous
  if (Math.abs(change) < 0.005) return { text: "igual", dir: "flat" }
  return {
    text: `${change > 0 ? "+" : ""}${Math.round(change * 100)}%`,
    dir: change > 0 ? "up" : "down",
  }
}

function readSaved() {
  try {
    return window.localStorage.getItem(KEY) ?? ""
  } catch {
    return ""
  }
}

function save(value: string | null) {
  try {
    if (value) window.localStorage.setItem(KEY, value)
    else window.localStorage.removeItem(KEY)
  } catch {
    // Private mode: the session still works until the tab closes.
  }
}

/* UTM builder */

const PRESETS = [
  { label: "Instagram bio", source: "instagram", medium: "bio" },
  { label: "Instagram stories", source: "instagram", medium: "stories" },
  { label: "LinkedIn perfil", source: "linkedin", medium: "perfil" },
  { label: "LinkedIn post", source: "linkedin", medium: "post" },
  { label: "YouTube", source: "youtube", medium: "descricao" },
  { label: "TikTok bio", source: "tiktok", medium: "bio" },
  { label: "WhatsApp", source: "whatsapp", medium: "mensagem" },
  { label: "Assinatura email", source: "email", medium: "assinatura" },
  { label: "QR code", source: "qr", medium: "offline" },
]

function slug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function UtmBuilder() {
  const [source, setSource] = useState("instagram")
  const [medium, setMedium] = useState("bio")
  const [campaign, setCampaign] = useState("")
  const [copied, setCopied] = useState(false)

  const url = useMemo(() => {
    const params = new URLSearchParams()
    if (slug(source)) params.set("utm_source", slug(source))
    if (slug(medium)) params.set("utm_medium", slug(medium))
    if (slug(campaign)) params.set("utm_campaign", slug(campaign))
    const query = params.toString()
    return `https://alexandrejaques.com/links${query ? `?${query}` : ""}`
  }, [source, medium, campaign])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard blocked: the URL is selectable in the field.
    }
  }

  return (
    <section className={`${styles.card} ${styles.wide}`}>
      <h2 className={styles.title}>
        <span>{"// "}gerador de UTM</span>
        <span>um link por canal</span>
      </h2>
      <div className={styles.presets}>
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            className={styles.preset}
            data-active={preset.source === slug(source) && preset.medium === slug(medium)}
            onClick={() => {
              setSource(preset.source)
              setMedium(preset.medium)
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>
      <div className={styles.fields}>
        <label>
          <span>origem</span>
          <input value={source} onChange={(event) => setSource(event.target.value)} />
        </label>
        <label>
          <span>meio</span>
          <input value={medium} onChange={(event) => setMedium(event.target.value)} />
        </label>
        <label>
          <span>campanha (opcional)</span>
          <input
            value={campaign}
            placeholder="ex.: lancamento-outubro"
            onChange={(event) => setCampaign(event.target.value)}
          />
        </label>
      </div>
      <div className={styles.output}>
        <input readOnly value={url} onFocus={(event) => event.currentTarget.select()} aria-label="Link com UTM" />
        <button type="button" className={styles.primary} onClick={copy}>
          {copied ? <Check size={16} weight="bold" /> : <Copy size={16} weight="bold" />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <p className={styles.hint}>
        Para escrever à mão: <code>alexandrejaques.com/links?s=instagram</code> conta como origem
        instagram.
      </p>
    </section>
  )
}

/* Small building blocks */

function Kpi({ label, value, current, previous }: { label: string; value: string; current: number; previous: number }) {
  const change = delta(current, previous)
  return (
    <div className={styles.kpi}>
      <span className={styles.kpiLabel}>{label}</span>
      <strong>{value}</strong>
      <span className={styles.delta} data-dir={change.dir}>
        {change.text} <em>vs anterior</em>
      </span>
    </div>
  )
}

function Bars({ rows, metric }: { rows: Group[]; metric: "views" | "clicks" }) {
  const max = Math.max(1, ...rows.map((row) => row[metric]))
  if (!rows.length) return <p className={styles.empty}>Sem dados neste período.</p>
  return (
    <ul className={styles.bars}>
      {rows.slice(0, 8).map((row, index) => (
        <li key={`${row.name}-${index}`}>
          <span className={styles.barName}>{row.name}</span>
          <span className={styles.barTrack}>
            <i style={{ width: `${(row[metric] / max) * 100}%` }} />
          </span>
          <span className={styles.barValue}>{number.format(row[metric])}</span>
        </li>
      ))}
    </ul>
  )
}

function SeriesChart({ stats }: { stats: Stats }) {
  const hourly = stats.days === 1
  const points = hourly
    ? stats.hours.map((clicks, hour) => ({ key: String(hour), label: `${hour}h`, a: 0, b: clicks }))
    : stats.series.map((day) => ({
        key: day.date,
        label: `${day.date.slice(8, 10)}/${day.date.slice(5, 7)}`,
        a: day.views,
        b: day.clicks,
      }))
  const max = Math.max(1, ...points.map((point) => Math.max(point.a, point.b)))
  const ticks = [0, Math.floor(points.length / 2), points.length - 1]

  return (
    <section className={`${styles.card} ${styles.wide}`}>
      <h2 className={styles.title}>
        <span>{"// "}{hourly ? "cliques por hora (Lisboa)" : "visitas e cliques por dia"}</span>
        <span className={styles.legend}>
          {hourly ? null : (
            <span>
              <i data-k="a" /> visitas
            </span>
          )}
          <span>
            <i data-k="b" /> cliques
          </span>
        </span>
      </h2>
      <div className={styles.chart} role="img" aria-label="Gráfico de visitas e cliques">
        {points.map((point) => (
          <div key={point.key} className={styles.col} title={`${point.label}: ${point.a} visitas, ${point.b} cliques`}>
            {hourly ? null : <i data-k="a" style={{ height: `${(point.a / max) * 100}%` }} />}
            <i data-k="b" style={{ height: `${(point.b / max) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className={styles.axis}>
        {ticks.map((tick, index) => (
          <span key={`${tick}-${index}`}>{points[tick]?.label}</span>
        ))}
      </div>
    </section>
  )
}

/* Login */

function Login({ onSubmit, error, busy }: { onSubmit: (password: string) => void; error: string; busy: boolean }) {
  const [password, setPassword] = useState("")
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (password.trim()) onSubmit(password.trim())
  }
  return (
    <div className={styles.loginWrap}>
      <form className={styles.login} onSubmit={submit}>
        <p className={styles.mono}>{"// "}links / painel</p>
        <h1>Números da página de links</h1>
        <label>
          <span>Palavra-passe</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
          />
        </label>
        {error ? <p className={styles.error}>{error}</p> : null}
        <button type="submit" className={styles.primary} disabled={busy}>
          {busy ? "A entrar…" : "Entrar"}
        </button>
      </form>
    </div>
  )
}

/* Page */

export function LinksPainel() {
  const [password, setPassword] = useState<string | null>(null)
  const [days, setDays] = useState<Stats["days"]>(7)
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const [ready, setReady] = useState(false)

  const load = useCallback(async (secret: string, range: Stats["days"]) => {
    setBusy(true)
    setError("")
    try {
      const response = await fetch(`${API}/stats?days=${range}`, {
        headers: { Authorization: `Bearer ${secret}` },
        cache: "no-store",
      })
      if (response.status === 401) {
        save(null)
        setPassword(null)
        setError("Palavra-passe errada.")
        return
      }
      if (response.status === 429) {
        setError("Demasiadas tentativas. Espera 15 minutos.")
        return
      }
      if (!response.ok) throw new Error(String(response.status))
      setStats((await response.json()) as Stats)
      setPassword(secret)
      save(secret)
    } catch {
      setError("Não consegui falar com o servidor dos números. Tenta outra vez.")
    } finally {
      setBusy(false)
    }
  }, [])

  useEffect(() => {
    const saved = readSaved()
    // Restoring the saved session is a one-off sync with localStorage.
    setReady(true)
    if (saved) void load(saved, 7)
  }, [load])

  const exportCsv = async () => {
    if (!password) return
    try {
      const response = await fetch(`${API}/stats/export.csv?days=${days}`, {
        headers: { Authorization: `Bearer ${password}` },
      })
      if (!response.ok) throw new Error(String(response.status))
      const url = URL.createObjectURL(await response.blob())
      const anchor = document.createElement("a")
      anchor.href = url
      anchor.download = `links-${days}d-${new Date().toISOString().slice(0, 10)}.csv`
      anchor.click()
      URL.revokeObjectURL(url)
    } catch {
      setError("A exportação falhou.")
    }
  }

  if (!ready) return <main className={styles.page} />

  if (!password || !stats) {
    return (
      <main className={styles.page}>
        <Login onSubmit={(secret) => void load(secret, days)} error={error} busy={busy} />
      </main>
    )
  }

  const { totals, previous } = stats
  const maxLink = Math.max(1, ...stats.links.map((row) => row.clicks))
  const maxHour = Math.max(1, ...stats.hours)
  const clicksBySource = stats.sources.filter((row) => row.views || row.clicks)

  return (
    <main className={styles.page}>
      <header className={styles.top}>
        <div>
          <p className={styles.mono}>{"// "}links / painel</p>
          <h1>Página de links</h1>
        </div>
        <div className={styles.actions}>
          <div className={styles.segment} role="tablist" aria-label="Período">
            {RANGES.map((range) => (
              <button
                key={range.days}
                type="button"
                role="tab"
                aria-selected={days === range.days}
                onClick={() => {
                  setDays(range.days)
                  void load(password, range.days)
                }}
              >
                {range.label}
              </button>
            ))}
          </div>
          <button type="button" className={styles.icon} onClick={() => void load(password, days)} aria-label="Atualizar" title="Atualizar">
            <ArrowClockwise size={17} weight="bold" className={busy ? styles.spin : undefined} />
          </button>
          <button type="button" className={styles.icon} onClick={exportCsv} aria-label="Exportar CSV" title="Exportar CSV">
            <DownloadSimple size={17} weight="bold" />
          </button>
          <button
            type="button"
            className={styles.icon}
            onClick={() => {
              save(null)
              setPassword(null)
              setStats(null)
            }}
            aria-label="Sair"
            title="Sair"
          >
            <SignOut size={17} weight="bold" />
          </button>
        </div>
      </header>

      {error ? <p className={styles.error}>{error}</p> : null}

      <section className={styles.kpis}>
        <Kpi label="visitas" value={number.format(totals.views)} current={totals.views} previous={previous.views} />
        <Kpi label="visitantes" value={number.format(totals.visitors)} current={totals.visitors} previous={previous.visitors} />
        <Kpi label="cliques" value={number.format(totals.clicks)} current={totals.clicks} previous={previous.clicks} />
        <Kpi label="taxa de clique" value={percent(totals.ctr)} current={totals.ctr} previous={previous.ctr} />
      </section>

      <div className={styles.grid}>
        <SeriesChart stats={stats} />

        <section className={styles.card}>
          <h2 className={styles.title}>
            <span>{"// "}cliques por link</span>
            <span>únicos</span>
          </h2>
          {stats.links.length ? (
            <ul className={styles.linkBars}>
              {stats.links.map((row) => (
                <li key={row.link} style={linkTone(row.link)}>
                  <span className={styles.barName}>{linkName(row.link)}</span>
                  <span className={styles.barTrack}>
                    <i style={{ width: `${(row.clicks / maxLink) * 100}%` }} />
                  </span>
                  <span className={styles.barValue}>
                    {number.format(row.clicks)} <em>{number.format(row.clickers)}</em>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>Ainda ninguém clicou neste período.</p>
          )}
        </section>

        <section className={styles.card}>
          <h2 className={styles.title}>
            <span>{"// "}de onde vêm</span>
            <span>visitas · cliques · taxa</span>
          </h2>
          {clicksBySource.length ? (
            <table className={styles.table}>
              <tbody>
                {clicksBySource.slice(0, 10).map((row, index) => (
                  <tr key={`${row.name}-${index}`}>
                    <th scope="row">{row.name}</th>
                    <td>{number.format(row.views)}</td>
                    <td>{number.format(row.clicks)}</td>
                    <td>{row.views ? percent(row.clicks / row.views) : "·"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className={styles.empty}>Sem visitas neste período.</p>
          )}
        </section>

        <section className={styles.card}>
          <h2 className={styles.title}>
            <span>{"// "}campanhas</span>
            <span>cliques</span>
          </h2>
          <Bars rows={stats.campaigns} metric="clicks" />
          <h2 className={`${styles.title} ${styles.sub}`}>
            <span>{"// "}meios</span>
            <span>cliques</span>
          </h2>
          <Bars rows={stats.mediums} metric="clicks" />
        </section>

        <section className={styles.card}>
          <h2 className={styles.title}>
            <span>{"// "}países</span>
            <span>visitas</span>
          </h2>
          <Bars rows={stats.countries} metric="views" />
        </section>

        <section className={styles.card}>
          <h2 className={styles.title}>
            <span>{"// "}dispositivos</span>
            <span>visitas</span>
          </h2>
          <Bars rows={stats.devices} metric="views" />
          <h2 className={`${styles.title} ${styles.sub}`}>
            <span>{"// "}navegadores</span>
            <span>visitas</span>
          </h2>
          <Bars rows={stats.browsers} metric="views" />
        </section>

        <section className={styles.card}>
          <h2 className={styles.title}>
            <span>{"// "}link × origem</span>
            <span>cliques</span>
          </h2>
          {stats.linkBySource.length ? (
            <table className={styles.table}>
              <tbody>
                {stats.linkBySource.slice(0, 10).map((row) => (
                  <tr key={`${row.link}-${row.source}`}>
                    <th scope="row">
                      <i className={styles.dot} style={linkTone(row.link)} />
                      {linkName(row.link)}
                    </th>
                    <td className={styles.left}>{row.source}</td>
                    <td>{number.format(row.clicks)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className={styles.empty}>Sem cliques neste período.</p>
          )}
        </section>

        <section className={styles.card}>
          <h2 className={styles.title}>
            <span>{"// "}hora dos cliques</span>
            <span>Lisboa</span>
          </h2>
          <div className={styles.hours}>
            {stats.hours.map((value, hour) => (
              <span
                key={hour}
                title={`${hour}h: ${value} cliques`}
                style={{ "--a": value / maxHour } as CSSProperties}
              >
                {hour % 6 === 0 ? hour : ""}
              </span>
            ))}
          </div>
        </section>

        <section className={`${styles.card} ${styles.wide}`}>
          <h2 className={styles.title}>
            <span>{"// "}atividade recente</span>
            <span>últimos {stats.recent.length}</span>
          </h2>
          {stats.recent.length ? (
            <ol className={styles.log}>
              {stats.recent.map((event, index) => (
                <li key={`${event.ts}-${index}`}>
                  <time>
                    {new Date(event.ts).toLocaleString("pt-PT", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "Europe/Lisbon",
                    })}
                  </time>
                  <span data-type={event.type}>{event.type === "click" ? "clique" : "visita"}</span>
                  <strong>{event.type === "click" ? linkName(event.link) : "página"}</strong>
                  <span className={styles.logMeta}>
                    {[event.source, event.medium, event.campaign, event.country, event.device]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className={styles.empty}>Nada ainda. Partilha o link e volta cá.</p>
          )}
        </section>

        <UtmBuilder />
      </div>
      <p className={styles.credit}>
        Países calculados com <a href="https://db-ip.com">IP Geolocation by DB-IP</a> (CC BY 4.0).
        O IP não é guardado.
      </p>
    </main>
  )
}
