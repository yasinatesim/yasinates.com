import { createFileRoute } from '@tanstack/react-router'
import { TuvixReactApp } from '@tuvix.js/react'
import { seo } from '~/utils/seo'
import ContactApp from '~/micro-apps/contact/App'

export const Route = createFileRoute('/iletisim')({
  // Angular JIT crashes Nitro SSR — bootstraps client-side only (page is not SEO-critical)
  loader: async () => ({ ssrHtml: '' }),
  head: () => ({
    title: 'İletişim | Yasin Ateş',
    meta: [
      ...seo({
        title: 'İletişim | Yasin Ateş',
        description: 'Yasin Ateş ile iletişime geçmek için e-posta ve sosyal medya hesapları.',
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'iletişim, e-posta, sosyal medya, yasin ateş, frontend, developer'
      }),
      { name: 'canonical', content: 'https://yasinates.com/iletisim' },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'İletişim',
          url: 'https://yasinates.com/iletisim',
          description: 'Yasin Ateş ile iletişime geçmek için e-posta ve sosyal medya hesapları.'
        })
      }
    ]
  }),
  component: () => {
    const { ssrHtml } = Route.useLoaderData()
    return <TuvixReactApp name="contact-app" App={ContactApp} ssrHtml={ssrHtml} />
  },
})
