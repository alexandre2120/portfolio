# Alexandre Jaques — Portfolio

## Overview

Personal portfolio for **Alexandre Jaques**, Full-Stack Developer based in Lisbon, PT.
Transitioning from 6+ years in Operations leadership at ChatGuru (SaaS startup).
Specializes in JS/TS, React, Next.js, AI coding, workflow automation, and cloud infrastructure.
Currently studying AI & Machine Learning Engineering.

**Stack**: Next.js 16, React 19, TypeScript 5 (strict), Tailwind CSS v4, App Router
**Theme**: Dark mode via `next-themes` — system preference default + manual toggle
**i18n**: English (default) + Portuguese, switchable via header toggle
**Profile photo**: `public/profile.png`
**Favicons**: `public/Dark.svg` (light theme) / `public/Light.svg` (dark theme) — "AJ" monogram, swap based on `prefers-color-scheme`

## Portfolio Sections (Single-Page Scroll)

| Section | Content |
|---------|---------|
| **Hero** | Name, "Full-Stack Developer", intro, social links (GitHub, email), CTA |
| **About** | Professional summary, ops→dev transition, AI/ML studies |
| **Skills** | AI Coding, JS/TS, React/Next.js, Supabase/MongoDB, APIs, n8n/Make/Python, sysadmin, Docker |
| **Experience** | ChatGuru timeline: CS Analyst (2019) → Manager CS (2020) → Head Ops (2020-2025) → Director (2025) |
| **Projects** | Portfolio of work/side projects (content TBD) |
| **Contact** | Email, location (Lisbon), GitHub |

**Blog** at `/articles` — MDX article system for technical posts.

---

## Architecture

```
src/
  app/
    page.tsx              # Single-page portfolio (all sections)
    layout.tsx            # Root layout (fonts, providers, metadata)
    providers.tsx         # ThemeProvider + LanguageProvider
    articles/             # MDX blog routes
    not-found.tsx
  components/
    ui/                   # Button, Card, Container, Prose
    layout/               # Header, Footer, MobileNav, ThemeToggle, LanguageToggle
    sections/             # Hero, About, Skills, Experience, Projects, Contact
    icons/                # SVG icon components
  lib/
    i18n.ts               # Translation context, hook, types
    articles.ts           # MDX article loading
    formatDate.ts         # Date formatting
    utils.ts              # cn() utility
  content/
    en.json               # English translations
    pt.json               # Portuguese translations
  images/                 # Portfolio images, logos
  styles/
    tailwind.css          # Tailwind v4 + theme tokens
    prism.css             # Code highlighting for blog
```

- **Path alias**: `@/*` → `./src/*`
- **Naming**: PascalCase for components, kebab-case for routes
- **Exports**: Named exports only (never `export default` for components)
- **Imports**: Use `@/` alias. Group: React/Next → third-party → `@/components` → `@/lib` → `@/content`

---

## Design System

<frontend_aesthetics>
### Typography
- BANNED fonts: Arial, Inter, Roboto, Geist, system-ui defaults
- Use distinctive fonts via `next/font/google` — editorial serif for headings, geometric sans for body
- Extreme weight contrast: 200 vs 800, not 400 vs 600
- Size jumps of 3x+ between hierarchy levels

### Colors
- Dark-first palette with CSS variables in tailwind.css
- Teal accent inherited from Spotlight template (teal-500/400)
- Dominant color + sharp accent — never evenly distributed
- Full dark/light mode support via `dark:` variant

### Motion
- CSS-only animations preferred
- Staggered reveals on scroll using `animation-delay`
- Hover transitions: 150-300ms ease
- ALWAYS respect `prefers-reduced-motion: reduce`

### Backgrounds
- Layer CSS gradients on key sections
- Geometric patterns or contextual effects
- Never plain solid white/black on hero or feature sections

### Avoid
- Generic AI-generated aesthetics
- Purple gradients on white
- Cookie-cutter card layouts
- Overused fonts and predictable patterns
</frontend_aesthetics>

### Typography Hierarchy

| Level | Size (mobile → desktop) | Weight | Usage |
|-------|------------------------|--------|-------|
| H1 | 3rem → 4rem+ | 700-900 | Hero heading |
| H2 | 2rem → 2.5rem | 600-700 | Section headings |
| H3 | 1.25rem → 1.5rem | 600 | Subsection headings |
| Body | 1rem | 400 | Paragraphs, line-height 1.75 |
| Small | 0.875rem | 400 | Captions, metadata |

---

## i18n Strategy

Client-side React Context — no URL-based routing (`/en/`, `/pt/`).

- **LanguageProvider** wraps the app in `providers.tsx` (client component)
- **`useTranslation()`** hook returns `{ t, locale, setLocale }`
- **Files**: `content/en.json` and `content/pt.json` — nested keys by section
- **Storage**: `localStorage` for persistence across visits
- **HTML**: `<html lang>` attribute updates dynamically
- **Toggle**: "EN | PT" button in Header, minimum 44px touch target

```json
{
  "nav": { "about": "About", "projects": "Projects", ... },
  "hero": { "greeting": "...", "title": "...", "subtitle": "..." },
  "about": { "title": "...", "paragraphs": ["...", "..."] },
  ...
}
```

---

## Mobile-First (CRITICAL)

Every component MUST follow these rules:

1. **Base styles = mobile**. Use `sm:`, `md:`, `lg:` only for desktop enhancements
2. **Touch targets**: Minimum 44x44px for all interactive elements
3. **Font sizes**: Minimum 16px body text on mobile (prevents iOS zoom)
4. **Images**: Always `next/image` with responsive `sizes` prop
5. **Layout**: Single-column on mobile → multi-column on desktop (`grid-cols-1 lg:grid-cols-2`)
6. **No horizontal overflow**: Use `overflow-x-hidden` on body, test carefully
7. **Header offset**: Smooth scroll must account for fixed header height
8. **Container padding**: Minimum 16px (1rem) horizontal padding on mobile

**Test at**: 375px (iPhone SE), 390px (iPhone 14), 768px (iPad), 1280px (desktop)

---

## Component Patterns

Follow Spotlight template conventions:

```typescript
// Variant pattern (from Spotlight's Button.tsx)
const variantStyles = {
  primary: "bg-zinc-800 font-semibold text-zinc-100 ...",
  secondary: "bg-zinc-50 font-medium text-zinc-900 ...",
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
} & ComponentPropsWithoutRef<"button">

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return <button className={clsx(baseStyles, variantStyles[variant], className)} {...props} />
}
```

```typescript
// Container pattern (from Spotlight's Container.tsx)
export function ContainerOuter({ className, children, ...props }) {
  return (
    <div className={clsx("sm:px-8", className)} {...props}>
      <div className="mx-auto w-full max-w-7xl lg:px-8">{children}</div>
    </div>
  )
}
```

- **Server Components by default** — only add `"use client"` for: event handlers, hooks, browser APIs, context consumers
- **`clsx`** for conditional class merging
- **Section components** accept translated content as props (keep them server-renderable when possible)
- **TypeScript**: Explicit types for all props. Prefer `type` over `interface` for component props

---

## Code Style

- Double quotes, 2-space indent, semicolons
- Strict TypeScript — no `any`, use `unknown` for truly unknown types
- Explicit return types on exported functions
- `const` over `let`

### Git Commits

```
feat(scope): add new feature
fix(scope): fix bug
docs(scope): update documentation
style(scope): formatting only
refactor(scope): restructuring, no behavior change
```

Scopes: `hero`, `about`, `skills`, `experience`, `projects`, `contact`, `nav`, `i18n`, `design`, `layout`, `blog`, `config`

---

## Workflow

- `npm run dev` — dev server
- `npm run build` — production build (ALWAYS run before committing)
- `npm run lint` — ESLint
- Profile photo: `public/profile.png`
- Images: `src/images/` for imported images, `public/images/` for static assets

## Plugins & References

- **`/frontend-design`**: Invoke when creating any visual component. Adapt output to match this design system.
- **Spotlight template**: `initial template/spotlight-ts/` — component patterns, Header, Footer, Container, Card, Button
- **Claude cookbooks**: `/Users/alexandrejaques/Desktop/claude-cookbooks-main/` — aesthetics prompts, brand guidelines
