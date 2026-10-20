import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useMatches,
} from '@tanstack/react-router'
import * as React from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import remixiconCss from 'remixicon/fonts/remixicon.css?url'
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

const ADSENSE_CLIENT = 'ca-pub-5037834528497637'

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
      { rel: 'dns-prefetch', href: 'https://api.rss2json.com' },
      { rel: 'dns-prefetch', href: 'https://dev.to' },
      { rel: 'dns-prefetch', href: 'https://www.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://i.ytimg.com' },
      { rel: 'preload', href: '/yasin-ates-hakkimda.jpg', as: 'image', fetchPriority: 'high' },
      { rel: 'preload', href: stableHref(geistLatinWoff2), as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: stableHref(appCss) },
      { rel: 'stylesheet', href: stableHref(geistCss) },
      { rel: 'stylesheet', href: stableHref(geistMonoCss) },
      { rel: 'stylesheet', href: stableHref(remixiconCss) },
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
  React.useEffect(() => {
    const ads = document.createElement('script')
    ads.async = true
    ads.crossOrigin = 'anonymous'
    ads.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) document.head.append(ads)
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
