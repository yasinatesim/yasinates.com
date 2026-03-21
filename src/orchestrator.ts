/**
 * tuvix.js Shell Orchestrator
 *
 * Route components use <TuvixApp name="..." App={Component} /> from @tuvix.js/react,
 * which renders SSR content directly in the TanStack Start tree and marks containers
 * with data-tuvix-app. No IIFE bundles needed for same-repo pages.
 * Add external micro app entries here for truly cross-repo apps.
 */

import { createOrchestrator, getGlobalBus } from '@tuvix.js/core'

// TanStack Router owns navigation — we don't configure tuvix.js's built-in
// router. Instead, client.tsx bridges TanStack Router's onLoad event to
// orchestrator.reconcile() so apps are mounted/unmounted on every navigation.
const orchestratorConfig = {
  onError: (error: Error, appName: string) => {
    console.error(`[tuvix] Error in micro app "${appName}":`, error.message)
  },
  onStatusChange: (appName: string, status: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[tuvix] ${appName} → ${status}`)
    }
  },
}

export const orchestrator = createOrchestrator(orchestratorConfig)

export const eventBus = getGlobalBus()

export function initOrchestrator(): void {
  // No IIFE apps registered — all pages render SSR via <TuvixApp> in route components.
  // TanStack Start handles SSR; @tuvix.js/react TuvixApp wraps the container.
  // Add external micro app registrations here when truly cross-repo apps are needed.
  orchestrator.start()
}
