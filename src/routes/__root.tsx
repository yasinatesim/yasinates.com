import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useMatches,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'
import * as React from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import geistCss from '@fontsource-variable/geist/index.css?url'
import geistMonoCss from '@fontsource-variable/geist-mono/index.css?url'
import geistLatinWoff2 from '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url'
import { DEFAULT_OG_IMAGE, seo } from '~/utils/seo'
import { HeaderApp } from '~/micro-apps/header'
import { FooterApp } from '~/micro-apps/footer'
import { renderSvelteToString } from '@tuvix.js/svelte/server'
import FooterSvelte from '~/micro-apps/footer/Footer.svelte'
import { getRouteCss } from 'virtual:route-css'
import { THEME_COLORS, THEME_STORAGE_KEY } from '~/micro-apps/header/runtime/theme'
import { REVEAL_SCRIPT } from '~/micro-apps/header/runtime/reveal'
import { ADSENSE_CLIENT } from '~/micro-apps/_shared/ads/config'
import { adsScriptLoaded, startAds } from '~/micro-apps/_shared/ads/runtime'
import { AdRails } from '~/micro-apps/_shared/ads/AdSlot'

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    // Route content stays inside `.wrap`, so the fixed gutter rails never cover it.
    adRails?: true
  }
}

// These pages only list GitHub repos / YouTube videos. AdSense forbids ads on screens whose content
// comes from elsewhere, so a visit that lands on them never loads the ad script (they are also excluded in the
// AdSense auto-ads settings).
const AD_FREE_PATHS: Record<string, true> = { '/github': true, '/youtube': true }
const isAdFreePath = (pathname: string): boolean => AD_FREE_PATHS[pathname.replace(/\/+$/, '') || '/'] === true

// Set when a client-side navigation has to become a full page load (see the `onBeforeNavigate` effect below).
let documentReloadPending = false

const stableHref = (url: string): string => (import.meta.env.DEV ? url.replace(/[?&]t=\d+$/, '') : url)

const THEME_BOOT_SCRIPT = `(function(){var d=document.documentElement,t=null;try{t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.setAttribute('data-theme',t);var m=document.createElement('meta');m.name='theme-color';m.content=t==='light'?${JSON.stringify(THEME_COLORS.light)}:${JSON.stringify(THEME_COLORS.dark)};document.head.appendChild(m);d.classList.add('motion-ready')})()`

const RouterDevtools =
  import.meta.env.DEV
    ? React.lazy(() =>
        import('@tanstack/react-router-devtools').then((m) => ({
          default: m.TanStackRouterDevtools,
        })),
      )
    : () => null

const QueryDevtools =
  import.meta.env.DEV
    ? React.lazy(() =>
        import('@tanstack/react-query-devtools').then((m) => ({
          default: m.ReactQueryDevtools,
        })),
      )
    : () => null

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  staleTime: Infinity,
  // While a navigation turns into a full page load, keep the router from rendering the target client-side.
  beforeLoad: () => {
    if (documentReloadPending) return new Promise<never>(() => {})
  },
  loader: async () => ({
    footerSsrHtml: await renderSvelteToString(FooterSvelte),
    routeCss: await getRouteCss(),
  }),
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'color-scheme', content: 'dark light' },
      { name: 'google-adsense-account', content: ADSENSE_CLIENT },
      ...seo({
        title: 'Yasin Ateş | Frontend Developer, Web & Müzik',
        description: `Yasin Ateş'in kişisel web sitesi. Frontend geliştirme, projeler, blog yazıları ve müzik içerikleri.`,
        image: DEFAULT_OG_IMAGE,
        keywords: 'frontend, yazılım, web, müzik, yasin ateş, developer, react, blog, proje',
      }),
    ],
    links: [
      { rel: 'dns-prefetch', href: 'https://api.github.com' },
      { rel: 'dns-prefetch', href: 'https://dev.to' },
      { rel: 'dns-prefetch', href: 'https://www.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://i.ytimg.com' },
      { rel: 'preload', href: '/yasin-ates-hakkimda.jpg', as: 'image', fetchPriority: 'high' },
      { rel: 'preload', href: stableHref(geistLatinWoff2), as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: stableHref(appCss) },
      { rel: 'stylesheet', href: stableHref(geistCss) },
      { rel: 'stylesheet', href: stableHref(geistMonoCss) },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { footerSsrHtml, routeCss: cssByRoute } = Route.useLoaderData()
  const matches = useMatches()
  const [cssLinks] = React.useState(() => [...new Set(matches.flatMap((match) => cssByRoute[match.routeId] ?? []))])
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const adFree = isAdFreePath(pathname)
  // Error and 404 screens carry no content of their own, so they get no rails either.
  const adRails = !adFree && matches.some((match) => match.staticData.adRails) && matches.every((match) => match.status === 'success')
  React.useEffect(() => {
    if (adFree) return
    return startAds()
  }, [adFree])
  // Once ads run, moving to another page is a full page load instead of a client-side navigation. AdSense counts one
  // page view per document: ad requests made after client-side navigations share the first page's quota, so Google
  // leaves most of them unfilled and the slots collapse ("ads appear, then vanish"). A fresh document also clears the
  // overlay ads (anchor, vignette, side rails) before the ad-free pages and lets vignettes show between pages.
  // Router load events fire for real navigations only (not hover preloads); same-page hash/search changes stay
  // client-side. The reload waits a task so the router has written the new URL (`#fragment` targets included).
  const router = useRouter()
  React.useEffect(() => {
    // Right after hydration the router has no resolved location yet, so the first navigation reports no `fromLocation`;
    // the page it leaves is then the one this document was loaded with.
    const loadedPathname = window.location.pathname
    // `onBeforeLoad`, not `onBeforeNavigate`: the router skips the latter after any client-side redirect.
    return router.subscribe('onBeforeLoad', ({ fromLocation, toLocation }) => {
      if ((fromLocation?.pathname ?? loadedPathname) === toLocation.pathname || !adsScriptLoaded()) return
      documentReloadPending = true
      window.setTimeout(() => window.location.reload(), 0)
    })
  }, [router])
  React.useEffect(() => {
    if (!import.meta.env.DEV) return
    document.querySelectorAll<HTMLLinkElement>('link[data-route-css]').forEach((link) => {
      link.disabled = true
    })
  }, [])
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <HeadContent />
        {cssLinks.map((href) => (
          <link key={href} rel="stylesheet" href={href} data-route-css="" />
        ))}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body>
        <HeaderApp />
        {children}
        <FooterApp ssrHtml={footerSsrHtml} />
        {/* Keyed by the committed leaf match, not the pathname: the location changes while the old page is still shown. */}
        {adRails && <AdRails key={matches[matches.length - 1]?.id} />}
        <React.Suspense>
          <RouterDevtools position="bottom-right" />
          <QueryDevtools buttonPosition="bottom-left" />
        </React.Suspense>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
        <Scripts />
      </body>
    </html>
  )
}
