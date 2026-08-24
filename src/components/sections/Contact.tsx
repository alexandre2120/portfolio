"use client"

import { useTranslation } from "@/lib/i18n"

export function Contact() {
  const { t } = useTranslation()

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="inner">
          <div className="available">
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            {t("contact.available")}
          </div>
          <h2>
            {t("contact.headlinePrefix")}
            <span className="it">{t("contact.headlineEm")}</span>
            <br />
            {t("contact.headlineSuffix")}
          </h2>
          <a href="mailto:alexandrjaques@gmail.com" className="email">
            <span>alexandrjaques@gmail.com</span>
            <span>↗</span>
          </a>
          <div className="socials">
            <a
              href="https://github.com/alexandre2120"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("contact.github")} <span className="arr">↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/alexandrejaques/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("contact.linkedin")} <span className="arr">↗</span>
            </a>
            <a href="mailto:alexandrjaques@gmail.com">
              {t("contact.email")} <span className="arr">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
