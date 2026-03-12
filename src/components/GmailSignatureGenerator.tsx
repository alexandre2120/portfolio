"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/Button"

const PHOTO_PUBLIC_URL = "https://alexandrejaques.com/profile-square.png"
const PHOTO_LOCAL_URL = "/profile-square.png"

function getSignatureHTML(photoUrl: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;color:#0c0c0c;">
  <tr>
    <td colspan="2" style="padding-bottom:16px;">
      <p style="margin:0;font-size:14px;color:#52525b;font-style:italic;">Best Regards / Melhores Cumprimentos,</p>
    </td>
  </tr>
  <tr>
    <td style="vertical-align:top;padding-right:16px;">
      <a href="https://alexandrejaques.com" target="_blank" rel="noopener noreferrer">
        <img src="${photoUrl}" alt="Alexandre Jaques" width="80" height="80" style="width:80px;height:80px;border-radius:8px;display:block;" />
      </a>
    </td>
    <td style="vertical-align:top;">
      <p style="margin:0 0 2px 0;font-size:16px;font-weight:700;color:#0c0c0c;">
        Alexandre Jaques
      </p>
      <p style="margin:0 0 8px 0;font-size:13px;color:#52525b;">
        Full-Stack Developer &amp; Founder
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding-right:10px;">
            <a href="https://alexandrejaques.com" style="text-decoration:none;font-size:12px;color:#0d9488;font-weight:600;">alexandrejaques.com</a>
          </td>
          <td style="padding:0 10px;border-left:1px solid #d4d4d8;">
            <a href="mailto:alexandrjaques@gmail.com" style="text-decoration:none;font-size:12px;color:#0d9488;font-weight:500;">Email</a>
          </td>
          <td style="padding:0 10px;border-left:1px solid #d4d4d8;">
            <a href="https://github.com/alexandrejaques" style="text-decoration:none;font-size:12px;color:#0d9488;font-weight:500;">GitHub</a>
          </td>
          <td style="padding:0 10px;border-left:1px solid #d4d4d8;">
            <a href="https://linkedin.com/in/alexandrejaques" style="text-decoration:none;font-size:12px;color:#0d9488;font-weight:500;">LinkedIn</a>
          </td>
        </tr>
      </table>
      <p style="margin:8px 0 0 0;font-size:11px;color:#a1a1aa;">
        Lisbon, Portugal
      </p>
    </td>
  </tr>
</table>`
}

export function GmailSignatureGenerator() {
  const [copied, setCopied] = useState(false)
  const signatureRef = useRef<HTMLDivElement>(null)

  // Preview uses local path (works in dev), copy uses public URL (works in Gmail)
  const previewHTML = getSignatureHTML(PHOTO_LOCAL_URL)
  const exportHTML = getSignatureHTML(PHOTO_PUBLIC_URL)

  const handleCopyHTML = async () => {
    try {
      const blob = new Blob([exportHTML], { type: "text/html" })
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": blob,
          "text/plain": new Blob([exportHTML], { type: "text/plain" }),
        }),
      ])
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      await navigator.clipboard.writeText(exportHTML)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleDownload = async () => {
    try {
      const { default: html2canvas } = await import("html2canvas")
      if (!signatureRef.current) return

      const canvas = await html2canvas(signatureRef.current, {
        backgroundColor: "#ffffff",
        scale: 3,
        logging: false,
        useCORS: true,
      })

      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = "gmail-signature-alexandre-jaques.png"
      link.click()
    } catch (err) {
      console.error("Failed to download:", err)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Preview */}
      <div className="lg:col-span-2">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-sm dark:border-[var(--color-border-dark)] dark:bg-[var(--color-surface-elevated-dark)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-red-400/70" />
            <div className="h-3 w-3 rounded-full bg-yellow-400/70" />
            <div className="h-3 w-3 rounded-full bg-green-400/70" />
            <span className="ml-2 font-[family-name:var(--font-mono)] text-xs text-zinc-400 dark:text-zinc-500">
              Gmail Signature Preview
            </span>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-8 dark:border-zinc-700">
            <div
              ref={signatureRef}
              style={{ padding: "8px", background: "#ffffff" }}
              dangerouslySetInnerHTML={{ __html: previewHTML }}
            />
          </div>
        </div>
      </div>

      {/* Actions sidebar */}
      <div>
        <div className="sticky top-20 space-y-4">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 dark:border-[var(--color-border-dark)] dark:bg-[var(--color-surface-elevated-dark)]">
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Export
            </h3>

            <Button
              onClick={handleCopyHTML}
              variant={copied ? "secondary" : "primary"}
              className="w-full justify-center"
            >
              {copied ? "Copied!" : "Copy as Rich Text"}
            </Button>

            <Button
              onClick={handleDownload}
              variant="secondary"
              className="mt-3 w-full justify-center"
            >
              Download PNG
            </Button>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 dark:border-[var(--color-border-dark)] dark:bg-[var(--color-surface-elevated-dark)]">
            <h3 className="mb-3 font-[family-name:var(--font-display)] text-sm font-bold text-zinc-900 dark:text-zinc-100">
              How to use in Gmail
            </h3>
            <ol className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex gap-2">
                <span className="font-[family-name:var(--font-mono)] text-xs font-bold text-[var(--color-accent)]">1</span>
                <span>Click &quot;Copy as Rich Text&quot;</span>
              </li>
              <li className="flex gap-2">
                <span className="font-[family-name:var(--font-mono)] text-xs font-bold text-[var(--color-accent)]">2</span>
                <span>Gmail &rarr; Settings &rarr; See all settings</span>
              </li>
              <li className="flex gap-2">
                <span className="font-[family-name:var(--font-mono)] text-xs font-bold text-[var(--color-accent)]">3</span>
                <span>Scroll to &quot;Signature&quot; section</span>
              </li>
              <li className="flex gap-2">
                <span className="font-[family-name:var(--font-mono)] text-xs font-bold text-[var(--color-accent)]">4</span>
                <span>Paste (Ctrl/Cmd + V) in the editor</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
