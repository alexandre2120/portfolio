import { type Metadata } from "next"
import localFont from "next/font/local"

import { Analytics } from "@vercel/analytics/next"

import { Providers } from "@/app/providers"

import "@/styles/tailwind.css"

const generalSans = localFont({
  src: [
    {
      path: "../../public/fonts/GeneralSans-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-general",
  display: "swap",
})

const anton = localFont({
  src: "../../public/fonts/Anton-Regular.ttf",
  variable: "--font-anton",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://alexandrejaques.com"),
  title: {
    template: "%s - Alexandre Jaques",
    default: "Alexandre Jaques - AI Integration Engineer",
  },
  description:
    "AI Integration Engineer based in Lisbon. LLM pipelines, API integrations, and workflow automation with n8n, Python, and TypeScript.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Alexandre Jaques - AI Integration Engineer",
    description:
      "LLMs, APIs, and automation for real business systems. Based in Lisbon.",
    type: "website",
    url: "/",
    siteName: "Alexandre Jaques",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexandre Jaques - AI Integration Engineer",
    description: "LLMs, APIs, and automation for real business systems.",
  },
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
      className={`${generalSans.variable} ${anton.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <div className="grain" aria-hidden="true" />
          {children}
        </Providers>
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  )
}
