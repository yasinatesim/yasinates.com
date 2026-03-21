# Micro Frontend Standards — tuvix.js Migration

## tuvix.js Package References
- `tuvix.js` — all-in-one package
- `@tuvix.js/core` — orchestrator (v0.1.3)
- `@tuvix.js/react` — React bindings
- `@tuvix.js/router` — routing
- `@tuvix.js/event-bus` — cross-app events
- `@tuvix.js/loader` — dynamic loading
- `@tuvix.js/module-federation` — webpack module federation bridge

## Shell App Rules
- The shell (host) app must use `createOrchestrator()` from `@tuvix.js/core`
- Shell manages the layout: Header, Footer, global styles
- Shell does NOT contain business logic for micro apps
- Shell is responsible for SSR and initial HTML

## Micro App Rules
- Each micro app is independently deployable
- Each app must export lifecycle hooks: `mount`, `unmount`
- Apps communicate ONLY via `@tuvix.js/event-bus` — no direct imports
- Apps must NOT import from other micro apps directly
- Each app handles its own data fetching

## Styling Migration Rules
- Remove all Tailwind CSS from migrated components
- Use CSS Modules (`.module.css`) co-located with components
- Follow tuvix.js design token conventions if available
- No inline styles with magic numbers — use CSS variables
- Maintain existing visual appearance (pixel-perfect migration)

## SEO Preservation During Migration
- Every route MUST retain its `head()` meta tags
- SSR must remain functional after migration
- Lighthouse scores must NOT degrade during migration (use lighthouse-guard)
- Canonical URLs must be preserved

## Migration Checklist (per component)
- [ ] Remove Tailwind classes
- [ ] Add CSS Module equivalent styles
- [ ] Test visual appearance matches original
- [ ] Run lighthouse-guard to verify scores unchanged
- [ ] Verify SSR still works (no hydration errors)
- [ ] Update any direct API calls to use hooks

## Event Bus Patterns
```typescript
// Publish
eventBus.emit('user:logged-in', { userId: '123' })

// Subscribe
eventBus.on('user:logged-in', (payload) => {
  // handle event
})

// Unsubscribe on unmount
const unsubscribe = eventBus.on('user:logged-in', handler)
// in cleanup: unsubscribe()
```
