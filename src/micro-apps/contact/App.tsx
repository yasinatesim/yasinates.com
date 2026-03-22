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
