import { useEffect, useRef } from 'react'
import 'zone.js'
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser'
import { ContactComponent } from './contact.component'

export default function ContactApp({ ssrHtml = '' }: { ssrHtml?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const container = ref.current
    let appRef: { destroy: () => void } | undefined

    if (!container.querySelector('app-iletisim')) {
      container.appendChild(document.createElement('app-iletisim'))
    }

    bootstrapApplication(ContactComponent, {
      providers: [provideClientHydration()],
    }).then(app => {
      appRef = app
    }).catch((e: unknown) => {
      if (e instanceof Error) console.error('[ContactApp] Angular bootstrap failed:', e.message)
    })

    return () => {
      appRef?.destroy()
      container.innerHTML = ''
    }
  }, [])

  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{ __html: ssrHtml }}
      suppressHydrationWarning
    />
  )
}
