"use client"

import { useEffect } from "react"

export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in")
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    )
    document
      .querySelectorAll(".reveal, .reveal-stagger, .skill-row")
      .forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}
