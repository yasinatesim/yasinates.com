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
          // Function form is required when SSR build externalises some packages:
          // object form errors if a listed package is external (SSR build).
          manualChunks: (id) => {
            if (id.includes('/node_modules/react-dom/') || id.includes('/node_modules/react/')) return 'vendor-react'
            if (id.includes('/node_modules/vue/')) return 'vendor-vue'
            if (id.includes('/node_modules/svelte/')) return 'vendor-svelte'
            if (id.includes('/node_modules/prismjs/')) return 'vendor-prism'
          },
        },
      },
    },
  },
})
