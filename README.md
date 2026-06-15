# Lumina Dental — Cinematic Demo

A luxury cinematic dental clinic landing page built with Next.js 14, Tailwind CSS, and Framer Motion.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** — custom design tokens, animations
- **Framer Motion** — scroll reveals, staggered entrances, word-by-word hero reveal
- **Lenis** — buttery smooth scroll with spring inertia
- Custom cursor with magnetic pull effect

## Features

- 🎬 Cinematic loader with progress counter
- ✦ Word-by-word hero headline reveal
- 🌊 Lenis smooth scroll (1.35s easing)
- 🧲 Magnetic button physics on CTA elements
- 🎴 Floating glass cards with independent sine animations
- 🖱️ Custom cursor dot + ring with lag
- 📽️ Animated film grain overlay
- 🌅 Hero parallax (background, text, cards at different speeds)
- 🔢 Animated counters triggered on scroll
- 💬 Auto-scrolling testimonial marquee (pauses on hover)
- 🏥 Doctor section with CSS parallax frame
- 🖼️ Before/After split panels with real photos
- 📱 Mobile-first responsive with touch-optimised animations
- ♿ `prefers-reduced-motion` respected

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push this folder to a **new** GitHub repo (e.g. `lumina-cinematic-demo`)
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import the repo → Framework: **Next.js** (auto-detected)
4. Click **Deploy** — done in ~90 seconds

No environment variables required.

## Photos

All photos load from Unsplash. In preview/local environments without internet, 
CSS gradient fallbacks render automatically — no broken images.

## Project structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with fonts + metadata
│   └── page.tsx         # Page composition
├── components/
│   ├── sections/        # Hero, Treatments, BeforeAfter, Testimonials, Doctor, Gallery, CTA, Footer
│   └── ui/              # GrainOverlay, CustomCursor, SmoothScroll, Loader, Nav, MagneticButton, AnimatedCounter
├── lib/
│   ├── constants.ts     # All content data (images, treatments, testimonials)
│   └── motionVariants.ts# Framer Motion variant library
└── styles/
    └── globals.css      # Tailwind + custom CSS system
```
