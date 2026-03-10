# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Milkysil is a reworked website for **CV. Milky Makmur Sejahtera** (milkysil.com), a chemical trading and manufacturing company based in Bandung, Indonesia. The site is Indonesian-language (Bahasa Indonesia) and showcases their products, services, and company information.

Reference site: https://milkysil.com/

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **UI**: React 19, Tailwind CSS v4, shadcn/ui
- **Font**: Poppins (loaded via `next/font/google`)
- **Package manager**: npm

## Commands

- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint (flat config, Next.js core-web-vitals + TypeScript rules)

## Architecture

- **App Router**: All routes live in `app/` using Next.js App Router conventions
- **Path alias**: `@/*` maps to project root (e.g., `@/components/...`)
- **Layouts**: Shared layout components in `components/layouts/`
- **Tailwind v4**: Uses `@import "tailwindcss"` and `@theme` directives in `globals.css` — no `tailwind.config` file

### Custom Theme Tokens (globals.css)

- `--color-primary: #113163` (dark navy blue)
- `--color-blue: #1674D3`

### Site Pages (planned routes)

- `/` — Beranda (Home)
- `/about` — Tentang Kami (About Us)
- `/portfolio` — Portfolio
- `/package` — Paket (Packages/Services)
- `/contact` — Hubungi Kami (Contact Us)

## Conventions

- Client components use `'use client'` directive at the top
- Images served from `/public/images/` using `next/image` with `priority` for above-fold content
- Navigation uses `next/link` for internal routing
- Header has scroll-aware styling (transparent → solid background on scroll)
- Brand color for header background: `#4A7D6D` (muted green)
