"use client"

import Image from "next/image"
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from "@headlessui/react"
import clsx from "clsx"

import { Container } from "@/components/ui/Container"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { LanguageToggle } from "@/components/layout/LanguageToggle"
import { useTranslation } from "@/lib/i18n"

function MenuIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 8h16M4 16h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CloseIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type NavSection = {
  id: string
  label: string
}

function MobileNavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <PopoverButton
        as="a"
        href={href}
        className="block min-h-[44px] py-3 font-[family-name:var(--font-display)] text-lg font-medium text-zinc-800 transition hover:text-[var(--color-accent)] dark:text-zinc-200 dark:hover:text-[var(--color-accent-light)]"
      >
        {children}
      </PopoverButton>
    </li>
  )
}

function MobileNavigation({
  sections,
  ...props
}: { sections: NavSection[] } & React.ComponentPropsWithoutRef<
  typeof Popover
>) {
  return (
    <Popover {...props}>
      <PopoverButton
        className="group flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        aria-label="Open navigation menu"
      >
        <MenuIcon className="h-6 w-6" />
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-xs duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:bg-black/60"
      />
      <PopoverPanel
        focus
        transition
        className="fixed inset-x-4 top-8 z-50 origin-top rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 duration-150 data-closed:scale-95 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:border-[var(--color-border-dark)] dark:bg-[var(--color-surface-elevated-dark)]"
      >
        <div className="flex flex-row-reverse items-center justify-between">
          <PopoverButton aria-label="Close menu" className="-m-1 p-2">
            <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
          </PopoverButton>
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
            Navigation
          </span>
        </div>
        <nav className="mt-6">
          <ul className="space-y-1">
            {sections.map((section) => (
              <MobileNavItem key={section.id} href={`#${section.id}`}>
                {section.label}
              </MobileNavItem>
            ))}
          </ul>
        </nav>
      </PopoverPanel>
    </Popover>
  )
}

function NavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <a
        href={href}
        className={clsx(
          "relative px-4 py-2 font-[family-name:var(--font-display)] text-sm font-medium tracking-tight transition",
          "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
          "after:absolute after:inset-x-4 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--color-accent)] after:transition-transform after:duration-200 hover:after:scale-x-100",
        )}
      >
        {children}
      </a>
    </li>
  )
}

function DesktopNavigation({
  sections,
  ...props
}: { sections: NavSection[] } & React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav {...props}>
      <ul className="flex items-center">
        {sections.map((section) => (
          <NavItem key={section.id} href={`#${section.id}`}>
            {section.label}
          </NavItem>
        ))}
      </ul>
    </nav>
  )
}

function Avatar() {
  return (
    <a href="#" aria-label="Home" className="block">
      <Image
        src="/Dark.svg"
        alt="AJ"
        width={32}
        height={32}
        className="h-8 w-8 dark:hidden"
        priority
      />
      <Image
        src="/Light.svg"
        alt="AJ"
        width={32}
        height={32}
        className="hidden h-8 w-8 dark:block"
        priority
      />
    </a>
  )
}

export function Header() {
  const { t } = useTranslation()

  const sections: NavSection[] = [
    { id: "about", label: t("nav.about") },
    { id: "skills", label: t("nav.skills") },
    { id: "experience", label: t("nav.experience") },
    { id: "testimonials", label: t("nav.testimonials") },
    { id: "certifications", label: t("nav.certifications") },
    { id: "projects", label: t("nav.projects") },
    { id: "contact", label: t("nav.contact") },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-md dark:border-[var(--color-border-dark)] dark:bg-[var(--color-surface-dark)]/80">
      <Container>
        <div className="flex h-14 items-center gap-4">
          {/* Logo */}
          <div className="flex flex-1 items-center">
            <Avatar />
          </div>

          {/* Desktop nav — centered */}
          <DesktopNavigation
            sections={sections}
            className="hidden md:block"
          />

          {/* Right side: toggles + mobile menu */}
          <div className="flex flex-1 items-center justify-end gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <MobileNavigation
              sections={sections}
              className="md:hidden"
            />
          </div>
        </div>
      </Container>
    </header>
  )
}
