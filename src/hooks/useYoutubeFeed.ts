import { queryOptions, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { YOUTUBE_QUERY_KEY, parseYoutubeHtml, type YoutubeVideo } from '~/utils/fetchYoutubeVideos'

export type { YoutubeVideo }

export function useYoutubeFeed() {
  return useQuery(
    queryOptions({
      queryKey: YOUTUBE_QUERY_KEY,
      enabled: typeof window !== 'undefined',
      queryFn: async () => {
        const res = await axios.get<string>('/api/youtube')
        return parseYoutubeHtml(res.data)
      },
      staleTime: 1000 * 60 * 60 * 24 * 14,
      gcTime: 1000 * 60 * 60 * 24 * 14,
    })
  )
}
