"use client"

import { useTranslation } from "@/lib/i18n"

type Quote = {
  body: string
  initials: string
  name: string
  role: string
}

export function Testimonials() {
  const { t, tValue } = useTranslation()
  const quotes = tValue<Quote[]>("testimonials.quotes") ?? []

  return (
    <section className="sec" id="testimonials">
      <div className="wrap">
        <div className="sec-head">
          <div className="num-col">
            <div className="big">/06</div>
            <div className="lab">{t("testimonials.label")}</div>
          </div>
          <div className="title-col">
            <h2>
              {t("testimonials.headlinePrefix")}
              <span className="it">{t("testimonials.headlineEm")}</span>
              <br />
              {t("testimonials.headlineSuffix")}
            </h2>
          </div>
          <div className="meta-col mono">
            {t("testimonials.metaCount")}
            <br />
            {t("testimonials.metaSource")}
          </div>
        </div>

        <div className="quotes">
          {quotes.map((q) => (
            <div key={q.name} className="quote reveal">
              <p className="quote-body">{q.body}</p>
              <div className="quote-foot">
                <div className="avatar">{q.initials}</div>
                <div className="who">
                  <span className="n">{q.name}</span>
                  <span className="r">{q.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
