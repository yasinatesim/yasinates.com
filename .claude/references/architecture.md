# Architecture — yasinates.com Micro Frontend Migration

## Current Architecture
Single TanStack Start (SSR) application with:
- **Routing:** TanStack Router (file-based, `src/routes/`)
- **Data fetching:** TanStack Query + custom hooks in `src/hooks/`
- **Styling:** Tailwind CSS (being removed)
- **Build:** Vinxi (Vite-based)
- **SSR:** Full SSR via TanStack Start for SEO

## Target Architecture — Micro Frontend with tuvix.js

```
yasinates.com (Shell/Host)
├── @tuvix.js/core — orchestrator
├── @tuvix.js/router — cross-app routing
├── @tuvix.js/event-bus — inter-app communication
└── Micro Apps (independently deployable):
    ├── blog-app (routes: /blog, /$postId)
    ├── projects-app (routes: /projeler)
    ├── about-app (routes: /hakkimda)
    ├── contact-app (routes: /iletisim)
    ├── github-app (routes: /github)
    └── youtube-app (routes: /youtube)
```

## tuvix.js Key Concepts
- `createOrchestrator()` — shell app entry point, registers micro apps
- `register({ name, entry, container, activeWhen })` — register a micro app
- `@tuvix.js/loader` — dynamic script loading
- `@tuvix.js/event-bus` — cross-app events
- `@tuvix.js/react` — React bindings for micro apps

## Data Flow
```
User Request
  → TanStack Router (SSR, SEO-critical)
  → Route Component
  → TanStack Query Hook (src/hooks/)
  → API call (src/api.ts)
  → External services (GitHub API, DEV.to, Medium RSS, YouTube RSS)
  → Component renders with data
```

## SSR Requirements
- All routes MUST remain SSR-compatible (SEO critical)
- `createServerFn()` from TanStack Start for server-side data
- `head()` meta tags on every route for SEO

## lighthouse-guard Integration
The project uses `lighthouse-guard` GitHub Action for CI performance monitoring:
- Runs after every deployment
- Reports Performance, Accessibility, SEO, Best Practices scores
- Thresholds: Performance ≥ 80, Accessibility ≥ 90, SEO ≥ 90
- Dashboard artifact uploaded on every run
- See `.github/workflows/` for configuration

## Layer Rules
1. Routes (`src/routes/`) — page-level components, use hooks only
2. Hooks (`src/hooks/`) — data fetching, state management
3. Components (`src/components/`) — presentational, no direct API calls
4. API (`src/api.ts`) — all external API configuration
5. Utils (`src/utils/`) — pure functions, no side effects
6. Constants (`src/constants/`) — static data
