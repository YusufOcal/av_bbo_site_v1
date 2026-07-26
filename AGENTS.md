# MASTER AI CONTEXT & ARCHITECTURE DIRECTIVE FOR BBO LEGAL

> **CRITICAL FOR ALL AI AGENTS**: When working on this workspace, you MUST follow every rule and pattern in this document without exception. The user should NEVER have to re-explain the project architecture, design language, or tech stack.

---

## 1. PROJECT OVERVIEW & TECH STACK CONSTRAINTS
- **Application**: Award-quality, handcrafted, luxury law firm web application for BBO Legal.
- **Tech Stack**: React 19, TypeScript (Strict Mode), Vite 7, CSS Modules, Vanilla CSS Design Tokens.
- **ABSOLUTE PROHIBITIONS**:
  - NEVER install or use TailwindCSS, Bootstrap, Material UI, Chakra, or heavy UI frameworks.
  - NEVER use generic cards, box shadows, glassmorphism (`backdrop-filter` cards), neumorphism, or heavy glowing gradients.
  - NEVER use template filler text, fake company names, or generic AI UI patterns.

---

## 2. DESIGN SYSTEM & VISUAL HARMONY
- **Color Tokens** (`src/styles/tokens.css`):
  - `--color-ink`: `#151412` (Primary dark text/accents)
  - `--color-paper`: `#f6f2ea` (Primary light background)
  - `--color-porcelain`: `#fcfaf6` (Clean paper surface)
  - `--color-night`: `#111312` (Luxury dark background)
  - `--color-brass`: `#b38850` & `--color-brass-soft`: `#d8bd88` (Warm brass architectural accents)
  - `--color-cedar`: `#714a32` (Subtle hover highlights)
- **Typography Tokens**:
  - Heading font: `--font-serif` -> `"Cormorant Garamond", Georgia, serif`
  - Body font: `--font-sans` -> `Inter, sans-serif`
  - Text scales: `--text-12` up to `--text-72`
- **Architectural Rules**:
  - All dikey (vertical) section headers feature a warm brass accent line: `border-left: 2px solid rgba(216, 189, 136, 0.35); padding-left: var(--space-24);`.
  - All section vertical padding uses fluid clamps: `padding-block: clamp(var(--space-80), 12vh, var(--space-160));`.
  - All mobile/tablet collapse rules are strictly harmonized at `@media (max-width: 860px)`.

---

## 3. MOTION & ACCESSIBILITY SYSTEM
- **Scroll Reveal Engine**: Zero-dependency `useScrollReveal` hook (`src/hooks/useScrollReveal.ts`).
  - Attach `data-reveal` attribute to all `<section>` elements.
  - CSS rule in `global.css`: `[data-reveal]` with `cubic-bezier(0.16, 1, 0.3, 1)` emphasis curve.
- **Button Micro-interactions**: Arrow slide `transform: translateX(4px)` on `.button:hover .arrow`.
- **Accessibility & Reduced Motion**:
  - Every CSS module MUST contain a `@media (prefers-reduced-motion: reduce)` block resetting opacity to 1, transform to none, and transition to none.
  - Keyboard skip-link `#main-content` at the root of `App.tsx`.
  - Mobile drawer in `SiteHeader.tsx` locks body scroll and listens to `Escape` key.

---

## 4. ROUTING & PAGES MAP
- Client-side routing is handled in `src/app/App.tsx` listening to `pathname` and `hashchange`.
- **Completed Routes**:
  - `/` or `#home` -> `HomePage` (`src/features/home/HomePage.tsx`)
    - Sections: `Hero`, `PracticeFocus`, `CounselModel`, `SelectedMatters`, `Principles`, `Articles`, `ContactBand`.
  - `/about` or `#about` -> `AboutPage` (`src/features/about/AboutPage.tsx`)
    - Sections: `AboutHero`, `FirmStory`, `FirmStats`, `Leadership`, `ContactBand`.

---

## 5. COMPONENT REUSE REGISTRY
When implementing new pages or sections, ALWAYS reuse existing core components:
- `<Container width="wide" | "default" | "narrow">` (`src/components/Container/Container.tsx`)
- `<Eyebrow tone="dark" | "light">` (`src/components/Eyebrow/Eyebrow.tsx`)
- `<SectionHeader eyebrow="..." title="..." copy="..." />` (`src/components/SectionHeader/SectionHeader.tsx`)
- `<Button href="..." variant="primary" | "secondary" | "ghost">` (`src/components/Button/Button.tsx`)
- `<Stat label="..." value="..." />` (`src/components/Stat/Stat.tsx`)
- `<BrandMark tone="dark" | "light" />` (`src/components/BrandMark/BrandMark.tsx`)
- `<ContactBand />` (`src/features/home/sections/ContactBand.tsx`)
- `<SiteHeader />` (`src/components/SiteHeader/SiteHeader.tsx`)
- `<SiteFooter />` (`src/components/SiteFooter/SiteFooter.tsx`)

---

## 6. INSTRUCTIONS FOR NEXT PAGE IMPLEMENTATION
When the user asks to implement the next page (e.g. Expertise `/expertise`, Selected Matters `/matters`, Insights `/insights`, or Contact `/contact`):
1. Create authentic data in `src/content/<page_name>.ts`.
2. Create section components under `src/features/<page_name>/sections/`.
3. Assemble `<PageName>Page.tsx` under `src/features/<page_name>/<PageName>Page.tsx` and call `useScrollReveal()`.
4. Register the route in `src/app/App.tsx` and `src/content/firm.ts`.
5. Maintain 100% visual, layout, and motion consistency.
