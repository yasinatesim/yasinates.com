# yasinates.com Micro Frontend Migration — Design Spec

**Date:** 2026-03-21
**Status:** Approved
**Author:** yasinatesim + Claude Code

---

## Overview

Migrate yasinates.com from a monolithic TanStack Start (SSR) + Tailwind CSS application to a tuvix.js micro frontend architecture with CSS Modules styling.

## Goals

1. Remove Tailwind CSS, replace with CSS Modules (co-located, component-level)
2. Integrate tuvix.js micro frontend framework as the shell orchestrator
3. Preserve full SSR functionality (SEO-critical)
4. Maintain visual appearance pixel-for-pixel
5. Add lighthouse-guard CI for continuous Lighthouse score monitoring
6. Establish Vitest render test coverage for visual regression prevention

## Non-Goals

- Changing the visual design or layout
- Changing route structure or Turkish URL names
- Switching from TanStack Router or TanStack Query
- Rewriting business logic

---

## Migration Strategy: Tailwind-First

Chosen approach: **Tailwind-First** — remove Tailwind and establish CSS Modules before integrating tuvix.js. This ensures a clean, SSR-safe styling foundation before the architectural change.

Alternative considered: Strangler Fig (route-by-route) — rejected because CSS and architecture concerns would be mixed.

---

## Phase 1 — Infrastructure

### 1a. Test Framework
Install Vitest + @testing-library/react for render-based visual regression tests.

```bash
npm install --save-dev vitest @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom jsdom
```

Add to `package.json`:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

Add `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/components/**', 'src/utils/**'],
      thresholds: { lines: 70, functions: 70 }
    }
  }
})
```

### 1b. app.css Transformation
Remove Tailwind directives (`@tailwind base/components/utilities`). Convert to:
- CSS reset (box-sizing, margin: 0, etc.)
- Font imports (already in `__root.tsx` links, no duplication)
- Global utilities: `.hero-gradient`, `.text-gradient`, `.card-hover`, `.nav-link` animations
- Import `variables.css`

### 1c. CSS Variables File
Create `src/styles/variables.css` with design tokens extracted from current Tailwind usage:

```css
:root {
  /* Colors */
  --color-primary: #3b82f6;       /* blue-500 */
  --color-primary-end: #6366f1;   /* indigo-500 */
  --color-gray-50: #f9fafb;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  /* Typography */
  --font-family: 'Inter', sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
```

---

## Phase 2 — Component Migration (Bottom-Up)

### Migration Loop (per component)
For each component:
1. **Write render test** — assert key elements render, key styles/classes exist
2. **Create `ComponentName.module.css`** — CSS Module co-located with component
3. **Remove Tailwind** — replace className strings with `styles.xxx`
4. **Update test** — assert CSS Module classes applied
5. **Visual check** — `npm run dev`, compare with original
6. **Run wtf-code-reviewer**

### Migration Order (smallest → largest)
1. `src/utils/seo.ts` — pure function, no styles (test only)
2. `src/components/Footer.tsx`
3. `src/components/Header.tsx`
4. `src/components/NotFound.tsx`
5. `src/components/DefaultCatchBoundary.tsx`
6. `src/components/Home/About.tsx`
7. `src/components/Home/Contact.tsx`
8. `src/components/Home/Blogs.tsx`
9. `src/components/Home/Projects.tsx`
10. `src/components/Home/Hero.tsx`
11. `src/routes/__root.tsx` (body className)
12. All remaining routes

### CSS Module Pattern
```tsx
// Before (Tailwind)
<div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">

// After (CSS Module)
import styles from './Header.module.css'
<div className={styles.container}>
```

### Tailwind → CSS Conversion Reference
| Tailwind | CSS |
|----------|-----|
| `flex` | `display: flex` |
| `items-center` | `align-items: center` |
| `justify-between` | `justify-content: space-between` |
| `bg-gray-50` | `background-color: var(--color-gray-50)` |
| `text-blue-500` | `color: var(--color-primary)` |
| `p-4` / `px-6 py-3` | `padding: var(--space-4)` / `padding: var(--space-3) var(--space-6)` |
| `rounded-lg` | `border-radius: var(--radius-lg)` |
| `shadow-md` | `box-shadow: var(--shadow-md)` |
| `hover:*` | `&:hover { ... }` |
| `transition-*` | `transition: [property] 0.3s ease` |

---

## Phase 3 — tuvix.js Integration

### 3a. Install tuvix.js
```bash
# All-in-one (simpler)
npm install tuvix.js

# Or granular packages
npm install @tuvix.js/core @tuvix.js/react @tuvix.js/event-bus @tuvix.js/router
```

Verified API (from source at `./tuvix.js/packages/`):
- `createOrchestrator` — exported from `tuvix.js` and `@tuvix.js/core`
- `createReactMicroApp` — exported from `@tuvix.js/react`
- `defineMicroApp` — exported from `tuvix.js` / `@tuvix.js/core`
- `createEventBus`, `getGlobalBus` — exported from `tuvix.js` / `@tuvix.js/event-bus`

### 3b. Shell App Setup
Transform `src/client.tsx` to initialize tuvix.js orchestrator alongside TanStack Router.

```ts
import { createOrchestrator } from 'tuvix.js'

const orchestrator = createOrchestrator({
  router: { mode: 'history' }
})
```

**Shared layout ownership:** `Header`, `Footer`, and global providers (QueryClientProvider) live in the **shell app** (`src/routes/__root.tsx`). Micro apps receive the container element and are rendered inside the shell's `<Outlet />`. Micro apps do NOT duplicate layout components.

### 3c. Micro App Extraction — Pilot First
Phase 3 is scoped as a **pilot** — extract 2 micro apps to validate the pattern, then repeat for the rest.

**Pilot micro apps (Phase 3):**
- `blog-app` — `/blog`, `/$postId` (most complex, good stress test)
- `projects-app` — `/projeler` (simpler, validates pattern)

**Remaining micro apps (future phases):**
- `about-app` — `/hakkimda`
- `contact-app` — `/iletisim`
- `github-app` — `/github`
- `youtube-app` — `/youtube`

Each app uses `createReactMicroApp` from `@tuvix.js/react`:
```tsx
import { createReactMicroApp } from '@tuvix.js/react'
import App from './App'

export default createReactMicroApp({ name: 'blog-app', App })
```

SSR requirement: Each micro app must support server-side rendering via TanStack Start.

### 3d. lighthouse-guard CI
Add `.github/workflows/lighthouse.yml`:
```yaml
- name: Run Lighthouse Guard
  uses: yasinatesim/lighthouse-guard@v1
  with:
    urls: '[{"url": "https://yasinates.com", "name": "Home"}]'
    performance-threshold: 80
    accessibility-threshold: 90
    seo-threshold: 90
    fail-on-threshold: true
```

---

## Testing Requirements

- **Framework:** Vitest + @testing-library/react
- **Test location:** `src/__tests__/`
- **Coverage target:** ≥ 70% on `src/components/` and `src/utils/`
- **Per component:** render test asserting key DOM structure and CSS Module class application
- **SSR smoke test:** Verify each route renders without `window`/`document` errors in Node env

---

## Critical Constraints

| Constraint | How Enforced |
|-----------|-------------|
| SSR must work after every step | `npm run build` + manual SSR test |
| No new Tailwind classes | wtf-code-reviewer checklist |
| Visual parity | Render tests + dev server visual check |
| Lighthouse scores stable | lighthouse-guard CI |
| TypeScript strict | `npx tsc --noEmit` in CI |

---

## Success Criteria

- [ ] Zero Tailwind classes remain in `src/` after Phase 2
- [ ] Every component has a co-located `.module.css` file
- [ ] `app.css` contains no `@tailwind` directives
- [ ] All render tests pass with ≥ 70% coverage
- [ ] SSR works (`npm run build && npm start`)
- [ ] tuvix.js orchestrator initialized in shell app (`src/client.tsx`)
- [ ] `blog-app` and `projects-app` extracted as pilot micro apps
- [ ] Header/Footer confirmed in shell app only (not duplicated in micro apps)
- [ ] lighthouse-guard CI reporting scores on every push
