import { defineConfig } from '@tanstack/react-start/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  tsr: {
    appDirectory: 'src',
  },
  server: {
    preset: 'netlify',
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      svelte({ compilerOptions: { css: 'injected', hydratable: true } }),
      vue(),
    ],
    optimizeDeps: {
      // Angular JIT compiler must be available at runtime
      include: ['@angular/compiler'],
    },
    build: {
      // Warn when individual chunks exceed 500 KB (default 500)
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          manualChunks: {
            // Framework runtimes — cached independently, rarely change
            'vendor-react':  ['react', 'react-dom'],
            'vendor-vue':    ['vue'],
            'vendor-svelte': ['svelte'],
            // Heavy Prism language components — only needed on blog pages
            'vendor-prism':  ['prismjs'],
          },
        },
      },
    },
  },
})
