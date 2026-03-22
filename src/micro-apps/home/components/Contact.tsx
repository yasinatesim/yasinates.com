/**
 * React bridge — mounts the Vue 3 Contact component.
 * SSR HTML is pre-rendered by the home route loader via renderVueToString.
 * Client: uses createSSRApp to hydrate the existing SSR HTML.
 */
import { useEffect, useRef } from 'react'
import { createSSRApp } from 'vue'
import ContactVue from './Contact.vue'

export default function Contact({ ssrHtml = '' }: { ssrHtml?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const app = createSSRApp(ContactVue)
    app.mount(ref.current)
    return () => app.unmount()
  }, [])

  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{ __html: ssrHtml }}
      suppressHydrationWarning
    />
  )
}
