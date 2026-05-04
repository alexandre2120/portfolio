"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "@/lib/i18n"

type Slide = { src: string; stamp: string; alt?: string }
type Deck = {
  num: string
  title: React.ReactNode
  stack: string
  scope: string
  slideWidth: number
  slides: Slide[]
}

const PADEL_IMAGES = [
  "/mockups/padel-01.jpg",
  "/mockups/padel-02.jpg",
  "/mockups/padel-03.jpg",
  "/mockups/padel-04.jpg",
  "/mockups/padel-05.jpg",
  "/mockups/padel-06.jpg",
  "/mockups/padel-07.jpg",
  "/mockups/padel-08.jpg",
  "/mockups/padel-09.jpg",
]

const DAILLO_IMAGES = [
  "/mockups/daillo-01.jpg",
  "/mockups/daillo-02.jpg",
  "/mockups/daillo-03.jpg",
  "/mockups/daillo-04.jpg",
  "/mockups/daillo-05.jpg",
  "/mockups/daillo-06.jpg",
  "/mockups/daillo-07.jpg",
  "/mockups/daillo-08.jpg",
]

function Carousel({
  deck,
  stackLabel,
  scopeLabel,
  onOpenLightbox,
}: {
  deck: Deck
  stackLabel: string
  scopeLabel: string
  onOpenLightbox: (src: string, meta: string) => void
}) {
  const [idx, setIdx] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const total = deck.slides.length

  const apply = useCallback((i: number) => {
    const stage = stageRef.current
    const track = trackRef.current
    const slide = slideRefs.current[i]
    if (!stage || !track || !slide) return
    const stageRect = stage.getBoundingClientRect()
    const tx = stageRect.width / 2 - slide.offsetWidth / 2 - slide.offsetLeft
    track.style.transform = `translateX(${tx}px)`
  }, [])

  useEffect(() => {
    apply(idx)
  }, [idx, apply])

  useEffect(() => {
    const onResize = () => apply(idx)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [idx, apply])

  // touch swipe
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let sx = 0
    let dx = 0
    let dragging = false
    const onStart = (e: TouchEvent) => {
      sx = e.touches[0].clientX
      dragging = true
    }
    const onMove = (e: TouchEvent) => {
      if (dragging) dx = e.touches[0].clientX - sx
    }
    const onEnd = () => {
      if (Math.abs(dx) > 40) {
        setIdx((i) => Math.max(0, Math.min(total - 1, i + (dx < 0 ? 1 : -1))))
      }
      dragging = false
      dx = 0
    }
    stage.addEventListener("touchstart", onStart)
    stage.addEventListener("touchmove", onMove)
    stage.addEventListener("touchend", onEnd)
    return () => {
      stage.removeEventListener("touchstart", onStart)
      stage.removeEventListener("touchmove", onMove)
      stage.removeEventListener("touchend", onEnd)
    }
  }, [total])

  const go = (i: number) => setIdx(Math.max(0, Math.min(total - 1, i)))

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(idx - 1)
    if (e.key === "ArrowRight") go(idx + 1)
  }

  const counter = String(idx + 1).padStart(2, "0")
  const totalStr = String(total).padStart(2, "0")

  return (
    <div className="mk" tabIndex={0} onKeyDown={onKey}>
      <div className="mk-head">
        <div className="mk-num">{deck.num}</div>
        <div className="mk-title">{deck.title}</div>
        <div className="mk-meta">
          <div>
            <span className="lab">{stackLabel}</span>
            {deck.stack}
          </div>
          <div style={{ marginTop: 10 }}>
            <span className="lab">{scopeLabel}</span>
            {deck.scope}
          </div>
        </div>
        <div className="mk-counter">
          <b className="now">{counter}</b> /{" "}
          <span className="total">{totalStr}</span>
        </div>
      </div>

      <div className="mk-stage" ref={stageRef}>
        <div className="mk-track" ref={trackRef}>
          {deck.slides.map((s, i) => (
            <div
              key={s.src}
              ref={(el) => {
                slideRefs.current[i] = el
              }}
              className={`mk-slide ${i === idx ? "is-active" : "is-side"}`}
              style={{ width: deck.slideWidth, aspectRatio: "1.414 / 1" }}
              onClick={() => {
                if (i === idx) onOpenLightbox(s.src, s.stamp)
                else go(i)
              }}
            >
              <span className="mk-stamp">{s.stamp}</span>
              <Image
                src={s.src}
                alt={s.alt ?? ""}
                width={deck.slideWidth}
                height={Math.round(deck.slideWidth / 1.414)}
                style={{ width: "100%", height: "100%", objectFit: "contain", background: "#fff" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mk-controls">
        <div className="mk-progress">
          <div
            className="fill"
            style={{ width: `${((idx + 1) / total) * 100}%` }}
          />
        </div>
        <div className="mk-pager">
          {deck.slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              className={i === idx ? "is-active" : ""}
              onClick={() => go(i)}
            >
              <span className="b" />
            </button>
          ))}
        </div>
        <div className="mk-arrows">
          <button
            type="button"
            className="mk-arrow"
            aria-label="Previous"
            onClick={() => go(idx - 1)}
            disabled={idx === 0}
          >
            ←
          </button>
          <button
            type="button"
            className="mk-arrow"
            aria-label="Next"
            onClick={() => go(idx + 1)}
            disabled={idx === total - 1}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

export function Mockups() {
  const { t, tArray } = useTranslation()
  const [lightbox, setLightbox] = useState<{ src: string; meta: string } | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const padelSlideStamps = tArray("mockups.padel.slides")
  const dailloSlideStamps = tArray("mockups.daillo.slides")

  const decks: Deck[] = [
    {
      num: "/01",
      title: (
        <>
          {t("mockups.padel.title")} <em>{t("mockups.padel.titleEm")}</em>
        </>
      ),
      stack: t("mockups.padel.stack"),
      scope: t("mockups.padel.scope"),
      slideWidth: 1024,
      slides: PADEL_IMAGES.map((src, i) => ({
        src,
        stamp: padelSlideStamps[i] ?? "",
        alt: i === 0 ? t("mockups.padel.title") : undefined,
      })),
    },
    {
      num: "/02",
      title: (
        <>
          {t("mockups.daillo.title")} <em>{t("mockups.daillo.titleEm")}</em>
        </>
      ),
      stack: t("mockups.daillo.stack"),
      scope: t("mockups.daillo.scope"),
      slideWidth: 880,
      slides: DAILLO_IMAGES.map((src, i) => ({
        src,
        stamp: dailloSlideStamps[i] ?? "",
        alt: i === 0 ? t("mockups.daillo.title") : undefined,
      })),
    },
  ]

  return (
    <>
      <section className="sec mockups" id="mockups">
        <div className="wrap">
          <div className="sec-head">
            <div className="num-col">
              <div className="big">/03</div>
              <div className="lab">{t("mockups.label")}</div>
            </div>
            <div className="title-col">
              <h2>
                {t("mockups.headlinePrefix")}
                <span className="it">{t("mockups.headlineEm")}</span>
              </h2>
            </div>
            <div className="meta-col mono">
              {t("mockups.metaDecks")}
              <br />
              {t("mockups.metaScreens")}
            </div>
          </div>
        </div>

        <div className="mk-deck">
          {decks.map((deck) => (
            <Carousel
              key={deck.num}
              deck={deck}
              stackLabel={t("mockups.stackLabel")}
              scopeLabel={t("mockups.scopeLabel")}
              onOpenLightbox={(src, meta) => setLightbox({ src, meta })}
            />
          ))}
        </div>
      </section>

      <div
        className={`mk-lb ${lightbox ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) setLightbox(null)
        }}
      >
        <button
          type="button"
          className="mk-lb-close"
          aria-label="Close"
          onClick={() => setLightbox(null)}
        >
          ×
        </button>
        {lightbox && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightbox.src} alt="" />
            <div className="mk-lb-meta">{lightbox.meta}</div>
          </>
        )}
      </div>
    </>
  )
}
