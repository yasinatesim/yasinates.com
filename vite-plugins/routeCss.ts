import { readFileSync } from 'node:fs'
import path from 'node:path'
import type { Plugin, ResolvedConfig, ViteDevServer } from 'vite'


const VIRTUAL_ID = 'virtual:route-css'
const RESOLVED_ID = `\0${VIRTUAL_ID}`
const ROOT_ROUTE_ID = '__root__'
/** In-process handle from the plugin (dev server) to the SSR-evaluated virtual module. */
const DEV_HOOK = '__routeCssDev__'

type ViteManifestChunk = { file: string; css?: string[]; imports?: string[]; isEntry?: boolean }
type ViteManifest = Record<string, ViteManifestChunk>
type RouteTreeManifest = { routes: Record<string, { filePath?: string }> }
type RouteCssMap = Record<string, string[]>

type Options = { clientBase: string; routesDirectory: string; generatedRouteTree: string }

const CSS_RE = /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/
const NON_INJECTED_RE = /[?&](url|inline|raw)\b/

function readRouteFiles(opts: Options): Array<[routeId: string, file: string]> {
  const routeTreeSource = readFileSync(path.resolve(opts.generatedRouteTree), 'utf-8')
  const routeTreeJson = routeTreeSource.match(/\/\* ROUTE_MANIFEST_START([\s\S]*?)ROUTE_MANIFEST_END \*\//)?.[1]
  if (!routeTreeJson) throw new Error(`[route-css] ROUTE_MANIFEST block missing in ${opts.generatedRouteTree}`)
  const { routes } = JSON.parse(routeTreeJson) as RouteTreeManifest
  return Object.entries(routes).flatMap(([routeId, { filePath }]) =>
    filePath ? [[routeId, path.posix.join(opts.routesDirectory, filePath)] as [string, string]] : [],
  )
}

/* ---------- production ---------- */

function collectManifestCss(manifest: ViteManifest, key: string, seen: Set<string>): string[] {
  if (seen.has(key)) return []
  seen.add(key)
  const chunk = manifest[key]
  if (!chunk) return []
  // imported chunks' CSS first — same cascade order Vite uses when it loads them at runtime
  return [...(chunk.imports ?? []).flatMap((k) => collectManifestCss(manifest, k, seen)), ...(chunk.css ?? [])]
}

function buildRouteCss(clientManifestPath: string, opts: Options): RouteCssMap {
  const manifest = JSON.parse(readFileSync(clientManifestPath, 'utf-8')) as ViteManifest
  const entryKey = Object.keys(manifest).find((k) => manifest[k].isEntry)
  if (!entryKey) throw new Error(`[route-css] no entry chunk in ${clientManifestPath}`)
  const rootCss = new Set(collectManifestCss(manifest, entryKey, new Set()))

  const result: RouteCssMap = {
    [ROOT_ROUTE_ID]: [...rootCss].map((file) => path.posix.join(opts.clientBase, file)),
  }
  for (const [routeId, source] of readRouteFiles(opts)) {
    if (routeId === ROOT_ROUTE_ID) continue
    // route chunks are keyed with their code-split query, e.g. `src/routes/index.tsx?tsr-split=component`
    const css = Object.keys(manifest)
      .filter((k) => k.split('?')[0] === source)
      .flatMap((k) => collectManifestCss(manifest, k, new Set()))
      .filter((file) => !rootCss.has(file))
    if (css.length) result[routeId] = [...new Set(css)].map((file) => path.posix.join(opts.clientBase, file))
  }
  return result
}

async function collectDevCss(server: ViteDevServer, entry: string, seen: Set<string>): Promise<string[]> {
  if (seen.has(entry)) return []
  seen.add(entry)
  if (CSS_RE.test(entry)) return NON_INJECTED_RE.test(entry) ? [] : [entry]
  if (entry.includes('/node_modules/')) return []
  const env = server.environments.client
  try {
    await env.transformRequest(entry)
  } catch (e: unknown) {
    // a module that fails to transform is reported by Vite when the page requests it
    server.config.logger.warn(`[route-css] skipped ${entry}: ${e instanceof Error ? e.message : String(e)}`)
    return []
  }
  const mod = await env.moduleGraph.getModuleByUrl(entry)
  if (!mod) return []
  const css: string[] = []
  for (const dep of mod.importedModules) {
    if (dep.url) css.push(...(await collectDevCss(server, dep.url, seen)))
  }
  return css
}

function createDevRouteCss(server: ViteDevServer, opts: Options): () => Promise<RouteCssMap> {
  let cache: Promise<RouteCssMap> | null = null
  const invalidate = (): void => {
    cache = null
  }
  server.watcher.on('change', invalidate)
  server.watcher.on('add', invalidate)
  server.watcher.on('unlink', invalidate)

  const href = (url: string): string => `${opts.clientBase}${url}${url.includes('?') ? '&' : '?'}direct`
  const compute = async (): Promise<RouteCssMap> => {
    const routeFiles = readRouteFiles(opts)
    const rootFile = routeFiles.find(([id]) => id === ROOT_ROUTE_ID)?.[1]
    const rootCss = rootFile ? await collectDevCss(server, `/${rootFile}`, new Set()) : []
    const result: RouteCssMap = { [ROOT_ROUTE_ID]: rootCss.map(href) }
    for (const [routeId, file] of routeFiles) {
      if (routeId === ROOT_ROUTE_ID) continue
      const css = await collectDevCss(server, `/${file}`, new Set(rootCss))
      if (css.length) result[routeId] = css.map(href)
    }
    server.config.logger.info(
      `[route-css] dev map: ${Object.entries(result).map(([id, list]) => `${id}=${list.length}`).join(' ')}`,
    )
    return result
  }
  return () => {
    cache ??= compute().catch((e: unknown) => {
      cache = null
      throw e
    })
    return cache
  }
}

/** vinxi tags each router's Vite config with `router`; only the `ssr` router renders HTML. */
function isSsrRouter(config: ResolvedConfig): boolean {
  // Reflect.get: environment configs proxy the top-level config, where `in` does not see `router`.
  const router: unknown = Reflect.get(config, 'router')
  return typeof router === 'object' && router !== null && 'name' in router && router.name === 'ssr'
}

const EMPTY_MODULE = 'export const getRouteCss = async () => ({})'
const DEV_MODULE = `export const getRouteCss = () => globalThis[${JSON.stringify(DEV_HOOK)}]?.() ?? Promise.resolve({})`

export function routeCss(opts: Options): Plugin {
  return {
    name: 'route-css',
    configureServer(server) {
      if (isSsrRouter(server.config)) Reflect.set(globalThis, DEV_HOOK, createDevRouteCss(server, opts))
    },
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined
    },
    load(id) {
      if (id !== RESOLVED_ID) return undefined
      const { config } = this.environment
      if (!isSsrRouter(config)) return EMPTY_MODULE
      if (config.command !== 'build') return DEV_MODULE
      const clientManifestPath = path.resolve(config.build.outDir, `../client/${opts.clientBase}/.vite/manifest.json`)
      return `const map = ${JSON.stringify(buildRouteCss(clientManifestPath, opts))}\nexport const getRouteCss = async () => map`
    },
  }
}
