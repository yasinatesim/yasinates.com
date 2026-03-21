/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start'
import { createRouter } from './router'
import { initOrchestrator, orchestrator } from './orchestrator'

const router = createRouter()

hydrateRoot(document, <StartClient router={router} />)

// Initialize the orchestrator in the next macrotask, after React hydration.
//
// router.subscribe('onLoad') is NOT suitable for initial page load: TanStack
// Router emits onLoad only when isLoading transitions true → false (i.e. route
// transitions). On SSR hydration isLoading starts as false, so the event never
// fires and the orchestrator would never mount the page's micro app.
//
// The route components render empty <div data-tuvix-app="..."> shells, so there
// is no server/client HTML mismatch. It is safe to defer orchestrator init by
// one macrotask: React finishes hydrating, then we mount each micro app.
setTimeout(() => {
  initOrchestrator()

  // Bridge every subsequent client-side navigation to the orchestrator.
  // We register this listener INSIDE the setTimeout so it fires only for
  // navigations that happen AFTER initialization.
  router.subscribe('onLoad', () => {
    orchestrator.reconcile(window.location.pathname)
  })
}, 0)
