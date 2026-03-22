import { QueryClient } from '@tanstack/react-query'

/**
 * Singleton QueryClient shared across all micro apps running in the same window.
 * Prevents duplicate cache instances when multiple micro apps coexist on the page.
 */
export const sharedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24 * 14, // 2 hafta
      gcTime: 1000 * 60 * 60 * 24 * 14,
      retry: 2,
    },
  },
})
