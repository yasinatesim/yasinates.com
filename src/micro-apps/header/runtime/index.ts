import { createCommandPalette } from './cmdk'
import type { PaletteLink } from './cmdk'
import { initField } from './field'
import { createMotion } from './motion'
import { createSpaLinks } from './spaLinks'
import { restoreThemeState, toggleTheme } from './theme'
import { copyEmail, removeToast } from './toast'
import type { Theme } from './theme'
import { prefersReducedMotion } from './util'

export type SignalRuntimeOptions = {
  canvas: HTMLCanvasElement
  navigate: (href: string) => void
  onFieldLive: () => void
  onScrolledChange: (scrolled: boolean) => void
  onThemeChange: (theme: Theme) => void
  getRecentPosts: () => PaletteLink[]
  preload: (href: string) => void
  isAppPath: (pathname: string) => boolean
}

export type SignalRuntime = {
  openPalette: () => void
  toggleTheme: (origin: Element | null) => void
  setMenuLocked: (locked: boolean) => void
  navigationStarted: () => void
  routeChanged: () => void
  destroy: () => void
}

export function mountSignalRuntime(options: SignalRuntimeOptions): SignalRuntime {
  const root = document.documentElement
  const reduced = prefersReducedMotion()
  options.onThemeChange(restoreThemeState())
  const htmlWatch = new MutationObserver(() => {
    if (!root.hasAttribute('data-theme') || !root.classList.contains('motion-ready')) {
      options.onThemeChange(restoreThemeState())
      field?.themeChanged()
    }
  })
  htmlWatch.observe(root, { attributes: true, attributeFilter: ['data-theme', 'class'] })
  const field = initField(options.canvas, options.onFieldLive)
  const motion = createMotion()

  let scrolled: boolean | null = null
  const stopScroll = motion.onScroll((y, vh) => {
    field?.setScroll(y / vh)
    const next = y > 24
    if (next !== scrolled) {
      scrolled = next
      options.onScrolledChange(next)
    }
  })

  const flipTheme = (origin: Element | null): void =>
    toggleTheme(origin, reduced, (theme) => {
      field?.themeChanged()
      motion.refresh()
      options.onThemeChange(theme)
    })

  const locks = new Set<'menu' | 'palette'>()
  const setLock = (key: 'menu' | 'palette', locked: boolean): void => {
    if (locked) locks.add(key)
    else locks.delete(key)
    root.classList.toggle('no-scroll', locks.has('menu'))
    motion.setLocked(locks.size > 0)
  }

  const palette = createCommandPalette({
    navigate: options.navigate,
    toggleTheme: () => flipTheme(document.querySelector('[data-theme-toggle]')),
    setScrollLocked: (locked) => setLock('palette', locked),
    getRecentPosts: options.getRecentPosts,
  })

  const onClick = (e: MouseEvent): void => {
    if (!(e.target instanceof Element)) return
    if (e.target.closest('[data-to-top]')) motion.scrollToTop()
    else if (e.target.closest('[data-copy-email]')) void copyEmail()
  }
  document.addEventListener('click', onClick)

  const stopSpaLinks = createSpaLinks({
    navigate: options.navigate,
    preload: options.preload,
    isAppPath: options.isAppPath,
  })

  return {
    openPalette: palette.open,
    toggleTheme: flipTheme,
    setMenuLocked: (locked) => setLock('menu', locked),
    navigationStarted: motion.halt,
    routeChanged: motion.refresh,
    destroy() {
      htmlWatch.disconnect()
      stopSpaLinks()
      document.removeEventListener('click', onClick)
      stopScroll()
      palette.destroy()
      motion.destroy()
      field?.destroy()
      removeToast()
      root.classList.remove('no-scroll', 'no-webgl')
    },
  }
}
