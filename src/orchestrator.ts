/**
 * tuvix.js Shell Orchestrator
 *
 * This file configures the micro frontend shell for yasinates.com.
 * The shell manages layout (Header, Footer) and registers all micro apps.
 *
 * Migration status: Core integration complete. Individual micro apps will be
 * registered here as they are extracted to independently deployed bundles.
 *
 * Micro app deployment targets (future):
 *   blog-app    → /blog, /$postId
 *   projects-app → /projeler
 *   about-app   → /hakkimda
 *   contact-app → /iletisim
 *   github-app  → /github
 *   youtube-app → /youtube
 */

import { createOrchestrator, getGlobalBus } from '@tuvix.js/core'
import type { OrchestratorConfig } from '@tuvix.js/core'

const orchestratorConfig: OrchestratorConfig = {
  router: {
    mode: 'history',
    routes: [
      // Registered as micro apps become independently deployed bundles.
      // Until then, TanStack Router handles all routing in the monolithic shell.
      //
      // { path: '/blog/*',     app: 'blog-app' },
      // { path: '/:postId',    app: 'blog-app' },
      // { path: '/projeler/*', app: 'projects-app' },
      // { path: '/hakkimda/*', app: 'about-app' },
      // { path: '/iletisim/*', app: 'contact-app' },
      // { path: '/github/*',   app: 'github-app' },
      // { path: '/youtube/*',  app: 'youtube-app' },
    ],
  },
  onError: (error: Error, appName: string) => {
    console.error(`[tuvix] Error in micro app "${appName}":`, error.message)
  },
  onStatusChange: (appName: string, status: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[tuvix] ${appName} → ${status}`)
    }
  },
}

/**
 * Shell orchestrator instance.
 * Call orchestrator.register() and orchestrator.start() as micro apps are deployed.
 */
export const orchestrator = createOrchestrator(orchestratorConfig)

/**
 * Global event bus for cross-app communication.
 * Use this singleton when micro apps need to communicate.
 *
 * @example
 * // Emit from any micro app:
 * import { eventBus } from '~/orchestrator'
 * eventBus.emit('blog:post-viewed', { postId: '123' })
 *
 * // Subscribe in another micro app:
 * const unsub = eventBus.on('blog:post-viewed', ({ postId }) => { ... })
 * // cleanup: unsub()
 */
export const eventBus = getGlobalBus()

/**
 * Initialize the shell orchestrator.
 * Called once from client.tsx after React hydration.
 *
 * Micro app registrations are added here as apps are deployed:
 *
 * orchestrator.register({
 *   name: 'blog-app',
 *   entry: 'https://cdn.yasinates.com/blog-app/main.js',
 *   container: '#micro-app-root',
 *   activeWhen: (path) => path.startsWith('/blog') || /^\/[^/]+$/.test(path),
 *   fallback: '<div>Blog yüklenirken bir hata oluştu.</div>',
 * })
 *
 * orchestrator.register({
 *   name: 'projects-app',
 *   entry: 'https://cdn.yasinates.com/projects-app/main.js',
 *   container: '#micro-app-root',
 *   activeWhen: '/projeler/*',
 *   fallback: '<div>Projeler yüklenirken bir hata oluştu.</div>',
 * })
 */
export function initOrchestrator(): void {
  // Micro app registrations will be added here as they are deployed.
  // orchestrator.register({ ... })
  //
  // Uncomment to start the orchestrator once micro apps are registered:
  // orchestrator.start()
}
