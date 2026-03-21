/**
 * tuvix.js Shell Orchestrator
 *
 * This file configures the micro frontend shell for yasinates.com.
 * The shell manages layout (Header, Footer) and registers all micro apps.
 *
 * Architecture:
 *  - TanStack Router handles SSR and initial hydration for all routes.
 *  - Each route component wraps its page with <TuvixApp name="..." App={Page} />,
 *    which renders a <div data-tuvix-app="{name}"> container server-side.
 *  - On the client, the orchestrator manages these containers for SPA navigation.
 *  - Micro app IIFE bundles (built via `npm run build:micro-apps`) are loaded
 *    into the containers via hydrateRoot (createSsrReactMicroApp) so the
 *    server-rendered HTML is preserved — no flash of unstyled content.
 *
 * Activating a micro app (independent deploy mode):
 *  1. Uncomment the registration block below.
 *  2. Deploy the IIFE bundle to CDN or serve from /micro-apps/{name}/main.js.
 *  3. Convert the TanStack Router route to a thin shell:
 *       component: () => <div data-tuvix-app="{name}" />
 *     The orchestrator will handle mounting from that point on.
 */

import { createOrchestrator, getGlobalBus } from '@tuvix.js/core'
import type { OrchestratorConfig } from '@tuvix.js/core'

const orchestratorConfig: OrchestratorConfig = {
  router: {
    mode: 'history',
    routes: [
      // Uncomment when the corresponding micro app takes over routing from TanStack Router:
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
 */
export const orchestrator = createOrchestrator(orchestratorConfig)

/**
 * Global event bus for cross-app communication.
 *
 * @example
 * import { eventBus } from '~/orchestrator'
 * eventBus.emit('blog:post-viewed', { postId: '123' })
 *
 * const unsub = eventBus.on('blog:post-viewed', ({ postId }) => { ... })
 * // cleanup: unsub()
 */
export const eventBus = getGlobalBus()

/**
 * Initialize the shell orchestrator.
 * Called once from client.tsx after React hydration.
 *
 * Micro app containers are rendered server-side by TuvixApp in each route file.
 * The orchestrator takes over client-side. Each app uses createSsrReactMicroApp
 * so it hydrates existing SSR content instead of replacing it.
 *
 * IIFE bundles live in public/micro-apps/{name}/main.js.
 * Uncomment each block below when the corresponding micro app is ready to
 * operate independently (i.e., its TanStack Router route has been converted
 * to a thin container shell).
 */
export function initOrchestrator(): void {
  // ─── Blog app (/blog, /:postId) ────────────────────────────────────────────
  // orchestrator.register({
  //   name: 'blog-app',
  //   entry: '/micro-apps/blog-app/main.js',
  //   container: '[data-tuvix-app="blog-app"]',
  //   activeWhen: (path: string) =>
  //     path === '/blog' || path.startsWith('/blog/') || /^\/[^/]+$/.test(path),
  //   fallback: '<div style="padding:5rem 1rem;color:#6b7280">Blog yüklenirken bir hata oluştu.</div>',
  // })

  // ─── Projects app (/projeler) ──────────────────────────────────────────────
  // orchestrator.register({
  //   name: 'projects-app',
  //   entry: '/micro-apps/projects-app/main.js',
  //   container: '[data-tuvix-app="projects-app"]',
  //   activeWhen: '/projeler',
  //   fallback: '<div style="padding:5rem 1rem;color:#6b7280">Projeler yüklenirken bir hata oluştu.</div>',
  // })

  // ─── About app (/hakkimda) ─────────────────────────────────────────────────
  // orchestrator.register({
  //   name: 'about-app',
  //   entry: '/micro-apps/about-app/main.js',
  //   container: '[data-tuvix-app="about-app"]',
  //   activeWhen: '/hakkimda',
  //   fallback: '<div style="padding:5rem 1rem;color:#6b7280">Hakkımda sayfası yüklenirken bir hata oluştu.</div>',
  // })

  // ─── Contact app (/iletisim) ───────────────────────────────────────────────
  // orchestrator.register({
  //   name: 'contact-app',
  //   entry: '/micro-apps/contact-app/main.js',
  //   container: '[data-tuvix-app="contact-app"]',
  //   activeWhen: '/iletisim',
  //   fallback: '<div style="padding:5rem 1rem;color:#6b7280">İletişim sayfası yüklenirken bir hata oluştu.</div>',
  // })

  // ─── GitHub app (/github) ──────────────────────────────────────────────────
  // orchestrator.register({
  //   name: 'github-app',
  //   entry: '/micro-apps/github-app/main.js',
  //   container: '[data-tuvix-app="github-app"]',
  //   activeWhen: '/github',
  //   fallback: '<div style="padding:5rem 1rem;color:#6b7280">GitHub projeleri yüklenirken bir hata oluştu.</div>',
  // })

  // ─── YouTube app (/youtube) ────────────────────────────────────────────────
  // orchestrator.register({
  //   name: 'youtube-app',
  //   entry: '/micro-apps/youtube-app/main.js',
  //   container: '[data-tuvix-app="youtube-app"]',
  //   activeWhen: '/youtube',
  //   fallback: '<div style="padding:5rem 1rem;color:#6b7280">YouTube içerikleri yüklenirken bir hata oluştu.</div>',
  // })

  orchestrator.start()
}
