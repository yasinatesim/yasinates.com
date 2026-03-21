import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import * as React from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import remixiconCss from 'remixicon/fonts/remixicon.css?url'
import { seo } from '~/utils/seo'
import { HeaderApp } from '~/micro-apps/header'
import { FooterApp } from '~/micro-apps/footer'
import { renderSvelteToString } from '@tuvix.js/svelte/server'
import FooterSvelte from '~/micro-apps/footer/Footer.svelte'

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
  loader: async () => ({
    footerSsrHtml: await renderSvelteToString(FooterSvelte),
  }),
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...seo({
        title: 'Yasin Ateş | Frontend Developer, Web & Müzik',
        description: `Yasin Ateş'in kişisel web sitesi. Frontend geliştirme, projeler, blog yazıları ve müzik içerikleri.`,
        image: 'https://yasinates.com/yasin-ates-hakkimda.jpg',
        keywords: 'frontend, yazılım, web, müzik, yasin ateş, developer, react, blog, proje',
      }),
    ],
    links: [
      // DNS prefetch for all external origins (cheap, improves TTFB for 3rd-party requests)
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      // cdnjs removed — remixicon is now self-hosted
      { rel: 'dns-prefetch', href: 'https://api.github.com' },
      { rel: 'dns-prefetch', href: 'https://api.rss2json.com' },
      { rel: 'dns-prefetch', href: 'https://dev.to' },
      { rel: 'dns-prefetch', href: 'https://www.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://i.ytimg.com' },
      // Preconnect for render-blocking font origins
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      // Preload LCP image (profile photo — above the fold on home page)
      { rel: 'preload', href: '/yasin-ates-hakkimda.jpg', as: 'image', fetchPriority: 'high' },
      // Stylesheets
      { rel: 'stylesheet', href: appCss },
      // Inter: swap (body font — FOUT acceptable)
      // Pacifico: optional (logo only — use fallback if not cached, zero CLS)
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Pacifico&display=optional' },
      // Remixicon self-hosted (separate file — not bundled into app.css)
      { rel: 'stylesheet', href: remixiconCss },
      // Favicons & manifest
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'canonical', href: 'https://yasinates.com/' },
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
  const { footerSsrHtml } = Route.useLoaderData()
  return (
    <html>
      <head>
        <title id="main-title">Yasin Ateş | Frontend Developer, Web & Müzik</title>
        <HeadContent />
      </head>
      <body>
        <HeaderApp />
        {children}
        <FooterApp ssrHtml={footerSsrHtml} />
        <React.Suspense>
          <RouterDevtools position="bottom-right" />
          <QueryDevtools buttonPosition="bottom-left" />
        </React.Suspense>
        <Scripts />
      </body>
    </html>
  )
}
