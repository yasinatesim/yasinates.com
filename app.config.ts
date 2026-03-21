import { defineConfig } from '@tanstack/react-start/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  tsr: {
    appDirectory: 'src',
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
  },
})
