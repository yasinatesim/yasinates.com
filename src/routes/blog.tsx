import { createFileRoute } from '@tanstack/react-router'
import { TuvixReactApp } from '@tuvix.js/react'
import BlogListApp from '~/micro-apps/blog-list/App'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/blog')({
  component: () => <TuvixReactApp name="blog-list-app" App={BlogListApp} />,
  head: () => ({
    title: 'Blog | Yasin Ateş',
    meta: [
      ...seo({
        title: 'Blog | Yasin Ateş',
        description: 'Frontend geliştirme, web teknolojileri ve müzik üzerine blog yazılarım.',
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'frontend, yazılım, web, müzik, blog, yasin ateş, developer, react, proje'
      }),
      { name: 'canonical', content: 'https://yasinates.com/blog' },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Yasin Ateş Blog',
          url: 'https://yasinates.com/blog',
          description: 'Frontend geliştirme, web teknolojileri ve müzik üzerine blog yazıları.'
        })
      }
    ]
  }),
})
