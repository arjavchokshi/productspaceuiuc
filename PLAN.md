# Website build plan — modern stack & compatibility

## Goal
A website with **cool animations** that runs on **all major browsers and mobile devices**, using a **modern, maintainable stack**.

---

## Chosen stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | **Next.js 15** (App Router) | React-based, SSR/SSG, file-based routing, great DX, Vercel ecosystem, broad deployment options. |
| **Language** | **TypeScript** | Type safety, better editor support, fewer runtime bugs. |
| **Styling** | **Tailwind CSS v4** | Utility-first, small CSS output, built-in responsive utilities, easy dark mode. |
| **Animations** | **Framer Motion** + **CSS** | Framer Motion: declarative, GPU-friendly, works in all modern browsers and on mobile. CSS for simple/fallback animations and reduced JS. |
| **Fonts** | **next/font** (Google Fonts) | No layout shift, optimized loading, no external font CSS. |
| **Icons** | **Lucide React** (or similar) | Tree-shakeable, consistent, lightweight. |

---

## Why this stack is “modern” and compatible

1. **Next.js 15** — Latest stable, supports React 19, Turbopack in dev, and strong defaults for performance and SEO.
2. **Tailwind v4** — Latest major release; we’ll pair it with **PostCSS + Autoprefixer** (and a **Browserslist** config) so CSS works across older browsers and mobile.
3. **Framer Motion** — Uses CSS transforms and opacity where possible (GPU-accelerated), with fallbacks so animations work even when JS is slow or restricted.
4. **No exotic runtimes** — Pure React + Node; runs anywhere Node or static export runs (Vercel, Netlify, static hosting, etc.).

---

## Compatibility strategy

- **Browsers**: Target “last 2 versions” of major browsers + not dead; include iOS Safari and Chrome Android so **mobile is covered**.
- **Responsive**: Mobile-first layout with Tailwind breakpoints (`sm`, `md`, `lg`, `xl`), touch-friendly hit areas, and a proper viewport meta tag.
- **Animations**: Prefer `transform` and `opacity` (Framer Motion’s defaults) for smooth 60fps on low-end devices; avoid animating `width`/`height` where possible.
- **Progressive enhancement**: Core content and layout work without JS; animations enhance the experience.

---

## Plan of attack

### Phase 1 — Project setup
- Initialize a **Next.js 15** app with **TypeScript**, **Tailwind**, **ESLint**, App Router.
- Configure **Browserslist** and **PostCSS** (Autoprefixer) for broad browser support.
- Add **Framer Motion** and **Lucide React**; set up a minimal layout and global styles.

### Phase 2 — Core layout & design system
- Define a simple **design system**: palette, typography (via `next/font`), spacing scale (Tailwind).
- Build a **responsive layout**: header, main content area, footer that works on mobile and desktop.
- Ensure **semantic HTML** and **viewport**/accessibility basics (e.g. focus states, reduced-motion respect later).

### Phase 3 — Animations
- **Page-level**: Subtle entrance animations (e.g. fade/slide) for sections.
- **Micro-interactions**: Hover/focus states, button and link feedback.
- **Scroll / presence**: Optional scroll-triggered or “in view” animations using Framer Motion (e.g. `whileInView`).
- Keep animations **optional** where possible (e.g. respect `prefers-reduced-motion` in CSS or via Framer Motion).

### Phase 4 — Content and polish
- Add placeholder content (hero, features, CTA, footer).
- Optimize images (Next.js `<Image>`) and ensure **performance** (LCP, CLS).
- Test on **Chrome, Firefox, Safari, Edge** and on **iOS Safari / Android Chrome** (or use BrowserStack/similar).
- Final pass: **lighthouse**, **axe**-style checks, and any small UX tweaks.

---

## Folder structure (high level)

```
ps+folder/
├── app/
│   ├── layout.tsx          # Root layout, fonts, global styles
│   ├── page.tsx             # Home page
│   ├── globals.css          # Tailwind + custom CSS
│   └── ...
├── components/
│   ├── layout/              # Header, Footer, Section
│   ├── ui/                  # Buttons, cards, animated wrappers
│   └── ...
├── lib/                     # Optional: utils, constants
├── public/
├── package.json
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── next.config.ts
```

---

## Delivered result

- A **single-site** (multi-page can be added later) with a modern, responsive UI.
- **Smooth, performant animations** that work across browsers and devices.
- **Clean, typed code** and a structure that’s easy to extend.
- **Compatibility** via Browserslist + Autoprefixer and mobile-first responsive design.

If you’re good with this stack and plan, say **“go”** or **“build it”** and I’ll start with Phase 1 (scaffolding the Next.js app, Tailwind, Framer Motion, and Browserslist) in this repo.
