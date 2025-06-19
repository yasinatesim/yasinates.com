import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import axios from "axios"

export function useMediumPosts() {
  return useSuspenseQuery(
    queryOptions({
      queryKey: ['medium-posts', 'yasinatesim'],
      queryFn: async () => {
        const res = await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@yasinatesim')
        return res.data.items
      },
      staleTime: 1000 * 60 * 60 * 24 * 14,
      gcTime: 1000 * 60 * 60 * 24 * 14,
    })
  )
}
