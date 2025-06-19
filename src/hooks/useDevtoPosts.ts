import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import axios from "axios"

export function useDevtoPosts() {
  return useSuspenseQuery(
    queryOptions({
      queryKey: ['devto-posts', 'yasinatesim'],
      queryFn: async () => {
        const res = await axios.get('https://dev.to/api/articles?username=yasinatesim')
        return res.data
      },
      staleTime: 1000 * 60 * 60 * 24 * 14,
      gcTime: 1000 * 60 * 60 * 24 * 14,
    })
  )
}