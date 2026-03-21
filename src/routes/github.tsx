import { createFileRoute } from '@tanstack/react-router'
import { TuvixReactApp } from '@tuvix.js/react'
import { seo } from '~/utils/seo'
import GithubApp from '~/micro-apps/github/App'

export const Route = createFileRoute('/github')({
  component: () => <TuvixReactApp name="github-app" App={GithubApp} />,
  head: () => ({
    title: 'GitHub Projeleri | Yasin Ateş',
    meta: [
      ...seo({
        title: 'GitHub Projeleri | Yasin Ateş',
        description: 'Açık kaynak kodlu tüm GitHub projelerim ve detayları.',
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'github, açık kaynak, yazılım, proje, yasin ateş, developer, frontend'
      }),
      { name: 'canonical', content: 'https://yasinates.com/github' },
    ],
    script: [
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
