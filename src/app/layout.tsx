import { type Metadata } from "next"
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google"

import { Analytics } from "@vercel/analytics/next"

import { Providers } from "@/app/providers"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

import "@/styles/tailwind.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <div className="grain" />
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
