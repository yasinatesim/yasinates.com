import { defineConfig } from 'vitest/config'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [viteTsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/*.spec.ts', 'src/**/*.spec.tsx'],
    exclude: ['node_modules', 'lighthouse-guard', 'tuvix.js'],
    coverage: {
      provider: 'v8',
      include: ['src/components/**', 'src/utils/**', 'src/hooks/**'],
      exclude: ['src/**/*.d.ts', 'src/routeTree.gen.ts'],
      thresholds: { lines: 70, functions: 70 },
    },
  },
})
