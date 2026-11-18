import { VERSION as NG_COMPILER_VERSION } from '@angular/compiler'
import { useEffect, useRef, useState } from 'react'
import { NgZone, ɵNoopNgZone as NoopNgZone } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { ContactComponent } from './contact.component'
import { markAdReady } from '../_shared/ads/runtime'

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
      // Angular renders its own copy of the markup, so the ad slot is ready only now.
      container.querySelectorAll('ins.adsbygoogle').forEach(markAdReady)
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
