/// <reference types="vinxi/types/server" />
import {
  createStartHandler,
  defaultStreamHandler,
  defineEventHandler,
  getRequestURL,
} from '@tanstack/react-start/server'
import { getRouterManifest } from '@tanstack/react-start/router-manifest'

import { createRouter } from './router'
import { buildSitemap } from './utils/sitemap'

const startHandler = createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler)

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
