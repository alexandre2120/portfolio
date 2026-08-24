"use client"

import { useTranslation } from "@/lib/i18n"

type CaseStudy = {
  num: string
  title: string
  problem: string
  architecture: string
  result: string
}

export function Skills() {
  const { t, tValue } = useTranslation()
  const cases = tValue<CaseStudy[]>("skills.cases") ?? []

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
          {cases.map((c) => (
            <div key={c.num} className="skill-card">
              <span className="num mono">{c.num}</span>
              <h3>{c.title}</h3>
              <div className="skill-list" style={{ display: "grid", gap: 16 }}>
                <div>
                  <span
                    className="mono"
                    style={{
                      display: "block",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      marginBottom: 4,
                    }}
                  >
                    {t("skills.problemLabel")}
                  </span>
                  <p style={{ fontSize: 14, lineHeight: 1.55 }}>{c.problem}</p>
                </div>
                <div>
                  <span
                    className="mono"
                    style={{
                      display: "block",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      marginBottom: 4,
                    }}
                  >
                    {t("skills.architectureLabel")}
                  </span>
                  <p style={{ fontSize: 14, lineHeight: 1.55 }}>
                    {c.architecture}
                  </p>
                </div>
                <div>
                  <span
                    className="mono"
                    style={{
                      display: "block",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      marginBottom: 4,
                    }}
                  >
                    {t("skills.resultLabel")}
                  </span>
                  <p style={{ fontSize: 14, lineHeight: 1.55 }}>{c.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
