import { createFileRoute } from '@tanstack/react-router'
import { TuvixReactApp } from '@tuvix.js/react'
import { seo } from '~/utils/seo'
import ProjectsApp from '~/micro-apps/projects/App'

export const Route = createFileRoute('/projeler')({
  component: () => <TuvixReactApp name="projects-app" App={ProjectsApp} />,
  head: () => ({
    title: 'Projeler | Yasin Ateş',
    meta: [
      ...seo({
        title: 'Projeler | Yasin Ateş',
        description: 'Açık kaynak kodlu projelerim ve geliştirdiğim uygulamalar.',
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'projeler, açık kaynak, yazılım, uygulama, yasin ateş, developer, frontend'
      }),
      { name: 'canonical', content: 'https://yasinates.com/projeler' },
    ],
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
