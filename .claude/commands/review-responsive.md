---
allowed-tools: Read, Glob, Grep
description: Audit all components for mobile-first responsiveness
---

# Review Responsive Design

Scan all components for mobile-first compliance per CLAUDE.md guidelines.

## Checklist for Each Component

1. **Mobile-first classes**: Base styles must target mobile. Desktop uses `sm:`/`md:`/`lg:` prefixes.
   - FLAG: Any `w-`, `h-`, `grid-cols-`, `flex-row`, `gap-`, `p-`, `m-`, `text-` classes that only make sense at desktop widths without a breakpoint prefix
2. **Touch targets**: All interactive elements (buttons, links, toggles) must be minimum 44x44px
   - FLAG: `py-1`, `py-0.5`, `h-6`, `h-8` on clickable elements without sufficient padding
3. **Font sizes**: Body text must be minimum 16px (1rem) on mobile
   - FLAG: `text-xs` or `text-sm` used for primary body content (OK for captions/metadata)
4. **Images**: Must use `next/image` with `sizes` prop
   - FLAG: `<img>` tags or `Image` without `sizes`
5. **Overflow**: No component should cause horizontal scroll
   - FLAG: Fixed pixel widths (`w-[500px]`), `whitespace-nowrap` on text without overflow control
6. **Container padding**: Minimum 16px horizontal padding on mobile
   - FLAG: Sections without `px-4` or Container wrapper
7. **Stacking**: Content should stack vertically on mobile
   - FLAG: `flex-row` or `grid-cols-2+` without a mobile-first `flex-col` or `grid-cols-1`

## Output Format

For each issue found, report:
```
[SEVERITY] file_path:line_number
  Issue: description
  Fix: suggested change
```

Severities: `[CRITICAL]` = broken on mobile, `[WARNING]` = suboptimal, `[INFO]` = suggestion
