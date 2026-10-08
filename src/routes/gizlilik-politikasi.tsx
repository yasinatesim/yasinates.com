import { createFileRoute } from '@tanstack/react-router'
import { TuvixReactApp } from '@tuvix.js/react'
import { seo } from '~/utils/seo'
import LegalApp from '~/micro-apps/legal/App'

export const Route = createFileRoute('/gizlilik-politikasi')({
  component: () => <TuvixReactApp name="legal-app" App={LegalApp} page="privacy" />,
  head: () => ({
    meta: [
      ...seo({
        title: 'Gizlilik Politikası | Yasin Ateş',
        description: 'yasinates.com gizlilik politikası: çerezler, Google AdSense reklamları, üçüncü taraf hizmetler ve KVKK kapsamındaki haklarınız.',
      }),
    ],
    links: [{ rel: 'canonical', href: 'https://yasinates.com/gizlilik-politikasi' }],
  }),
})
