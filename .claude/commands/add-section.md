---
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(npm run build), Bash(npm run lint), Skill(frontend-design)
description: Add a new section to the single-page portfolio
---

# Add Section: $ARGUMENTS

## Steps

1. **Read CLAUDE.md** for design system, section patterns, and i18n strategy
2. **Invoke `/frontend-design`** for visual direction specific to this section type
3. **Create section component** at `src/components/sections/{SectionName}.tsx`:
   - Named export
   - Accept translated content as props where possible
   - Mobile-first layout (single column → multi-column)
   - Smooth scroll anchor via `id` attribute (kebab-case, e.g., `id="about"`)
   - Follow the typography hierarchy from CLAUDE.md
4. **Add translation keys** to both `src/content/en.json` and `src/content/pt.json`:
   - Nest under the section name: `"about": { "title": "...", ... }`
   - Include all user-facing text strings
5. **Integrate into `src/app/page.tsx`**:
   - Import the section component
   - Add it in the correct visual order (Hero → About → Skills → Experience → Projects → Contact)
   - Wrap in Container if needed for consistent width
6. **Update navigation** in Header component:
   - Add smooth-scroll link: `<a href="#section-id">`
   - Add corresponding i18n key for the nav label
7. **Verify mobile responsiveness**:
   - Base styles work at 375px width
   - Layout adapts correctly at 768px and 1280px
   - No horizontal overflow
8. **Run `npm run build`** to confirm no errors
