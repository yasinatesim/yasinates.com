import { createFileRoute } from '@tanstack/react-router'
import { TuvixReactApp } from '@tuvix.js/react'
import { seo } from '~/utils/seo'
import ContactApp from '~/micro-apps/contact/App'
import { renderAngularToString } from '@tuvix.js/angular/server'
import { ContactComponent } from '~/micro-apps/contact/contact.component'

export const Route = createFileRoute('/iletisim')({
  loader: async () => ({
    ssrHtml: await renderAngularToString(ContactComponent, { selector: 'app-iletisim' }),
  }),
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
