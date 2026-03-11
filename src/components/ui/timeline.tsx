"use client"

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

type TimelineEntry = {
  title: string
  content: React.ReactNode
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className="w-full font-[family-name:var(--font-body)] md:px-10" ref={containerRef}>
      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:gap-10 md:pt-40"
          >
            {/* Sticky left column: dot + title (desktop) */}
            <div className="sticky top-40 z-40 flex max-w-xs items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)]">
                <div className="h-4 w-4 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-2 dark:border-[var(--color-border-dark)] dark:bg-[var(--color-surface-subtle-dark)]" />
              </div>
              <h3 className="hidden font-[family-name:var(--font-mono)] text-xl font-medium text-zinc-400 md:block md:pl-20 md:text-3xl dark:text-zinc-600">
                {item.title}
              </h3>
            </div>

            {/* Right column: title (mobile) + content */}
            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 block text-left font-[family-name:var(--font-mono)] text-xl font-medium text-zinc-400 md:hidden dark:text-zinc-600">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Background track line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-zinc-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8 dark:via-zinc-800"
        >
          {/* Animated fill line — teal accent */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-[var(--color-accent)] via-[var(--color-accent-light)] to-transparent from-[0%] via-[10%] motion-reduce:hidden"
          />
        </div>
      </div>
    </div>
  )
}
