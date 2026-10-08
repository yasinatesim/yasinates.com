import { createFileRoute } from '@tanstack/react-router'
import { TuvixReactApp } from '@tuvix.js/react'
import { seo } from '~/utils/seo'
import LegalApp from '~/micro-apps/legal/App'

export const Route = createFileRoute('/kullanim-kosullari')({
  component: () => <TuvixReactApp name="legal-app" App={LegalApp} page="terms" />,
  head: () => ({
    meta: [
      ...seo({
        title: 'Kullanım Koşulları | Yasin Ateş',
        description: 'yasinates.com kullanım koşulları: içerik kullanımı, fikri mülkiyet, dış bağlantılar ve reklamlar.',
      }),
    ],
    links: [{ rel: 'canonical', href: 'https://yasinates.com/kullanim-kosullari' }],
  }),
})
