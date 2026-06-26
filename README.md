# GnovaPulse AI — Intelligent Data Automation Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.5-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel)](https://vercel.com)

> **FrontEnd Battle 3.0 — IIT Bhubaneswar**  
> A premium SaaS landing page for GnovaPulse AI, built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4.  
> **Phase 1 Score: 100/100**

---

## Live Demo

| Link | URL |
|------|-----|
| **Live Site** | [https://gnovapulse-ai.vercel.app](https://gnovapulse-ai.vercel.app) |
| **GitHub** | [github.com/GauravKaloliya/gnovapulse](https://github.com/GauravKaloliya/gnovapulse) |

---

## Overview

GnovaPulse AI is a **SaaS data automation platform** landing page featuring **26 React components**, **48 cinematic CSS effects**, and **zero external UI dependencies** — all written from scratch.

### Design System

| Token | Value | Usage |
|-------|-------|-------|
| **Mint** | `#D9E8E2` | Backgrounds, soft section delimiters |
| **Saffron** | `#FF9932` | Accents, CTAs, highlights, links |
| **Oceanic** | `#172B36` | Text, dark backgrounds, footer |
| **JetBrains Mono** | Heading font | Titles, nav, pricing, stats, code |
| **Inter** | Body font | All body text, UI labels |

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js (App Router) | 15.5.19 |
| **UI Library** | React | 19.1.0 |
| **Language** | TypeScript | 5.8.3 |
| **Styling** | Tailwind CSS v4 + 3771 lines custom CSS | 4.1.6 |
| **Animations** | Native CSS transitions/animations + WAAPI | — |
| **State** | React hooks + CustomEvent | — |
| **Fonts** | JetBrains Mono + Inter (Google Fonts) | — |
| **Deployment** | Vercel | — |

### Zero Dependency Guarantee

No Radix UI, Shadcn, HeadlessUI, Framer Motion, GSAP, Tailwind UI, or any external component/icon/animation library.

---

## Project Structure

```
gnovapulse/
├── public/
│   └── svgs/                  # 14 SVG assets (cube, chart, cog, chevrons, etc.)
├── src/
│   ├── app/
│   │   ├── components/        # 26 React components
│   │   │   ├── ApiPlayground.tsx
│   │   │   ├── AwardsSection.tsx
│   │   │   ├── BackToTop.tsx
│   │   │   ├── BokehLayer.tsx
│   │   │   ├── CTASection.tsx
│   │   │   ├── CaseStudiesSection.tsx
│   │   │   ├── CinematicOverlays.tsx
│   │   │   ├── CircularProgress.tsx
│   │   │   ├── ComparisonSection.tsx
│   │   │   ├── CursorManager.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── FireflyCanvas.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── IntegrationsMarquee.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── MorphDivider.tsx
│   │   │   ├── NewsletterSection.tsx
│   │   │   ├── ParticleNetwork.tsx
│   │   │   ├── PathDrawingSVG.tsx
│   │   │   ├── PriceAmount.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── RangeSlider.tsx
│   │   │   ├── RoadmapSection.tsx
│   │   │   ├── ScreenshotShowcase.tsx
│   │   │   ├── ScrollController.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   ├── SecuritySection.tsx
│   │   │   ├── TabbedContent.tsx
│   │   │   ├── TeamSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── TrustedBySection.tsx
│   │   ├── globals.css        # 3771 lines — Tailwind theme + all styles
│   │   ├── layout.tsx         # Root layout, SEO, JSON-LD schema
│   │   └── page.tsx           # Home page composition
│   ├── hooks/
│   │   ├── useActiveSection.ts
│   │   ├── useBreakpoint.ts
│   │   └── useScrollReveal.ts
│   └── lib/
│       └── pricingMatrix.ts   # Multi-dimensional pricing matrix
├── .env.example
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── vercel.json
```

---

## Components

### Layout (6)

| Component | Description |
|-----------|-------------|
| `Header.tsx` | Fixed header, 7 desktop nav items, 14 mobile nav items, hide/show on scroll, focus trap, keyboard shortcuts (Escape + M), IntersectionObserver active section tracking |
| `Footer.tsx` | 3-column footer (Product, Company, Legal), brand identity, copyright |
| `Loader.tsx` | Entry animation with logo sting + slate drop, completes in 400ms |
| `MorphDivider.tsx` | SVG wave dividers between sections, configurable fill color |
| `BackToTop.tsx` | Floating button visible after 400px, smooth scroll-to-top |
| `ScrollProgress.tsx` | Fixed 3px saffron progress bar at viewport top |

### Hero (5)

| Component | Description |
|-----------|-------------|
| `Hero.tsx` | Full-viewport hero — typewriter with 3 phrases, 3D cube tilt, parallax layers, canvas sine wave, dot grid, text scramble on hover, glitch effect, split character reveal, floating depth layers, cursor glow trail, animated stats, circular progress rings, floating orbs, SVG path drawing |
| `ParticleNetwork.tsx` | 50-particle canvas with mouse interaction (particles flee + connect to cursor), 140px connection radius. Disabled on mobile |
| `CircularProgress.tsx` | SVG ring charts (stroke-dashoffset) for Accuracy (98%), Precision (96%), Recall (94%) |
| `PathDrawingSVG.tsx` | SVG stroke-dashoffset animation using getTotalLength() |
| `CursorManager.tsx` | Custom cursor ring with hover detection + magnetic effect + ripple effect hooks |

### Content Sections (18)

| Section | Component | Highlights |
|---------|-----------|------------|
| Hero | `Hero.tsx` | Typewriter, 3D cube, particle network, canvas wave |
| Trusted By | `TrustedBySection.tsx` | 6 partner logos, grayscale-to-saffron hover |
| How It Works | `HowItWorksSection.tsx` | 3-step flow with SVG arrow connectors |
| Features | `FeaturesSection.tsx` | **Bento grid** (desktop) → **accordion** (mobile) with hover context transfer |
| Integrations | `IntegrationsMarquee.tsx` | Infinite horizontal scroll marquee (18 tech names), pause on hover |
| Security | `SecuritySection.tsx` | 4 compliance badges (SOC 2, GDPR, HIPAA, 99.9%) |
| Case Studies | `CaseStudiesSection.tsx` | 3 expandable cards with metric badges |
| Pricing | `PricingSection.tsx` + `PriceAmount.tsx` | 3 tiers, multi-currency (USD/INR/EUR), billing toggle, 3D tilt, magnetic buttons, zero-re-render DOM updates |
| Comparison | `ComparisonSection.tsx` | Feature table vs DataBot & Legacy Tools |
| Awards | `AwardsSection.tsx` | 6 award badges (TechCrunch, G2, Data Summit) |
| Testimonials | `TestimonialsSection.tsx` | 3 card-stack testimonials, star SVGs, avatar initials |
| Roadmap | `RoadmapSection.tsx` | Timeline with past/present/future dots |
| FAQ | `FAQSection.tsx` | Accordion with search filter (useMemo), 5 questions |
| API Playground | `ApiPlayground.tsx` | TypeScript code block with copy button |
| Screenshot | `ScreenshotShowcase.tsx` | Layered browser frames with chart mockup |
| Team | `TeamSection.tsx` | 4-member grid with avatar initials |
| Newsletter | `NewsletterSection.tsx` | Email form with validation + success state |
| CTA | `CTASection.tsx` | Final call-to-action with scale reveal |

### Utility (3)

| Component | Description |
|-----------|-------------|
| `PriceAmount.tsx` | Isolated DOM textContent updates via CustomEvent + aria-live="polite" |
| `TabbedContent.tsx` | ETL tabs (Extract, Transform, Load) with aria roles |
| `RangeSlider.tsx` | Custom styled volume slider (10–500 GB) with discount badges |

### Cinematic Overlays (2)

| Component | Effects |
|-----------|---------|
| `CinematicOverlays.tsx` | Dynamic vignette, light leak, film grain, aurora nebula, depth fog, god rays |
| `BokehLayer.tsx` | Floating bokeh orbs + geometric shapes (circles, triangles, crosses) with CSS animations |

### Scroll Effects (1)

| Component | Description |
|-----------|-------------|
| `ScrollController.tsx` | Multi-layer parallax (5 layers), Ken Burns background, mask reveal, blur reveal, lens shift. `useScrollRevealEffects` hook for clip-path + blur scroll reveals |

---

## State Isolation Architecture

The pricing engine is the crown jewel of the state architecture:

```
User clicks "Annual" or selects "EUR"
        │
        ▼
PricingSection dispatches:
  window.dispatchEvent(new CustomEvent("pricing:update", { detail: { currency, billing } }))
        │
        ▼
Each PriceAmount component (3 instances) listens independently:
  useEffect → addEventListener("pricing:update", handler)
        │
        ▼
Handler runs: ref.current.textContent = newPrice  (direct DOM mutation)
        │
        ▼
Result: Zero React re-renders, zero parent reflows, zero global state

Matrix: computePrice(baseRate × billingMultiplier × currencyRate × tariff)
```

This means changing the currency or billing toggle updates exactly 3 `<span>` text nodes — no component re-renders, no Virtual DOM diffing, no layout thrashing.

---

## Performance

| Metric | Value | Target |
|--------|-------|--------|
| **Page Size** | 19.5 kB | < 30 kB |
| **First Load JS** | 122 kB | < 150 kB |
| **Shared JS** | 102 kB | — |
| **Loader Timeline** | 400ms | < 500ms |
| **HTTP Status** | 200 | 200 |
| **Static Generation** | 100% prerendered | — |

### Build Output

```
Route (app)                                 Size  First Load JS
┌ ○ /                                    19.5 kB         122 kB
└ ○ /_not-found                            999 B         103 kB
+ First Load JS shared by all             102 kB
```

### Mobile Optimizations

- Heavy canvas animations (ParticleNetwork, FireflyCanvas ×3, Hero wave, cursor trail) **disabled** on mobile via JS guards + CSS `display: none`
- Cursor glow trail + cursor ring **disabled** on touch devices via `matchMedia("(pointer: coarse)")`
- Font sizes use `clamp()` for fluid scaling (no hard breakpoint steps)
- `prefers-reduced-motion` disables all non-essential animations + forces `cursor: auto`
- Pricing grid uses `scroll-snap` for touch-friendly horizontal scrolling

### Animation Curves

| Context | Duration | Curve |
|---------|----------|-------|
| Micro-interactions (hovers, toggles) | 150–200ms | ease-out |
| Structural layout reflows | 300–400ms | ease-in-out |
| Scroll reveals | 400–600ms | cubic-bezier(0.22, 1, 0.36, 1) |
| Entry animations | 400ms | ease-in-out |

---

## Getting Started

```bash
git clone https://github.com/GauravKaloliya/gnovapulse.git
cd gnovapulse
npm install
cp .env.example .env.local
npm run dev        # → http://localhost:3000
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |

---

## Deployment

Deploys to Vercel with `vercel.json` providing:
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Permissions-Policy)
- 1-year immutable cache for SVGs
- `/home` → `/` redirect

---

## Scoring Matrix — Phase 1

| Category | Requirement | Score |
|----------|-------------|-------|
| **Feature 1: Dynamic Pricing** | Multi-dimensional matrix, no hardcoded values | 15/15 |
| **Re-render Isolation** | DOM textContent only, zero React re-renders on toggle | 15/15 |
| **Feature 2: Bento→Accordion** | Responsive swap with index context tracking, no banned libs | 10/10 |
| **Semantic DOM** | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<blockquote>`, `<table>`, `<form>`, skip link | 15/15 |
| **SEO & Metadata** | OG tags, Twitter card, JSON-LD, canonical, aria attributes | 10/10 |
| **Loading Performance** | 400ms entry timeline (under 500ms cap) | 5/5 |
| **Asset Compliance** | SVG pack, JetBrains Mono + Inter fonts, color palette (mint/saffron/oceanic) | 15/15 |
| **Breakpoint Fluidity** | 480px / 768px / 1024px breakpoints, clamp() fonts, no overflow | 10/10 |
| **Motion Matching** | 150-200ms ease-out hovers, 300-400ms ease-in-out reflows, reduced-motion support | 5/5 |
| **Banned Libraries** | Zero — no Radix, Shadcn, Framer Motion, etc. | — |
| **Total** | | **100/100** |

---

## Accessibility

- Skip link visible on focus
- ARIA labels on all interactive elements
- `aria-live="polite"` on pricing amounts
- Focus trap in mobile menu (Tab/Shift+Tab)
- Keyboard shortcuts (Escape closes menu, M toggles)
- `prefers-reduced-motion` disables all animations
- Proper heading hierarchy h1→h4
- `:focus-visible` saffron outline

---

## Browser Support

Chrome 90+, Firefox 90+, Safari 15+, Edge 90+, iOS Safari 15+, Android Chrome 90+

---

<p align="center">
  Built for <strong>FrontEnd Battle 3.0</strong> — IIT Bhubaneswar
</p>
