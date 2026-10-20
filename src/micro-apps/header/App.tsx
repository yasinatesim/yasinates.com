import { Link, matchPathname, rootRouteId, useLocation, useRouter, useRouterState } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { CloseIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from '~/assets/icons/react'
import { readRecentPosts } from './recentPosts'
import { mountSignalRuntime } from './runtime'
import type { SignalRuntime } from './runtime'
import styles from './header.module.scss'

const navLinks = [
  { to: '/', label: 'Anasayfa' },
  { to: '/hakkimda', label: 'Hakkımda' },
  { to: '/projeler', label: 'Projeler' },
  { to: '/blog', label: 'Blog Yazıları' },
  { to: '/iletisim', label: 'İletişim' },
] as const

const EMAIL = 'yasinatesim@gmail.com'

const cx = (...names: Array<string | false | undefined>): string => names.filter(Boolean).join(' ')

const Header = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const pathname = useLocation({ select: (l) => l.pathname })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const runtimeRef = useRef<SignalRuntime | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [fieldLive, setFieldLive] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null)
  const [shortcut, setShortcut] = useState('Ctrl K')
  const navPending = useRouterState({ select: (st) => st.isLoading || st.status === 'pending' })
  const [bar, setBar] = useState<'idle' | 'loading' | 'done'>('idle')
  useEffect(() => {
    if (navPending) {
      const t = window.setTimeout(() => setBar('loading'), 100)
      return () => clearTimeout(t)
    }
    setBar((b) => (b === 'loading' ? 'done' : b))
    const t = window.setTimeout(() => setBar('idle'), 450)
    return () => clearTimeout(t)
  }, [navPending])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setShortcut('⌘K')
    const runtime = mountSignalRuntime({
      canvas,
      navigate: (href) => router.history.push(href),
      preload: (href) => {
        router.preloadRoute({ to: href.split(/[?#]/)[0] }).catch(() => undefined)
      },
      isAppPath: (pathname) =>
        !/\.[a-z0-9]{2,5}$/i.test(pathname) &&
        router.flatRoutes.some(
          (route) =>
            route.id !== rootRouteId &&
            !route.fullPath.startsWith('/api') &&
            matchPathname(router.basepath, pathname, { to: route.fullPath, fuzzy: false }) !== undefined,
        ),
      onFieldLive: () => setFieldLive(true),
      onScrolledChange: setScrolled,
      onThemeChange: setTheme,
      getRecentPosts: () => readRecentPosts(queryClient),
    })
    runtimeRef.current = runtime
    const unsubscribe = router.subscribe('onBeforeNavigate', runtime.navigationStarted)
    return () => {
      unsubscribe()
      runtime.destroy()
      runtimeRef.current = null
    }
  }, [router, queryClient])

  useEffect(() => {
    setMenuOpen(false)
    runtimeRef.current?.routeChanged()
  }, [pathname])

  useEffect(() => {
    runtimeRef.current?.setMenuLocked(menuOpen)
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.querySelector('dialog[open]')) setMenuOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 900px)')
    const onDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onDesktop)
    return () => {
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [menuOpen])

  const themeLabel = theme === null ? 'Temayı değiştir' : theme === 'light' ? 'Koyu temaya geç' : 'Açık temaya geç'

  return (
    <>
      <div className={cx(styles['field'], fieldLive && styles['is-live'])} aria-hidden="true">
        <canvas ref={canvasRef} className={styles['field__canvas']} />
      </div>
      <div className={styles['grain']} aria-hidden="true" />
      <div
        className={cx(styles['nav-progress'], bar === 'loading' && styles['is-loading'], bar === 'done' && styles['is-done'])}
        aria-hidden="true"
      />
      <a className={styles['skip-link']} href="#main">
        İçeriğe geç
      </a>
      <header
        className={cx(styles['site-header'], scrolled && styles['is-scrolled'], menuOpen && styles['menu-open'])}
      >
        <div className={styles['site-header__bar']}>
          <Link to="/" className={styles['brand']} aria-label="Yasin Ateş, Anasayfa">
            <svg className={styles['brand__mark']} viewBox="0 0 28 20" aria-hidden="true">
              <path
                className={styles['brand__wave']}
                d="M1 10h4l2.5-7 4 14 4-17 4 17 3-7H27"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles['brand__name']}>Yasin Ateş</span>
          </Link>

          <nav className={styles['site-nav']} aria-label="Ana menü">
            <ul className={styles['site-nav__list']}>
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={styles['site-nav__link']} activeOptions={{ exact: true }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles['site-header__actions']}>
            <button
              type="button"
              className={styles['cmdk-trigger']}
              data-cmdk-trigger
              onClick={() => runtimeRef.current?.openPalette()}
              aria-haspopup="dialog"
              aria-keyshortcuts="Meta+K Control+K"
            >
              <SearchIcon />
              <span className={styles['cmdk-trigger__label']}>Hızlı geçiş</span>
              <kbd className={styles['cmdk-trigger__kbd']}>{shortcut}</kbd>
            </button>
            <button
              type="button"
              className={cx(styles['icon-btn'], styles['theme-toggle'])}
              data-theme-toggle
              onClick={(e) => runtimeRef.current?.toggleTheme(e.currentTarget)}
              aria-label={themeLabel}
              title={theme === null ? undefined : themeLabel}
            >
              <SunIcon className={styles['theme-toggle__sun']} />
              <MoonIcon className={styles['theme-toggle__moon']} />
            </button>
            <button
              type="button"
              className={cx(styles['icon-btn'], styles['menu-toggle'])}
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            >
              <MenuIcon className={styles['menu-toggle__open']} />
              <CloseIcon className={styles['menu-toggle__close']} />
            </button>
          </div>
        </div>

        <div className={styles['mobile-nav']} id="mobile-nav" hidden={!menuOpen}>
          <nav aria-label="Mobil menü">
            <ul className={styles['mobile-nav__list']}>
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} activeOptions={{ exact: true }} onClick={() => setMenuOpen(false)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className={cx(styles['mobile-nav__meta'], 'micro')}>
            İstanbul, Türkiye · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>
      </header>
    </>
  )
}

export default Header
