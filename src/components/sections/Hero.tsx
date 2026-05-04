"use client"

import Image from "next/image"
import { Fragment } from "react"
import { useTranslation } from "@/lib/i18n"

export function Hero() {
  const { t, tArray } = useTranslation()
  const marqueeItems = tArray("hero.marqueeItems")
  const renderMarquee = () =>
    marqueeItems.map((item, i) => (
      <Fragment key={`${item}-${i}`}>
        <span>{item}</span>
        <span className="sep">{"</>"}</span>
      </Fragment>
    ))

  return (
    <>
      <section className="hero" id="top">
        <div className="wrap">
          <div className="hero-meta mono">
            <div className="col">
              <span>{t("hero.indexLabel")}</span>
              <span>{t("hero.portfolioLabel")}</span>
            </div>
            <div className="col" style={{ textAlign: "center" }}>
              <span>Lat 38.7223° N</span>
              <span>Lon 9.1393° W</span>
            </div>
            <div className="col" style={{ textAlign: "right" }}>
              <span>{t("hero.statusLabel")}</span>
              <span style={{ color: "#22c55e" }}>{t("hero.statusValue")}</span>
            </div>
          </div>

          <h1>
            {t("hero.firstName")}
            <br />
            <span className="it">
              {t("hero.lastName")}
              <span className="accent">.</span>
            </span>
          </h1>

          <div className="hero-sub">
            <p className="lede">
              {t("hero.ledePrefix")}
              <em>{t("hero.ledeEm")}</em>
              {t("hero.ledeSuffix")}
            </p>
            <div className="meta-block">
              <div>
                <span className="lab">{t("hero.currentlyLabel")}</span>
                {t("hero.currentlyLine1")}
                <br />
                {t("hero.currentlyLine2")}
              </div>
              <div>
                <span className="lab">{t("hero.stackLabel")}</span>
                {t("hero.stackLine1")}
                <br />
                {t("hero.stackLine2")}
              </div>
              <div>
                <span className="lab">{t("hero.availableLabel")}</span>
                {t("hero.availableLine1")}
                <br />
                {t("hero.availableLine2")}
              </div>
            </div>
          </div>

          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">
              {t("hero.ctaPrimary")}
              <span className="arr">↗</span>
            </a>
            <a href="#work" className="btn">
              {t("hero.ctaSecondary")}
              <span className="arr">→</span>
            </a>
          </div>

          <div className="stamp">
            <Image
              src="/profile.png"
              alt="Alexandre Jaques"
              fill
              sizes="200px"
              style={{ objectFit: "cover" }}
              priority
            />
            <span className="badge">{t("hero.stampBadge")}</span>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>{renderMarquee()}</span>
          <span>{renderMarquee()}</span>
        </div>
      </div>
    </>
  )
}
