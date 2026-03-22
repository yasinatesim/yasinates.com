/**
 * Builds each micro app as a standalone IIFE bundle.
 * Output: public/micro-apps/{name}/main.js (+ main.css if styles are extracted)
 *
 * Usage:
 *   node scripts/build-micro-apps.mjs
 *   node scripts/build-micro-apps.mjs --app blog-app   (single app)
 */

import { build } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const MICRO_APPS = [
  { name: 'blog-app',     entry: 'src/micro-apps/blog/index.ts' },
  { name: 'projects-app', entry: 'src/micro-apps/projects/index.ts' },
  { name: 'about-app',    entry: 'src/micro-apps/about/index.ts' },
  { name: 'contact-app',  entry: 'src/micro-apps/contact/index.ts' },
  { name: 'github-app',   entry: 'src/micro-apps/github/index.ts' },
  { name: 'youtube-app',  entry: 'src/micro-apps/youtube/index.ts' },
]

// Optional: build only one app via --app flag
const targetArg = process.argv.find((a) => a.startsWith('--app='))
const targetApp = targetArg ? targetArg.split('=')[1] : null
const appsToBuild = targetApp
  ? MICRO_APPS.filter((a) => a.name === targetApp)
  : MICRO_APPS

if (targetApp && appsToBuild.length === 0) {
  console.error(`Unknown micro app: ${targetApp}`)
  console.error(`Available: ${MICRO_APPS.map((a) => a.name).join(', ')}`)
  process.exit(1)
}

for (const app of appsToBuild) {
  console.log(`\n▶ Building ${app.name}…`)

  await build({
    root,
    configFile: false,
    plugins: [react()],
    resolve: {
      alias: {
        '~': resolve(root, 'src'),
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
    },
    build: {
      outDir: resolve(root, `public/micro-apps/${app.name}`),
      emptyOutDir: true,
      lib: {
        entry: resolve(root, app.entry),
        name: app.name.replace(/-/g, '_'),
        formats: ['iife'],
        fileName: () => 'main.js',
      },
      rollupOptions: {
        // Bundle everything — micro apps are self-contained
        external: [],
        output: {
          // Expose the default export on window.__TUVIX_MODULES__
          extend: true,
          globals: {},
        },
      },
      cssCodeSplit: false,
      sourcemap: false,
    },
    // Disable publicDir copy — micro app bundles are self-contained;
    // copying public/ into the outDir (which is inside public/) causes a loop.
    publicDir: false,
    logLevel: 'warn',
  })

  console.log(`✓ ${app.name} → public/micro-apps/${app.name}/main.js`)
}

console.log('\n✅ All micro apps built.')
