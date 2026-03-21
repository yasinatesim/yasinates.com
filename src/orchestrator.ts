/**
 * tuvix.js Shell Orchestrator
 *
 * All route components are thin shells (<div data-tuvix-app="...">).
 * The orchestrator loads each micro app IIFE bundle from /micro-apps/{name}/main.js
 * and mounts it into the matching container.
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
  // ─── Blog app (/blog, /:postId) ────────────────────────────────────────────
  orchestrator.register({
    name: 'blog-app',
    entry: '/micro-apps/blog-app/main.js',
    container: '[data-tuvix-app="blog-app"]',
    activeWhen: (path: string) => {
      if (path === '/blog' || path.startsWith('/blog/')) return true
      // Match /:postId — single segment that isn't a known top-level route
      const knownRoutes = ['projeler', 'hakkimda', 'iletisim', 'github', 'youtube']
      const segment = path.replace(/^\//, '').split('/')[0]
      return Boolean(segment) && !knownRoutes.includes(segment)
    },
    fallback: '<div style="padding:5rem 1rem;color:#6b7280">Blog yüklenirken bir hata oluştu.</div>',
  })

  // ─── Projects app (/projeler) ──────────────────────────────────────────────
  orchestrator.register({
    name: 'projects-app',
    entry: '/micro-apps/projects-app/main.js',
    container: '[data-tuvix-app="projects-app"]',
    activeWhen: '/projeler',
    fallback: '<div style="padding:5rem 1rem;color:#6b7280">Projeler yüklenirken bir hata oluştu.</div>',
  })

  // ─── About app (/hakkimda) ─────────────────────────────────────────────────
  orchestrator.register({
    name: 'about-app',
    entry: '/micro-apps/about-app/main.js',
    container: '[data-tuvix-app="about-app"]',
    activeWhen: '/hakkimda',
    fallback: '<div style="padding:5rem 1rem;color:#6b7280">Hakkımda sayfası yüklenirken bir hata oluştu.</div>',
  })

  // ─── Contact app (/iletisim) ───────────────────────────────────────────────
  orchestrator.register({
    name: 'contact-app',
    entry: '/micro-apps/contact-app/main.js',
    container: '[data-tuvix-app="contact-app"]',
    activeWhen: '/iletisim',
    fallback: '<div style="padding:5rem 1rem;color:#6b7280">İletişim sayfası yüklenirken bir hata oluştu.</div>',
  })

  // ─── GitHub app (/github) ──────────────────────────────────────────────────
  orchestrator.register({
    name: 'github-app',
    entry: '/micro-apps/github-app/main.js',
    container: '[data-tuvix-app="github-app"]',
    activeWhen: '/github',
    fallback: '<div style="padding:5rem 1rem;color:#6b7280">GitHub projeleri yüklenirken bir hata oluştu.</div>',
  })

  // ─── YouTube app (/youtube) ────────────────────────────────────────────────
  orchestrator.register({
    name: 'youtube-app',
    entry: '/micro-apps/youtube-app/main.js',
    container: '[data-tuvix-app="youtube-app"]',
    activeWhen: '/youtube',
    fallback: '<div style="padding:5rem 1rem;color:#6b7280">YouTube içerikleri yüklenirken bir hata oluştu.</div>',
  })

  orchestrator.start()
}
