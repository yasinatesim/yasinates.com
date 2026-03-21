# yasinates.com — Claude Code Guide

## Project Overview

Personal portfolio and developer blog for Yasin Ateş. Currently a monolithic TanStack Start (SSR) application. **Active migration to micro frontend architecture using tuvix.js.**

| Area | Value |
|------|-------|
| Primary language | TypeScript (strict mode) |
| Frontend framework | React 19 + TanStack Router + TanStack Query |
| Build tool | Vinxi (Vite-based) |
| SSR | TanStack Start (full SSR — SEO critical) |
| Styling | Tailwind CSS → **MIGRATING to CSS Modules** |
| Test framework | Vitest (to be set up) |
| Module system | ESM only |
| Deployment | Netlify |
| Micro frontend | tuvix.js (user's own framework, located at `./tuvix.js/`) |
| CI performance | lighthouse-guard GitHub Action (located at `./lighthouse-guard/`) |

## Project Structure

```
yasinates.com-new/
├── src/
│   ├── routes/          # TanStack Router pages (file-based routing)
│   │   ├── __root.tsx   # Root layout (Header, Footer, meta tags)
│   │   ├── index.tsx    # Home page
│   │   ├── blog.tsx     # Blog list
│   │   ├── $postId.tsx  # Blog post (dynamic)
│   │   ├── projeler.tsx # Projects
│   │   ├── hakkimda.tsx # About
│   │   ├── iletisim.tsx # Contact
│   │   ├── github.tsx   # GitHub repos
│   │   └── youtube.tsx  # YouTube feed
│   ├── components/      # Presentational React components
│   │   ├── Home/        # Home page sections (Hero, Projects, Blogs, About, Contact)
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── hooks/           # TanStack Query data fetching hooks
│   ├── utils/           # Pure utility functions (seo.ts)
│   ├── constants/       # Static data (projects.ts)
│   ├── styles/          # Global CSS (app.css — Tailwind directives)
│   ├── api.ts           # TanStack Start API handler
│   ├── router.tsx       # Router configuration
│   ├── client.tsx       # Client entry point
│   └── ssr.tsx          # SSR entry point
├── tuvix.js/            # tuvix.js micro frontend framework (local)
├── lighthouse-guard/    # lighthouse-guard GitHub Action (local)
├── public/              # Static assets
└── .claude/
    ├── agents/          # wtf-code-reviewer, braid-solver, microfrontend-migrator
    ├── skills/          # wtf-code-reviewer, prompt-enhancer
    └── references/      # coding-standards, architecture, microfrontend-standards
```

## Commands

```bash
# Development
npm run dev          # Start dev server (Vinxi)

# Build & Deploy
npm run build        # Production build
npm start            # Start production server

# Type checking
npx tsc --noEmit     # TypeScript type check

# Tests (once Vitest configured)
npm test             # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

## Coding Standards

### Type Safety — STRICT
- `strict: true` in tsconfig — no exceptions
- **`any` type is FORBIDDEN** — use `unknown` with `instanceof` guards
- Catch clauses: always `catch (e: unknown)`, never `catch (e: any)`

```typescript
// ✅ Correct
try {
  const data = await fetchData()
} catch (e: unknown) {
  if (e instanceof Error) console.error(e.message)
}

// ❌ Wrong — will be rejected
try {
  const data = await fetchData()
} catch (e: any) {
  console.error(e.message)
}
```

### Styling — MIGRATION IN PROGRESS
- **Do NOT add new Tailwind classes** — migration away from Tailwind is in progress
- New components must use **CSS Modules** (`.module.css` co-located)
- Existing Tailwind code may be left as-is until its component is explicitly migrated
- Visual appearance must be preserved exactly during migration

### React Patterns
- Functional components only
- Data fetching: TanStack Query hooks in `src/hooks/` only
- No direct API calls in components or route files
- Route files use `createFileRoute()` from TanStack Router

### SSR / SEO — NEVER BREAK
- Every route must have `head()` returning meta tags
- No browser-only APIs at top level (`window`, `document`, `localStorage`)
- Guard browser APIs: `if (typeof window !== 'undefined') { ... }`
- Canonical URLs must be preserved on all routes

## Critical Rules

1. **SSR must keep working** — this site is SEO-dependent; breaking SSR is a critical failure
2. **No `any` types** — TypeScript strict mode is non-negotiable
3. **No new Tailwind** — we are migrating away from it
4. **Visual parity** — do not change the appearance without explicit instruction
5. **`console.log` in hooks** — REMOVE before committing (e.g., `useGithubRepos.ts` has one to fix)
6. **Lighthouse scores** — must not degrade; lighthouse-guard monitors this in CI
7. **tuvix.js patterns** — when adding micro frontend code, follow `.claude/references/microfrontend-standards.md`

## Testing Requirements

**Framework:** Vitest (matches tuvix.js packages which already use it)
**Test location:** `src/__tests__/` for unit tests
**Coverage target:** ≥ 70% on `src/hooks/` and `src/utils/`

Priority test targets:
- `src/utils/seo.ts` — pure function, easy to test
- `src/hooks/use*.ts` — query hooks with mocked axios
- Any new tuvix.js integration code

```bash
# Install (once):
npm install --save-dev vitest @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom
```

## Development Workflow

1. **Brainstorm** — `/superpowers:brainstorming` before any non-trivial feature
2. **Plan** — `/superpowers:writing-plans` or `/prompt-enhancer` for complex tasks
3. **TDD** — `/superpowers:test-driven-development` — write failing test first
4. **Implement** — follow `.claude/references/coding-standards.md`
5. **Review** — `/wtf-code-reviewer` after every implementation
6. **Verify** — `/superpowers:verification-before-completion`
7. **Commit** — descriptive commit message
8. **Delta review** — `/code-review-graph:review-delta` after every commit

### For Micro Frontend Migration Tasks:
1. Use `/microfrontend-migrator` agent
2. Use `/prompt-enhancer` → `/braid-solver` for complex migrations
3. Always verify SSR after migration

## Skill Integration Map

| Situation | Invoke |
|-----------|--------|
| Before any non-trivial feature | `/superpowers:brainstorming` |
| Complex multi-step tasks | `/prompt-enhancer` → `/braid-solver` |
| Planning implementation | `/superpowers:writing-plans` |
| Starting implementation | `/superpowers:test-driven-development` |
| Debugging a failure | `/superpowers:systematic-debugging` |
| Parallel independent tasks | `/superpowers:dispatching-parallel-agents` |
| Before claiming done | `/superpowers:verification-before-completion` |
| After any implementation | `/wtf-code-reviewer` |
| After each commit | `/code-review-graph:review-delta` |
| Before merge | `/code-review-graph:review-pr` |
| Migrating component to micro frontend | `/microfrontend-migrator` |
| TypeScript review | `/everything-claude-code:python-review` (adapt for TS) |
| Security-sensitive code | `/everything-claude-code:security-review` |
| Looking up library docs | `/everything-claude-code:docs` |

## Data Flow

```
User Request (SSR)
  → Vinxi/TanStack Start server
  → TanStack Router (route match)
  → Route component (createFileRoute)
  → TanStack Query (useSuspenseQuery)
  → Custom hook in src/hooks/
  → axios call to external API
  → GitHub API / DEV.to / Medium RSS / YouTube RSS
  → Data flows back → component renders → HTML sent to client
```

## Known Behaviors

- **`any[]` in useGithubRepos.ts** — known tech debt, `allRepos: any[]` should be typed properly
- **`console.log` in useGithubRepos.ts** — leftover debug code, remove before production
- **Tailwind in app.css** — `@tailwind base/components/utilities` directives, remove when migration is complete
- **tuvix.js local copy** — the tuvix.js framework is at `./tuvix.js/` — this is the source, not an npm package. For usage in the main app, install from npm (`tuvix.js` or `@tuvix.js/*`)
- **lighthouse-guard local copy** — at `./lighthouse-guard/` — used as example; for CI use `yasinatesim/lighthouse-guard@v1` in GitHub Actions
- **Turkish route names** — routes use Turkish words (`projeler`, `hakkimda`, `iletisim`) — this is intentional for the Turkish-language URL structure

## Micro Frontend Migration Status

| Area | Status |
|------|--------|
| Shell (host) app setup | TODO |
| Tailwind removal | IN PROGRESS |
| CSS Modules adoption | TODO |
| tuvix.js core integration | TODO |
| Blog micro app | TODO |
| Projects micro app | TODO |
| About/Contact micro app | TODO |
| lighthouse-guard CI setup | TODO |
