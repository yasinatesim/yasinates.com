import { useEffect, useRef, useState } from 'react'
import { createSSRApp } from 'vue'
import ContactVue from './Contact.vue'

export default function Contact({ ssrHtml = '' }: { ssrHtml?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [innerHtml] = useState(() => ({ __html: ssrHtml }))

  useEffect(() => {
    if (!ref.current) return
    const app = createSSRApp(ContactVue)
    app.mount(ref.current)
    return () => app.unmount()
  }, [])

  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={innerHtml}
      suppressHydrationWarning
    />
  )
}
