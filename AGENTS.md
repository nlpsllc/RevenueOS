# RevenueOS — Project Conventions

## Tech Stack
- **Framework**: TanStack Start (React 19 + Vite + Tailwind CSS 4)
- **Language**: TypeScript
- **Package Manager**: Bun
- **Styling**: Tailwind CSS 4 with revenue-* custom color palette

## Route Structure
- `/` — Marketing site pages (index, features, pricing, contact, how-it-works, audit, blog)
- `/app/` — AI CRO Dashboard (authenticated routes)
- All routes use `createFileRoute` from `@tanstack/react-router`

## Key Conventions
- Use `revenue-` color palette (e.g., `revenue-600`, `revenue-500`) for primary branding
- Dark mode supported via `dark:` Tailwind variants
- All routes in `src/routes/` with `export const Route = createFileRoute("...")({ component: ... })`
- Dashboard `app` routes nested under `src/routes/app/`
- Blog content uses `src/routes/blog/$slug.tsx` for dynamic posts
- After adding new route files, delete `.tanstack/` cache and `src/routeTree.gen.ts` before rebuild

## Build & Deploy
- `bun run publish` — builds and serves on port 3000 (the live public surface)
- `bun run dev` — local development
- Site is published at https://a879b9fc34c06261658e4cf48055ddb0.ctonew.app

## AI CRO Dashboard Modules
All live at /app/*:
- `/app/` — Main dashboard with metrics + Top 5 Actions
- `/app/login` — Login page
- `/app/signup` — Signup page
- `/app/onboarding` — Onboarding wizard
- `/app/integrations` — 22 tool integrations
- `/app/reviews` — Review Management
- `/app/lead-recovery` — Lead Recovery Engine
- `/app/follow-ups` — Follow-up Automation
- `/app/ad-spend` — Ad Spend Optimizer
- `/app/churn` — Churn Risk & Upsell Detection
- `/app/competitors` — Competitor Intelligence

## Marketing Pages
- `/` — Homepage with hero, features, stats
- `/features` — All 7 AI CRO modules
- `/pricing` — $5k/$8k/$12k tiered pricing
- `/how-it-works` — 3-step setup
- `/contact` — Contact/signup form
- `/audit` — Free Revenue Recovery Audit lead gen page
- `/blog` — Blog listing
- `/blog/:slug` — Individual blog posts
