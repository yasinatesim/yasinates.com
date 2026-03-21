import { createFileRoute } from '@tanstack/react-router'
import { TuvixReactApp } from '@tuvix.js/react'
import { seo } from '~/utils/seo'
import AboutApp from '~/micro-apps/about/App'

export const Route = createFileRoute('/hakkimda')({
  component: () => <TuvixReactApp name="about-app" App={AboutApp} />,
  head: () => ({
    title: 'Hakkımda | Yasin Ateş',
    meta: [
      ...seo({
        title: 'Hakkımda | Yasin Ateş',
        description: 'Yasin Ateş hakkında bilgiler, deneyimler ve kullandığı teknolojiler.',
        image: 'https://yasinates.com/yasin-ates-hakkimda.jpg',
        keywords: 'hakkımda, frontend, developer, yasin ateş, deneyim, teknoloji'
      }),
      { name: 'canonical', content: 'https://yasinates.com/hakkimda' },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Yasin Ateş',
          url: 'https://yasinates.com/hakkimda',
          jobTitle: 'Frontend Developer',
          image: 'https://yasinates.com/yasin-ates-hakkimda.jpg',
          description: 'Frontend geliştirici, web teknolojileri ve müzik ile ilgilenen yazılımcı.'
        })
      }
    ]
  }),
})
