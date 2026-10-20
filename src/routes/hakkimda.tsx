import { createFileRoute } from '@tanstack/react-router'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { TuvixReactApp } from '@tuvix.js/react'
import { PERSON_LD, seo } from '~/utils/seo'
import AboutApp from '~/micro-apps/about/App'
import { fetchYoutubeVideos, YOUTUBE_QUERY_KEY } from '~/utils/fetchYoutubeVideos'
import { fetchDevtoPosts } from '~/utils/fetchBlogPosts'
import { getMediumPosts } from '~/utils/getMediumPosts'
import { fetchAllGithubRepos, GITHUB_REPOS_QUERY_KEY } from '~/hooks/useGithubRepos'

export const Route = createFileRoute('/hakkimda')({
  loader: async () => {
    const qc = new QueryClient()
    const [medium, devto] = await Promise.allSettled([
      getMediumPosts(),
      fetchDevtoPosts(),
      fetchYoutubeVideos().then((videos) => qc.setQueryData(YOUTUBE_QUERY_KEY, videos)),
      fetchAllGithubRepos().then((repos) => qc.setQueryData(GITHUB_REPOS_QUERY_KEY, repos)),
    ])
    const lists = [medium, devto].flatMap((r) => (r.status === 'fulfilled' && Array.isArray(r.value) ? [r.value] : []))
    const postCount = lists.length > 0 ? lists.reduce((sum, list) => sum + list.length, 0) : null
    return { dehydratedState: dehydrate(qc), postCount }
  },
  component: () => {
    const { dehydratedState, postCount } = Route.useLoaderData()
    return <TuvixReactApp name="about-app" App={AboutApp} dehydratedState={dehydratedState} postCount={postCount} />
  },
  head: () => ({
    meta: [
      ...seo({
        title: 'Hakkımda | Yasin Ateş',
        url: 'https://yasinates.com/hakkimda',
        description: 'Yasin Ateş hakkında bilgiler, deneyimler ve kullandığı teknolojiler.',
        image: 'https://yasinates.com/yasin-ates-hakkimda.jpg',
        keywords: 'hakkımda, frontend, developer, yasin ateş, deneyim, teknoloji'
      }),
    ],
    links: [{ rel: 'canonical', href: 'https://yasinates.com/hakkimda' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url: 'https://yasinates.com/hakkimda',
          inLanguage: 'tr-TR',
          mainEntity: PERSON_LD,
        }),
      }
    ]
  }),
})
