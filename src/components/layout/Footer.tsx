"use client"

import { useTranslation } from "@/lib/i18n"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="row">
          <div>{t("footer.rights")}</div>
          <div>{t("footer.location")}</div>
          <div>{t("footer.version")}</div>
        </div>
      </div>
    </footer>
  )
}
