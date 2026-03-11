import { type Metadata } from "next"
import { Bricolage_Grotesque, Newsreader, JetBrains_Mono } from "next/font/google"

import { Providers } from "@/app/providers"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

import "@/styles/tailwind.css"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: {
    template: "%s - Alexandre Jaques",
    default: "Alexandre Jaques - Full-Stack Developer",
  },
  description:
    "Full-Stack Developer based in Lisbon, specializing in JavaScript, React, Next.js, AI coding, and workflow automation.",
  icons: {
    icon: [
      {
        url: "/Dark.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/Light.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${bricolage.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="noise-bg flex h-full flex-col bg-[var(--color-surface)] font-[family-name:var(--font-body)] text-zinc-700 dark:bg-[var(--color-surface-dark)] dark:text-zinc-300">
        <Providers>
          <Header />
          <main className="flex-auto">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
