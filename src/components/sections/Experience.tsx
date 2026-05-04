"use client"

import { useTranslation } from "@/lib/i18n"

type Role = {
  date: string
  role: string
  company: string
  desc: string
  tag: string
}

export function Experience() {
  const { t, tValue } = useTranslation()
  const roles = tValue<Role[]>("experience.roles") ?? []

  return (
    <section className="sec" id="experience">
      <div className="wrap">
        <div className="sec-head">
          <div className="num-col">
            <div className="big">/04</div>
            <div className="lab">{t("experience.label")}</div>
          </div>
          <div className="title-col">
            <h2>
              {t("experience.headlinePrefix")}
              <span className="it">{t("experience.headlineEm")}</span>
              <br />
              {t("experience.headlineSuffix")}
            </h2>
          </div>
          <div className="meta-col mono">
            {t("experience.metaPeriod")}
            <br />
            {t("experience.metaYears")}
          </div>
        </div>

        <div className="timeline">
          <div className="tl-list">
            {roles.map((r) => (
              <div key={`${r.role}-${r.date}`} className="tl-row reveal">
                <div className="tl-date">{r.date}</div>
                <div className="tl-role">
                  {r.role}
                  <em>{r.company}</em>
                </div>
                <div className="tl-desc">{r.desc}</div>
                <div className="tl-tag">{r.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
