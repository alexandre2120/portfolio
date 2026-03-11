---
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(npm run build), Bash(npm run lint), Skill(frontend-design)
description: Create a new portfolio component with proper patterns
---

# Build Component: $ARGUMENTS

## Steps

1. **Read CLAUDE.md** for design system, component patterns, i18n, and mobile-first rules
2. **Invoke `/frontend-design`** for visual direction on this specific component
3. **Determine component type and location**:
   - `src/components/ui/` — Reusable primitives (Button, Card, Container)
   - `src/components/layout/` — Structural components (Header, Footer, Nav)
   - `src/components/sections/` — Portfolio page sections (Hero, About, etc.)
   - `src/components/icons/` — SVG icon components
4. **Determine if client or server component** — default to server, only add `"use client"` if it uses hooks, event handlers, or browser APIs
5. **Create the component file** following Spotlight patterns:
   - Named export (not default)
   - Explicit TypeScript props type
   - `clsx` for conditional classes
   - Variant pattern if multiple visual states
6. **Add i18n keys** to both `src/content/en.json` and `src/content/pt.json` if the component displays user-facing text
7. **Ensure mobile-first**:
   - Base styles target mobile widths
   - Desktop enhancements via `sm:`/`md:`/`lg:` prefixes
   - Touch targets minimum 44x44px
   - Body text minimum 16px
8. **Verify** — run `npm run build` to confirm no TypeScript or build errors
