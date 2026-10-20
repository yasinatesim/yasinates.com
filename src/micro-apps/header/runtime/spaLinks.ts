import type { Cleanup } from './util'

export type SpaLinksOptions = {
  navigate: (href: string) => void
  preload: (href: string) => void
  isAppPath: (pathname: string) => boolean
}

const PRELOAD_DELAY_MS = 60

function appHref(target: EventTarget | null, isAppPath: (pathname: string) => boolean): string | null {
  const a = target instanceof Element ? target.closest('a[href]') : null
  if (!(a instanceof HTMLAnchorElement)) return null
  if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return null
  if (a.relList.contains('external')) return null
  const url = new URL(a.href, window.location.href)
  if (url.origin !== window.location.origin) return null
  if (url.hash && url.pathname === window.location.pathname && url.search === window.location.search) return null
  if (!isAppPath(url.pathname)) return null
  return url.pathname + url.search + url.hash
}

export function createSpaLinks({ navigate, preload, isAppPath }: SpaLinksOptions): Cleanup {
  const listeners = new AbortController()
  const { signal } = listeners
  const preloaded = new Set<string>()
  let preloadTimer = 0

  document.addEventListener(
    'click',
    (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const href = appHref(e.target, isAppPath)
      if (!href) return
      e.preventDefault()
      navigate(href)
    },
    { signal },
  )

  const intent = (e: Event): void => {
    const href = appHref(e.target, isAppPath)
    if (!href || preloaded.has(href) || href === window.location.pathname + window.location.search) return
    clearTimeout(preloadTimer)
    preloadTimer = window.setTimeout(
      () => {
        preloaded.add(href)
        preload(href)
      },
      e.type === 'pointerover' ? PRELOAD_DELAY_MS : 0,
    )
  }
  document.addEventListener('pointerover', intent, { passive: true, signal })
  document.addEventListener('focusin', intent, { signal })
  document.addEventListener('touchstart', intent, { passive: true, signal })

  return () => {
    clearTimeout(preloadTimer)
    listeners.abort()
  }
}
