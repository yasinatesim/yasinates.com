# Micro Frontend Standards — tuvix.js Component-Level Architecture

## Architecture Pattern

**Component-level isolation:** every UI section is its own micro-app.
Routes are thin shells. Logic, hooks, styles all live inside the micro-app boundary.

```
routes/{page}.tsx           → createFileRoute + TuvixApp only
micro-apps/{name}/App.tsx   → main component
micro-apps/{name}/components/{Component}.tsx + {Component}.module.scss
micro-apps/_shared/queryClient.ts
micro-apps/_shared/eventBus.ts
```

## tuvix.js Package References

```
@tuvix.js/react         — React SSR adapter (verified working)
@tuvix.js/svelte        — Svelte adapter (verify/build)
@tuvix.js/vue           — Vue adapter (verify/build)
@tuvix.js/core          — createOrchestrator, reconcile
@tuvix.js/event-bus     — typed cross-app events
@tuvix.js/loader        — dynamic micro-app loading
```

## Micro-App Rules

- Each micro-app is independently deployable and framework-agnostic
- Apps communicate ONLY via `@tuvix.js/event-bus` — **no direct cross-app imports ever**
- Apps must NOT import from other micro-apps directly
- Each app handles its own data fetching (hooks co-located or in `src/hooks/`)
- No `<QueryClientProvider>` inside micro-apps — root provides it
- SCSS modules co-located: each component has its own `.module.scss`

## Event Bus — Typed Contract

```typescript
// micro-apps/_shared/eventBus.ts
import { createEventBus } from '@tuvix.js/event-bus'

type EventMap = {
  'hero:cta-clicked':    { target: 'projects' | 'contact' }
  'blog:post-selected':  { postId: string; title: string }
  'blog:filter-changed': { tab: 'all' | 'medium' | 'devto' }
  'nav:route-changed':   { pathname: string }
}

export const eventBus = createEventBus<EventMap>()
```

```typescript
// Publish (React)
import { eventBus } from '~/micro-apps/_shared/eventBus'
eventBus.emit('hero:cta-clicked', { target: 'projects' })

// Subscribe + cleanup (React)
useEffect(() => {
  const unsub = eventBus.on('blog:filter-changed', ({ tab }) => setTab(tab))
  return unsub
}, [])

// Subscribe + cleanup (Svelte)
onMount(() => {
  const unsub = eventBus.on('nav:route-changed', ({ pathname }) => { ... })
  return unsub
})

// Subscribe + cleanup (Vue)
onMounted(() => {
  const unsub = eventBus.on('nav:route-changed', ({ pathname }) => { ... })
  onUnmounted(unsub)
})
```

## Shell App Rules

- Shell (TanStack Start) manages SSR, routing, Header/Footer containers
- Shell does NOT contain business logic for micro-apps
- `client.tsx` dispatches `nav:route-changed` on every `router.subscribe('onLoad')`
- Root layout (`__root.tsx`) renders `<TuvixApp>` containers for header and footer

## Styling Rules

- Remove all Tailwind from migrated components
- CSS Modules (`.module.scss`) co-located with each component
- No inline styles with magic numbers — use CSS custom properties
- Maintain pixel-perfect visual parity during migration

## SSR Preservation Rules

- Every route MUST retain its `head()` + `seo()` meta tags
- SSR must remain functional after migration — no hydration errors
- Guard browser APIs: `if (typeof window !== 'undefined') { ... }`
- Lighthouse scores must NOT degrade

## Migration Checklist (per micro-app)

- [ ] Create `micro-apps/{name}/App.tsx` with full component logic
- [ ] Create `micro-apps/{name}/components/` with sub-components
- [ ] Each sub-component has its own `.module.scss`
- [ ] Move hooks to `src/hooks/` (or inline in micro-app if truly isolated)
- [ ] Update route to thin shell only
- [ ] Remove old SCSS from `src/routes/`
- [ ] Verify SSR (no hydration errors)
- [ ] Run `npx tsc --noEmit`
- [ ] Run `/wtf-code-reviewer`
- [ ] Run `/code-review-graph:review-delta`

## Route Thin Shell Template

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { TuvixApp } from '@tuvix.js/react'
import { seo } from '~/utils/seo'
import { MyApp } from '~/micro-apps/my-app/App'

export const Route = createFileRoute('/my-route')({
  head: () => ({
    meta: seo({ title: 'Page Title', description: 'Description' }),
  }),
  component: () => <TuvixApp name="my-app" App={MyApp} />,
})
```

## Multi-Framework Notes

### Svelte micro-apps
- Use `@tuvix.js/svelte` adapter (verify package exists first)
- SSR: verify server-side rendering works before committing
- Styling: `.svelte` files use scoped `<style>` OR `.module.scss` imports

### Vue micro-apps
- Use `@tuvix.js/vue` adapter (verify package exists first)
- Composition API only — no Options API
- SSR: verify with `@tuvix.js/vue` SSR adapter

### React micro-apps
- `@tuvix.js/react` adapter — verified working with SSR
- Suspense boundary at `App.tsx` level
- Error boundaries where needed
