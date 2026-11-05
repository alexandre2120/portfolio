import type { Viewport } from "next"

import { IndieHome } from "@/components/home/IndieHome"

export const viewport: Viewport = {
  themeColor: "#0d0c0b",
  colorScheme: "dark",
}

// The root layout paints the paper background on html and body. The home is
// dark, so overscroll and the iOS bounce must show the night colour too.
const night = "html,body{background:#0d0c0b}"

export default function Home() {
  return (
    <>
      <style>{night}</style>
      <IndieHome />
    </>
  )
}
