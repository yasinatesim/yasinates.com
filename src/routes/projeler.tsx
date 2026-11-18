import { createFileRoute } from '@tanstack/react-router'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { TuvixReactApp } from '@tuvix.js/react'
import { seo } from '~/utils/seo'
import ProjectsApp from '~/micro-apps/projects/App'
import { fetchYoutubeVideos, YOUTUBE_QUERY_KEY } from '~/utils/fetchYoutubeVideos'
import { fetchAllGithubRepos, GITHUB_REPOS_QUERY_KEY } from '~/hooks/useGithubRepos'

export const Route = createFileRoute('/projeler')({
  loader: async () => {
    const qc = new QueryClient()
    await Promise.allSettled([
      fetchYoutubeVideos().then((videos) => qc.setQueryData(YOUTUBE_QUERY_KEY, videos)),
      fetchAllGithubRepos().then((repos) => qc.setQueryData(GITHUB_REPOS_QUERY_KEY, repos)),
    ])
    return { dehydratedState: dehydrate(qc) }
  },
  component: () => {
    const { dehydratedState } = Route.useLoaderData()
    return <TuvixReactApp name="projects-app" App={ProjectsApp} dehydratedState={dehydratedState} />
  },
  head: () => ({
    meta: [
      ...seo({
        title: 'Projeler | Yasin Ateş',
        url: 'https://yasinates.com/projeler',
        description: 'Açık kaynak kodlu projelerim ve geliştirdiğim uygulamalar.',
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'projeler, açık kaynak, yazılım, uygulama, yasin ateş, developer, frontend'
      }),
    ],
    links: [{ rel: 'canonical', href: 'https://yasinates.com/projeler' }],
    scripts: [
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
