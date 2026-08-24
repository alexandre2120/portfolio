import { ArrowRight } from "@phosphor-icons/react"

import styles from "./FoldMenu.module.css"

export type FoldMenuStatusTone = "live" | "progress" | "neutral" | "studio"

export interface FoldMenuItem {
  number: string
  label: string
  status: string
  description: string
  href: string
  statusTone?: FoldMenuStatusTone
}

export interface FoldMenuProps {
  items: readonly FoldMenuItem[]
  ariaLabel?: string
  className?: string
  initialActiveIndex?: number | null
}

export function FoldMenu({
  items,
  ariaLabel,
  className,
  initialActiveIndex,
}: FoldMenuProps) {
  const activeIndex =
    initialActiveIndex !== null &&
    initialActiveIndex !== undefined &&
    initialActiveIndex >= 0 &&
    initialActiveIndex < items.length
      ? initialActiveIndex
      : null
  const menuClassName = [styles.menu, className].filter(Boolean).join(" ")

  return (
    <nav className={menuClassName} aria-label={ariaLabel}>
      <ol className={styles.stack}>
        {items.map((item, index) => {
          const isActive = activeIndex === index

          return (
            <li
              className={`${styles.item} ${isActive ? styles.active : ""}`}
              data-status-tone={item.statusTone ?? "neutral"}
              key={`${item.number}-${item.href}`}
            >
              <a className={styles.link} href={item.href}>
                <span className={styles.number}>{item.number}</span>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.status}>
                  <span className={styles.statusDot} aria-hidden="true" />
                  {item.status}
                </span>
                <span className={styles.description}>{item.description}</span>
                <ArrowRight
                  aria-hidden="true"
                  className={styles.arrow}
                  size={20}
                  weight="regular"
                />
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
