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
 * Micro app source files are in src/micro-apps/ — ready for separate deployment.
 * Uncomment each registration block when the corresponding micro app bundle is
 * deployed to CDN (e.g. via Netlify split deploys or separate Vite builds).
 */
export function initOrchestrator(): void {
  // ─── Blog app (/blog, /:postId) ────────────────────────────────────────────
  // orchestrator.register({
  //   name: 'blog-app',
  //   entry: 'https://cdn.yasinates.com/blog-app/main.js',
  //   container: '#micro-app-root',
  //   activeWhen: (path: string) =>
  //     path === '/blog' || path.startsWith('/blog/') || /^\/[^/]+$/.test(path),
  //   fallback: '<div style="padding:5rem 1rem;color:#6b7280">Blog yüklenirken bir hata oluştu.</div>',
  // })

  // ─── Projects app (/projeler) ──────────────────────────────────────────────
  // orchestrator.register({
  //   name: 'projects-app',
  //   entry: 'https://cdn.yasinates.com/projects-app/main.js',
  //   container: '#micro-app-root',
  //   activeWhen: '/projeler',
  //   fallback: '<div style="padding:5rem 1rem;color:#6b7280">Projeler yüklenirken bir hata oluştu.</div>',
  // })

  // ─── About app (/hakkimda) ─────────────────────────────────────────────────
  // orchestrator.register({
  //   name: 'about-app',
  //   entry: 'https://cdn.yasinates.com/about-app/main.js',
  //   container: '#micro-app-root',
  //   activeWhen: '/hakkimda',
  //   fallback: '<div style="padding:5rem 1rem;color:#6b7280">Hakkımda sayfası yüklenirken bir hata oluştu.</div>',
  // })

  // ─── Contact app (/iletisim) ───────────────────────────────────────────────
  // orchestrator.register({
  //   name: 'contact-app',
  //   entry: 'https://cdn.yasinates.com/contact-app/main.js',
  //   container: '#micro-app-root',
  //   activeWhen: '/iletisim',
  //   fallback: '<div style="padding:5rem 1rem;color:#6b7280">İletişim sayfası yüklenirken bir hata oluştu.</div>',
  // })

  // ─── GitHub app (/github) ──────────────────────────────────────────────────
  // orchestrator.register({
  //   name: 'github-app',
  //   entry: 'https://cdn.yasinates.com/github-app/main.js',
  //   container: '#micro-app-root',
  //   activeWhen: '/github',
  //   fallback: '<div style="padding:5rem 1rem;color:#6b7280">GitHub projeleri yüklenirken bir hata oluştu.</div>',
  // })

  // ─── YouTube app (/youtube) ────────────────────────────────────────────────
  // orchestrator.register({
  //   name: 'youtube-app',
  //   entry: 'https://cdn.yasinates.com/youtube-app/main.js',
  //   container: '#micro-app-root',
  //   activeWhen: '/youtube',
  //   fallback: '<div style="padding:5rem 1rem;color:#6b7280">YouTube içerikleri yüklenirken bir hata oluştu.</div>',
  // })

  // Uncomment after registering the first micro app:
  // orchestrator.start()
}
