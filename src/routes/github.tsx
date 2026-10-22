import { createFileRoute } from '@tanstack/react-router'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { TuvixReactApp } from '@tuvix.js/react'
import { seo } from '~/utils/seo'
import GithubApp from '~/micro-apps/github/App'
import { fetchAllGithubRepos, GITHUB_REPOS_QUERY_KEY } from '~/hooks/useGithubRepos'

export const Route = createFileRoute('/github')({
  // Prefetch so SSR doesn't suspend: crawlers and visitors then get the same HTML, which the CDN cache relies on.
  loader: async () => {
    const qc = new QueryClient()
    try {
      qc.setQueryData(GITHUB_REPOS_QUERY_KEY, await fetchAllGithubRepos())
    } catch (e: unknown) {
      // GitHub unreachable or rate limited: the list loads on the client instead.
    }
    return { dehydratedState: dehydrate(qc) }
  },
  component: () => {
    const { dehydratedState } = Route.useLoaderData()
    return <TuvixReactApp name="github-app" App={GithubApp} dehydratedState={dehydratedState} />
  },
  head: () => ({
    meta: [
      ...seo({
        title: 'GitHub Projeleri | Yasin Ateş',
        url: 'https://yasinates.com/github',
        description: 'Açık kaynak kodlu tüm GitHub projelerim ve detayları.',
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'github, açık kaynak, yazılım, proje, yasin ateş, developer, frontend'
      }),
    ],
    links: [{ rel: 'canonical', href: 'https://yasinates.com/github' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'GitHub Projeleri',
          url: 'https://yasinates.com/github',
          description: 'Açık kaynak kodlu tüm GitHub projelerim ve detayları.'
        })
      }
    ]
  }),
})
