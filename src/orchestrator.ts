import { createOrchestrator, getGlobalBus } from '@tuvix.js/core'

// TanStack Router owns navigation — orchestrator.reconcile() is called from client.tsx on each navigation instead.
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
  orchestrator.start()
}
