import { VERSION as NG_COMPILER_VERSION } from '@angular/compiler'
import { useEffect, useRef, useState } from 'react'
import { NgZone, ɵNoopNgZone as NoopNgZone } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { ContactComponent } from './contact.component'

export default function ContactApp({ ssrHtml = '' }: { ssrHtml?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [innerHtml] = useState(() => ({ __html: ssrHtml }))

  useEffect(() => {
    if (!ref.current || !NG_COMPILER_VERSION.full) return
    const container = ref.current
    let appRef: { destroy: () => void } | undefined

    if (!container.querySelector('app-iletisim')) {
      container.appendChild(document.createElement('app-iletisim'))
    }

    bootstrapApplication(ContactComponent, {
      providers: [{ provide: NgZone, useClass: NoopNgZone }],
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
      dangerouslySetInnerHTML={innerHtml}
      suppressHydrationWarning
    />
  )
}
