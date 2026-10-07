import type { Viewport } from "next"

export const viewport: Viewport = {
  themeColor: "#0d0c0b",
  colorScheme: "dark",
}

// The root layout paints the paper background on html and body. This route
// is dark, so overscroll and the iOS bounce must show the night colour too.
const night = "html,body{background:#0d0c0b}"

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{night}</style>
      {children}
    </>
  )
}
