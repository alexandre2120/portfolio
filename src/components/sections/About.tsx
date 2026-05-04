"use client"

import Image from "next/image"
import { useTranslation } from "@/lib/i18n"

export function About() {
  const { t } = useTranslation()

  return (
    <section className="sec" id="about">
      <div className="wrap">
        <div className="sec-head">
          <div className="num-col">
            <div className="big">/01</div>
            <div className="lab">{t("about.label")}</div>
          </div>
          <div className="title-col">
            <h2>
              {t("about.headlinePrefix")}
              <br />
              {t("about.headlineMiddle")}
              <span className="it">{t("about.headlineEm")}</span>
            </h2>
          </div>
          <div className="meta-col mono">
            {t("about.metaSection")}
            <br />
            {t("about.metaUpdated")}
          </div>
        </div>

        <div className="about-grid">
          <div className="about-portrait reveal">
            <div className="frame">
              <Image
                src="/portrait-suit.jpg"
                alt="Alexandre Jaques"
                fill
                sizes="(max-width: 900px) 100vw, 30vw"
                style={{ objectFit: "cover" }}
              />
              <div className="corners">
                <i />
              </div>
            </div>
            <div className="tag">
              <span>{t("about.tagName")}</span>
              <span>{t("about.tagEst")}</span>
            </div>
          </div>

          <div className="about-body reveal">
            <p className="about-lede">
              {t("about.ledePrefix")}
              <em>{t("about.ledeEm")}</em>
              {t("about.ledeSuffix")}
            </p>
            <p className="about-p">{t("about.p1")}</p>
            <p className="about-p">{t("about.p2")}</p>

            <div className="about-stats">
              <div className="stat">
                <div className="v">
                  6<sup>+</sup>
                </div>
                <div className="l">{t("about.stat1Label")}</div>
              </div>
              <div className="stat">
                <div className="v">
                  60<sup>%</sup>
                </div>
                <div className="l">{t("about.stat2Label")}</div>
              </div>
              <div className="stat">
                <div className="v">5</div>
                <div className="l">{t("about.stat3Label")}</div>
              </div>
              <div className="stat">
                <div className="v">∞</div>
                <div className="l">{t("about.stat4Label")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
