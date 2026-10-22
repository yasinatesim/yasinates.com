/// <reference types="vinxi/types/server" />
import {
  createStartHandler,
  defaultStreamHandler,
  defineEventHandler,
  defineHandlerCallback,
  getRequestURL,
} from '@tanstack/react-start/server'
import { getRouterManifest } from '@tanstack/react-start/router-manifest'

import { createRouter } from './router'
import { buildSitemap } from './utils/sitemap'

// The router leaves statusCode at 200 when a loader throws (it only maps redirects and notFound),
// so an error page would be served as a normal page: indexed by Google and cached by the CDN.
const startHandler = createStartHandler({
  createRouter,
  getRouterManifest,
})(
  defineHandlerCallback(async (ctx) => {
    const response = await defaultStreamHandler(ctx)
    if (response.status !== 200 || !ctx.router.state.matches.some((match) => match.status === 'error')) return response
    return new Response(response.body, { status: 500, headers: response.headers })
  }),
)

const PAGE_CDN_CACHE = 'public, durable, s-maxage=300, stale-while-revalidate=86400'

export default defineEventHandler(async (event) => {
  if (getRequestURL(event).pathname === '/sitemap.xml') {
    return new Response(await buildSitemap(), {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }
  const response = await startHandler(event)
  if (response instanceof Response && response.status === 200) {
    response.headers.set('Netlify-CDN-Cache-Control', PAGE_CDN_CACHE)
  }
  return response
})
