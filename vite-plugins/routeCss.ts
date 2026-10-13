import { readFileSync } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

/**
 * Exposes `virtual:route-css`: a map of routeId → stylesheet hrefs from the production client build.
 *
 * TanStack Start (vinxi) only lists route chunks as JS preloads, so CSS imported by code-split
 * route components is injected by JS after hydration → unstyled first paint. The root route
 * renders these hrefs as <link rel="stylesheet"> during SSR to close that gap.
 *
 * Only server builds read the client manifest (built first, same lookup as `tsr:routes-manifest`).
 * Client and dev builds get an empty map — the root loader runs on the server and its data is dehydrated.
 */

const VIRTUAL_ID = 'virtual:route-css'
const RESOLVED_ID = `\0${VIRTUAL_ID}`
const ROOT_ROUTE_ID = '__root__'

type ViteManifestChunk = { file: string; css?: string[]; imports?: string[]; isEntry?: boolean }
type ViteManifest = Record<string, ViteManifestChunk>
type RouteTreeManifest = { routes: Record<string, { filePath?: string }> }

type Options = { clientBase: string; routesDirectory: string; generatedRouteTree: string }

function collectCss(manifest: ViteManifest, key: string, seen: Set<string>): string[] {
  if (seen.has(key)) return []
  seen.add(key)
  const chunk = manifest[key]
  if (!chunk) return []
  // imported chunks' CSS first — same cascade order Vite uses when it loads them at runtime
  return [...(chunk.imports ?? []).flatMap((k) => collectCss(manifest, k, seen)), ...(chunk.css ?? [])]
}

function buildRouteCss(clientManifestPath: string, opts: Options): Record<string, string[]> {
  const manifest = JSON.parse(readFileSync(clientManifestPath, 'utf-8')) as ViteManifest
  const routeTreeSource = readFileSync(path.resolve(opts.generatedRouteTree), 'utf-8')
  const routeTreeJson = routeTreeSource.match(/\/\* ROUTE_MANIFEST_START([\s\S]*?)ROUTE_MANIFEST_END \*\//)?.[1]
  if (!routeTreeJson) throw new Error(`[route-css] ROUTE_MANIFEST block missing in ${opts.generatedRouteTree}`)
  const { routes } = JSON.parse(routeTreeJson) as RouteTreeManifest

  const entryKey = Object.keys(manifest).find((k) => manifest[k].isEntry)
  if (!entryKey) throw new Error(`[route-css] no entry chunk in ${clientManifestPath}`)
  const rootCss = new Set(collectCss(manifest, entryKey, new Set()))

  const result: Record<string, string[]> = {
    [ROOT_ROUTE_ID]: [...rootCss].map((file) => path.posix.join(opts.clientBase, file)),
  }
  for (const [routeId, { filePath }] of Object.entries(routes)) {
    if (routeId === ROOT_ROUTE_ID || !filePath) continue
    const source = path.posix.join(opts.routesDirectory, filePath)
    // route chunks are keyed with their code-split query, e.g. `src/routes/index.tsx?tsr-split=component`
    const css = Object.keys(manifest)
      .filter((k) => k.split('?')[0] === source)
      .flatMap((k) => collectCss(manifest, k, new Set()))
      .filter((file) => !rootCss.has(file))
    if (css.length) result[routeId] = [...new Set(css)].map((file) => path.posix.join(opts.clientBase, file))
  }
  return result
}

export function routeCss(opts: Options): Plugin {
  let routeCssModule = 'export default {}'
  return {
    name: 'route-css',
    configResolved(config) {
      // vinxi tags each router's Vite config with `router`; only the `ssr` router renders HTML
      const router: unknown = 'router' in config ? config.router : undefined
      const isSsrRouter = typeof router === 'object' && router !== null && 'name' in router && router.name === 'ssr'
      if (config.command !== 'build' || !isSsrRouter) return
      const clientManifestPath = path.resolve(config.build.outDir, `../client/${opts.clientBase}/.vite/manifest.json`)
      routeCssModule = `export default ${JSON.stringify(buildRouteCss(clientManifestPath, opts))}`
    },
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined
    },
    load(id) {
      return id === RESOLVED_ID ? routeCssModule : undefined
    },
  }
}
