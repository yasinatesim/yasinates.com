import { queryOptions, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { YOUTUBE_QUERY_KEY, parseYoutubeHtml, type YoutubeVideo } from '~/utils/fetchYoutubeVideos'

export type { YoutubeVideo }

export function useYoutubeFeed() {
  return useQuery(
    queryOptions({
      queryKey: YOUTUBE_QUERY_KEY,
      // /api/youtube is a relative URL — only valid in the browser.
      // Server-side data is pre-populated via dehydratedState in the route loader.
      enabled: typeof window !== 'undefined',
      queryFn: async () => {
        const res = await axios.get<string>('/api/youtube')
        return parseYoutubeHtml(res.data)
      },
      staleTime: 1000 * 60 * 60 * 24 * 14, // 2 hafta
      gcTime: 1000 * 60 * 60 * 24 * 14,
    })
  )
}
