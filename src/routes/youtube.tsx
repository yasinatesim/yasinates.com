import { createFileRoute } from '@tanstack/react-router'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { TuvixReactApp } from '@tuvix.js/react'
import { seo } from '~/utils/seo'
import YoutubeApp from '~/micro-apps/youtube/App'
import { fetchYoutubeVideos, YOUTUBE_QUERY_KEY } from '~/utils/fetchYoutubeVideos'

export const Route = createFileRoute('/youtube')({
  loader: async () => {
    const qc = new QueryClient()
    try {
      const videos = await fetchYoutubeVideos()
      qc.setQueryData(YOUTUBE_QUERY_KEY, videos)
    } catch {
      // fetch failed — client will load via /api/youtube
    }
    return { dehydratedState: dehydrate(qc) }
  },
  head: () => ({
    title: 'YouTube Videoları | Yasin Ateş',
    meta: [
      ...seo({
        title: 'YouTube Videoları | Yasin Ateş',
        description: "Yasin Ateş'in YouTube kanalında yayınladığı tüm videolar.",
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'youtube, video, içerik, yasin ateş, frontend, müzik'
      }),
      { name: 'canonical', content: 'https://yasinates.com/youtube' },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'VideoGallery',
          name: 'YouTube Videoları',
          url: 'https://yasinates.com/youtube',
          description: "Yasin Ateş'in YouTube kanalında yayınladığı tüm videolar."
        })
      }
    ]
  }),
  component: () => {
    const { dehydratedState } = Route.useLoaderData()
    return <TuvixReactApp name="youtube-app" App={YoutubeApp} dehydratedState={dehydratedState} />
  },
})
