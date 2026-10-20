import { createFileRoute } from '@tanstack/react-router'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { TuvixReactApp } from '@tuvix.js/react'
import { seo } from '~/utils/seo'
import ProjectsApp from '~/micro-apps/projects/App'
import { fetchYoutubeVideos, YOUTUBE_QUERY_KEY } from '~/utils/fetchYoutubeVideos'

export const Route = createFileRoute('/projeler')({
  loader: async () => {
    const qc = new QueryClient()
    try {
      const videos = await fetchYoutubeVideos()
      qc.setQueryData(YOUTUBE_QUERY_KEY, videos)
    } catch {
    }
    return { dehydratedState: dehydrate(qc) }
  },
  component: () => {
    const { dehydratedState } = Route.useLoaderData()
    return <TuvixReactApp name="projects-app" App={ProjectsApp} dehydratedState={dehydratedState} />
  },
  head: () => ({
    title: 'Projeler | Yasin Ateş',
    meta: [
      ...seo({
        title: 'Projeler | Yasin Ateş',
        description: 'Açık kaynak kodlu projelerim ve geliştirdiğim uygulamalar.',
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'projeler, açık kaynak, yazılım, uygulama, yasin ateş, developer, frontend'
      }),
    ],
    links: [{ rel: 'canonical', href: 'https://yasinates.com/projeler' }],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Projeler',
          url: 'https://yasinates.com/projeler',
          description: 'Açık kaynak kodlu projelerim ve geliştirdiğim uygulamalar.'
        })
      }
    ]
  }),
})
