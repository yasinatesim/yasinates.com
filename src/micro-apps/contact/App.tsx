/**
 * React bridge — bootstraps the Angular standalone ContactComponent.
 * SSR HTML is pre-rendered by the iletisim route loader via renderAngularToString.
 * Client: bootstraps Angular with provideClientHydration() for SSR hydration.
 */
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

    // Reuse SSR-rendered selector element if present, otherwise create fresh
    const host: Element =
      container.querySelector('app-iletisim') ??
      (() => {
        const el = document.createElement('app-iletisim')
        container.appendChild(el)
        return el
      })()

    void host // used by Angular to find bootstrap target
    bootstrapApplication(ContactComponent, {
      providers: [provideClientHydration()],
    }).then(app => {
      appRef = app
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
