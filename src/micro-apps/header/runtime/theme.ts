export type Theme = 'dark' | 'light'

export const THEME_STORAGE_KEY = 'theme'
export const THEME_COLORS: Record<Theme, string> = { dark: '#0a0b0e', light: '#e9edf2' }

export const currentTheme = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch (e: unknown) {
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
}

export function restoreThemeState(): Theme {
  const root = document.documentElement
  let stored: string | null = null
  try {
    stored = localStorage.getItem(THEME_STORAGE_KEY)
  } catch (e: unknown) {
  }
  const theme: Theme =
    stored === 'light' || stored === 'dark'
      ? stored
      : window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark'
  if (root.dataset.theme !== theme) root.dataset.theme = theme
  root.classList.add('motion-ready')
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'theme-color'
    document.head.append(meta)
  }
  meta.content = THEME_COLORS[theme]
  return theme
}

export function toggleTheme(origin: Element | null, reduced: boolean, onChange: (theme: Theme) => void): void {
  const next: Theme = currentTheme() === 'light' ? 'dark' : 'light'
  const commit = (): void => {
    applyTheme(next)
    onChange(next)
  }
  if (reduced || typeof document.startViewTransition !== 'function') {
    commit()
    return
  }
  const root = document.documentElement
  const r = origin?.getBoundingClientRect()
  root.style.setProperty('--vt-x', `${r ? r.left + r.width / 2 : window.innerWidth - 40}px`)
  root.style.setProperty('--vt-y', `${r ? r.top + r.height / 2 : 32}px`)
  root.classList.add('theme-switching')
  const vt = document.startViewTransition(commit)
  vt.finished.finally(() => root.classList.remove('theme-switching'))
}
