"use client"

import { useTranslation } from "@/lib/i18n"

type SkillRow = { name: string; pct: number }
type SkillCard = { num: string; title: string; rows: SkillRow[] }

export function Skills() {
  const { t, tValue } = useTranslation()
  const cards = tValue<SkillCard[]>("skills.categories") ?? []

  return (
    <section className="sec" id="skills">
      <div className="wrap">
        <div className="sec-head">
          <div className="num-col">
            <div className="big">/05</div>
            <div className="lab">{t("skills.label")}</div>
          </div>
          <div className="title-col">
            <h2>
              {t("skills.headlinePrefix")}
              <span className="it">{t("skills.headlineEm")}</span>
              <br />
              {t("skills.headlineSuffix")}
            </h2>
          </div>
          <div className="meta-col mono">
            {t("skills.metaCategories")}
            <br />
            {t("skills.metaDisciplines")}
          </div>
        </div>

        <div className="skills">
          {cards.map((card) => (
            <div key={card.num} className="skill-card">
              <span className="num">{card.num}</span>
              <h3>{card.title}</h3>
              <div className="skill-list">
                {card.rows.map((r) => (
                  <div
                    key={r.name}
                    className="skill-row"
                    style={
                      { "--p": (r.pct / 100).toString() } as React.CSSProperties
                    }
                  >
                    <div className="top">
                      <span className="name">{r.name}</span>
                      <span className="pct">{r.pct}</span>
                    </div>
                    <div className="skill-bar">
                      <div className="fill" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
