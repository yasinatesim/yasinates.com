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

export default defineEventHandler(async (event) => {
  if (getRequestURL(event).pathname === '/sitemap.xml') {
    return new Response(await buildSitemap(), {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }
  return startHandler(event)
})
