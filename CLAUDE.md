# yasinates.com — Claude Code Guide

## Project Overview

Personal portfolio and developer blog for Yasin Ateş. TanStack Start (SSR) host shell with
**component-level micro frontend architecture using tuvix.js** — every UI component is its own
independent micro-app, potentially using a different framework (React, Svelte, Vue).

| Area | Value |
|------|-------|
| Primary language | TypeScript (strict mode) |
| Frontend framework | React 19 + TanStack Router + TanStack Query |
| Build tool | Vinxi (Vite-based) |
| SSR | TanStack Start (full SSR — SEO critical) |
| Styling | CSS Modules (`.module.scss`) — Tailwind removal in progress |
| Test framework | Vitest |
| Module system | ESM only |
| Deployment | Netlify |
| Micro frontend | tuvix.js — component-level, multi-framework |
| CI performance | lighthouse-guard GitHub Action |

---

## Micro Frontend Architecture

### Core Principle

Every UI section is its own micro-app. Routes are thin shells. Components live inside
`src/micro-apps/{name}/` with their own hooks, utils, and sub-components.

```
Route (thin shell)
  └─ TuvixApp (SSR bridge)
       └─ micro-apps/{name}/App.tsx   ← main component
            └─ components/           ← sub-components, each with .module.scss
```

### Directory Structure

```
src/
├── routes/                          # TanStack Router — thin shells ONLY
│   ├── __root.tsx                   # Root layout — mounts header + footer micro-apps
│   ├── index.tsx                    # Home — mounts 5 micro-app containers
│   ├── hakkimda.tsx
│   ├── projeler.tsx
│   ├── github.tsx
│   ├── youtube.tsx
│   ├── blog.tsx
│   ├── $postId.tsx
│   └── iletisim.tsx
│
├── micro-apps/
│   ├── _shared/
│   │   ├── queryClient.ts           # Singleton TanStack QueryClient
│   │   └── eventBus.ts             # Typed cross-app event bus (NEW)
│   │
│   ├── header/          [React]     # TanStack Router integration
│   ├── footer/          [Svelte]    # Static — Svelte showcase
│   │
│   ├── hero/            [React]     # Home: animated hero section
│   ├── about-preview/   [React]     # Home: short bio + tech stack preview
│   ├── projects-preview/[React]     # Home: featured GitHub/YouTube/other
│   ├── blogs-preview/   [Svelte]    # Home: recent blog posts — Svelte showcase
│   ├── contact-preview/ [Vue]       # Home: CTA card — Vue showcase
│   │
│   ├── about/           [React]     # /hakkimda full page
│   │   └── components/
│   │       ├── ProfileCard.tsx + ProfileCard.module.scss
│   │       ├── TechGrid.tsx   + TechGrid.module.scss
│   │       └── SocialLinks.tsx+ SocialLinks.module.scss
│   │
│   ├── github/          [React]
│   │   └── components/
│   │       └── GithubCard.tsx + GithubCard.module.scss
│   │
│   ├── youtube/         [React]
│   │   └── components/
│   │       └── YoutubeCard.tsx + YoutubeCard.module.scss
│   │
│   ├── projects/        [React]
│   │   └── components/
│   │       ├── GithubProjectCard.tsx + GithubProjectCard.module.scss
│   │       ├── YoutubeVideoCard.tsx  + YoutubeVideoCard.module.scss
│   │       └── OtherProjectCard.tsx  + OtherProjectCard.module.scss
│   │
│   ├── blog-list/       [React]
│   │   └── components/
│   │       ├── BlogCard.tsx   + BlogCard.module.scss
│   │       └── TabFilter.tsx  + TabFilter.module.scss
│   │
│   ├── post-detail/     [React]
│   │   └── components/
│   │       ├── PostContent.tsx    + PostContent.module.scss
│   │       └── RelatedPosts.tsx   + RelatedPosts.module.scss
│   │
│   └── contact/         [Vue]       # /iletisim full page
│       └── components/
│           ├── ContactInfo.vue  + ContactInfo.module.scss
│           └── SocialLinks.vue  + SocialLinks.module.scss
│
├── hooks/                           # TanStack Query hooks (shared, server-agnostic)
├── utils/                           # Pure utility functions
├── constants/                       # Static data
├── styles/                          # Global CSS (app.css — Tailwind removal WIP)
├── client.tsx                       # Client entry — hydrate + orchestrator init
├── ssr.tsx                          # SSR entry
└── router.tsx                       # Router config
```

### Route Shell Pattern

```tsx
// routes/iletisim.tsx — thin shell (ONLY this, nothing else)
import { createFileRoute } from '@tanstack/react-router'
import { TuvixApp } from '@tuvix.js/react'
import { ContactApp } from '~/micro-apps/contact/App'

export const Route = createFileRoute('/iletisim')({
  head: () => ({ meta: seo({ title: '...', description: '...' }) }),
  component: () => <TuvixApp name="contact-app" App={ContactApp} />,
})
```

### Event Bus Typed Contract

```typescript
// micro-apps/_shared/eventBus.ts
type EventMap = {
  'hero:cta-clicked':    { target: 'projects' | 'contact' }
  'blog:post-selected':  { postId: string; title: string }
  'blog:filter-changed': { tab: 'all' | 'medium' | 'devto' }
  'nav:route-changed':   { pathname: string }
}
```

### Framework Distribution

| Micro-app | Framework | Reason |
|-----------|-----------|--------|
| `header` | React | TanStack Router hooks required |
| `footer` | Svelte | Static — ideal Svelte demo |
| `hero` | React | Complex CSS animations |
| `about-preview` | React | Tech grid with inline SVGs |
| `projects-preview` | React | TanStack Query (GitHub + YouTube) |
| `blogs-preview` | Svelte | Native fetch — Svelte showcase |
| `contact-preview` | Vue | Simple CTA — Vue showcase |
| `about` | React | Full tech stack, social links |
| `github` | React | TanStack Query |
| `youtube` | React | TanStack Query |
| `projects` | React | 3 data sources |
| `blog-list` | React | Tab state + 2 APIs |
| `post-detail` | React | SyntaxHighlighter |
| `contact` | Vue | Form-like — Vue showcase |

### tuvix.js Packages

```
@tuvix.js/react         — React adapter (SSR-ready)
@tuvix.js/svelte        — Svelte adapter (to be verified/built)
@tuvix.js/vue           — Vue adapter (to be verified/built)
@tuvix.js/core          — Orchestrator
@tuvix.js/event-bus     — Cross-app typed events
```

### Known tuvix.js Gaps (to discover during implementation)

| Gap | Status |
|-----|--------|
| `@tuvix.js/svelte` SSR adapter | Unknown — verify |
| `@tuvix.js/vue` SSR adapter | Unknown — verify |
| Built-in event bus API | Exists (`@tuvix.js/event-bus`) — test |
| Non-React SSR hydration | Unknown — test |

---

## Commands

```bash
# Development
npm run dev          # Start dev server (Vinxi)

# Build & Deploy
npm run build        # Production build
npm start            # Start production server

# Type checking
npx tsc --noEmit     # TypeScript type check

# Tests
npm test             # Run all tests (Vitest)
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

---

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

// ❌ Wrong
catch (e: any) { console.error(e.message) }
```

### Styling

- **Do NOT add new Tailwind classes** — removal in progress
- All components use **CSS Modules** (`.module.scss` co-located)
- No inline styles with magic numbers — use CSS custom properties
- SCSS files live inside the micro-app directory, not in `src/routes/`

### React Patterns

- Functional components only — no class components except ErrorBoundary
- Data fetching: TanStack Query hooks in `src/hooks/` only
- No direct API calls in components
- Route files: `createFileRoute()` + `TuvixApp` only — no component logic

### SSR / SEO — NEVER BREAK

- Every route must have `head()` returning meta tags via `seo()` util
- No browser-only APIs at top level (`window`, `document`, `localStorage`)
- Guard: `if (typeof window !== 'undefined') { ... }`
- Canonical URLs must be preserved on all routes

### SSR Pattern for Non-React Micro-apps

Non-React frameworks (Svelte, Vue, Angular) cannot render during SSR unless explicitly pre-rendered.
**The correct pattern:**

```tsx
// Route loader: pre-render on server
loader: async () => ({
  ssrHtml: await renderSvelteToString(FooterSvelte),   // Svelte
  // OR: await renderVueToString(ContactVue),          // Vue
  // OR: await renderAngularToString(Component, {...}) // Angular
})

// Bridge component: static import, accepts ssrHtml prop
import FrameworkComponent from './Component.svelte'    // static import
export default function Bridge({ ssrHtml = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    // mount with hydrate:true so framework reuses SSR HTML
    new FrameworkComponent({ target: ref.current, hydrate: true })
  }, [])
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: ssrHtml }} suppressHydrationWarning />
}
```

Server utilities (import from sub-path, not main):
- Svelte: `renderSvelteToString` from `@tuvix.js/svelte/server`
- Vue: `renderVueToString` from `@tuvix.js/vue/server`
- Angular: `renderAngularToString` from `@tuvix.js/angular/server`

**Build notes:**
- `@tuvix.js/svelte/server` uses `new Function('m','return import(m)')` to load `svelte/server` at runtime — prevents Vite/Rollup CJS static scanner from failing when `svelte/server` (Svelte 5 API) is absent. Svelte 4 falls back to `App.render()`.
- Svelte components must be compiled with `hydratable: true` (set in `app.config.ts` `svelte({ compilerOptions: { hydratable: true } })`) for `hydrate: true` to work at runtime.
- `@angular/animations` must be installed as a peer dep for Angular builds

### Micro-app Rules

- Apps communicate ONLY via `@tuvix.js/event-bus` or `_shared/eventBus.ts` — **no cross-app imports**
- Each micro-app handles its own data fetching via hooks
- Each component in `components/` has its own `.module.scss`
- No `<QueryClientProvider>` inside micro-apps — TanStack Router provides it at root

---

## Critical Rules

1. **SSR must keep working** — SEO-critical; breaking SSR is a critical failure
2. **No `any` types** — TypeScript strict mode is non-negotiable
3. **No new Tailwind** — migrating away from it
4. **Visual parity** — do not change appearance without explicit instruction
5. **No `console.log` in production code** — remove before committing
6. **Lighthouse scores** — must not degrade
7. **No cross-micro-app imports** — only event bus communication
8. **Route files are thin shells** — no component logic in routes
9. **No dynamic `import()` in application code** — use static imports at file top. Dynamic imports inside `useEffect` or component bodies break SSR (render empty HTML server-side). Non-React framework components (Svelte, Vue, Angular) must be SSR-rendered via route loaders + tuvix.js server utilities, not deferred with lazy imports.

---

## Testing Requirements

**Framework:** Vitest
**Test location:** `src/__tests__/`
**Coverage target:** ≥ 70% on `src/hooks/` and `src/utils/`

Priority test targets:
- `src/utils/seo.ts` — pure function
- `src/utils/slugify.ts` — pure function with Turkish characters
- `src/hooks/use*.ts` — query hooks with mocked axios
- `src/micro-apps/_shared/eventBus.ts` — typed bus logic

```bash
npm install --save-dev vitest @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom
```

---

## Development Workflow

### Standard Feature Workflow

1. **Brainstorm** — `/superpowers:brainstorming` before any non-trivial feature
2. **Enhance** — `/prompt-enhancer` → generates BRAID graph for complex tasks
3. **Solve** — `/braid-solver` executes the BRAID graph deterministically
4. **Plan** — `/superpowers:writing-plans` → structured implementation plan
5. **TDD** — `/superpowers:test-driven-development` → write failing test first
6. **Implement** — follow `.claude/references/coding-standards.md`
7. **Review** — `/wtf-code-reviewer` after every implementation (mandatory)
8. **Verify** — `/superpowers:verification-before-completion`
9. **Commit** — descriptive commit message
10. **Delta review** — `/code-review-graph:review-delta` after every commit

### For Micro Frontend Tasks

1. `/microfrontend-migrator` agent for component extraction
2. `/prompt-enhancer` → `/braid-solver` for complex migrations
3. Always verify SSR after migration
4. Test event bus communication between apps

### For Parallel Work

1. `/superpowers:dispatching-parallel-agents` — spawn independent subagents
2. Each agent works on one micro-app in isolation
3. Merge when all pass `/wtf-code-reviewer`

---

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
| After any implementation | `/wtf-code-reviewer` (mandatory) |
| After each commit | `/code-review-graph:review-delta` |
| Before merge | `/code-review-graph:review-pr` |
| Migrating component to micro app | `/microfrontend-migrator` |
| TypeScript review | `/everything-claude-code:python-review` (adapt) |
| Security-sensitive code | `/everything-claude-code:security-review` |
| Looking up library docs | `/everything-claude-code:docs` |
| Frontend patterns | `/everything-claude-code:frontend-patterns` |
| API design | `/everything-claude-code:api-design` |
| E2E testing | `/everything-claude-code:e2e-testing` |

---

## Data Flow

```
User Request (SSR)
  → Vinxi/TanStack Start server
  → TanStack Router (route match)
  → Route shell (createFileRoute)
  → TuvixApp (SSR bridge)
  → micro-apps/{name}/App.tsx
  → components/ (sub-components)
  → src/hooks/ (TanStack Query)
  → External APIs (GitHub / Dev.to / Medium / YouTube)
  → HTML rendered → sent to client → hydrated

Cross-app communication:
  micro-app A → eventBus.emit('event:name', payload)
  micro-app B → eventBus.on('event:name', handler)
```

---

## Known Behaviors

- **`any[]` in useGithubRepos.ts** — `allRepos: any[]` should be typed
- **`console.log` in useGithubRepos.ts** — remove before production
- **Tailwind in app.css** — `@tailwind` directives remain until migration complete
- **tuvix.js local copy** — source at `./tuvix.js/`; use npm package in app
- **Turkish route names** — `projeler`, `hakkimda`, `iletisim` are intentional
- **BlogApp.tsx** — standalone SPA version; listens to `tuvix:pathchange` event
- **src/components/Home/** — legacy, to be deleted after micro-app migration

---

## Micro Frontend Migration Status

| Area | Status |
|------|--------|
| Route thin shells | IN PROGRESS |
| home micro-apps (hero, about-preview, etc.) | TODO |
| about micro-app with sub-components | TODO |
| github / youtube micro-apps | TODO |
| projects micro-app | TODO |
| blog-list / post-detail micro-apps | TODO |
| contact micro-app (Vue) | TODO |
| footer micro-app (Svelte) | TODO |
| blogs-preview (Svelte) | TODO |
| contact-preview (Vue) | TODO |
| Event bus typed contract | TODO |
| @tuvix.js/svelte adapter | VERIFY |
| @tuvix.js/vue adapter | VERIFY |
| Tailwind removal | IN PROGRESS |
| CSS Modules adoption | IN PROGRESS |
| Lighthouse CI guard | TODO |
| Vitest setup | TODO |


DO NOT include git add, commit, or push commands. Only provide the commit message. The commit message must not include any "Co-author" information.
