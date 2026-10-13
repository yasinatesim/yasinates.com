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
import { seo } from '~/utils/seo'
import { HeaderApp } from '~/micro-apps/header'
import { FooterApp } from '~/micro-apps/footer'
import { renderSvelteToString } from '@tuvix.js/svelte/server'
import FooterSvelte from '~/micro-apps/footer/Footer.svelte'
import routeCss from 'virtual:route-css'

const ADSENSE_CLIENT = 'ca-pub-5037834528497637'

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
  staleTime: Infinity, // loader data never refetches on client
  loader: async () => ({
    footerSsrHtml: await renderSvelteToString(FooterSvelte),
    // stylesheets of the client entry + code-split route chunks, which TanStack Start omits from the SSR head
    routeCss,
  }),
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'google-adsense-account', content: ADSENSE_CLIENT },
      ...seo({
        title: 'Yasin Ateş | Frontend Developer, Web & Müzik',
        description: `Yasin Ateş'in kişisel web sitesi. Frontend geliştirme, projeler, blog yazıları ve müzik içerikleri.`,
        image: 'https://yasinates.com/yasin-ates-hakkimda.jpg',
        keywords: 'frontend, yazılım, web, müzik, yasin ateş, developer, react, blog, proje',
      }),
    ],
    links: [
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      // cdnjs removed — remixicon is now self-hosted
      { rel: 'dns-prefetch', href: 'https://api.github.com' },
      { rel: 'dns-prefetch', href: 'https://api.rss2json.com' },
      { rel: 'dns-prefetch', href: 'https://dev.to' },
      { rel: 'dns-prefetch', href: 'https://www.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://i.ytimg.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      // Preload LCP image (profile photo — above the fold on home page)
      { rel: 'preload', href: '/yasin-ates-hakkimda.jpg', as: 'image', fetchPriority: 'high' },
      { rel: 'stylesheet', href: appCss },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
      // display=optional: logo only — zero CLS if font not cached
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Pacifico&display=optional' },
      { rel: 'stylesheet', href: remixiconCss },
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
  // Frozen to the SSR-matched routes: on client navigation Vite's chunk loader injects route CSS itself,
  // so re-deriving here would only duplicate those <link>s.
  const [cssLinks] = React.useState(() => [...new Set(matches.flatMap((match) => cssByRoute[match.routeId] ?? []))])
  return (
    <html>
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
        {cssLinks.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
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
