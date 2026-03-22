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
      include: ['@angular/compiler'],
    },
    build: {
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          // Function form required — object form errors when SSR build externalises a listed package.
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
