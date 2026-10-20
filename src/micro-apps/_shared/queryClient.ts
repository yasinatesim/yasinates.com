import { QueryClient } from '@tanstack/react-query'

export const sharedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24 * 14,
      gcTime: 1000 * 60 * 60 * 24 * 14,
      retry: 2,
    },
  },
})
