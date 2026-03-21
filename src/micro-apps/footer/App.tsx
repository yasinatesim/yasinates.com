/**
 * React bridge — mounts the Svelte Footer component.
 * SSR HTML is pre-rendered by the root route loader via renderSvelteToString.
 * Client: mounts with hydrate:true so Svelte reuses server-rendered HTML.
 */
import { useEffect, useRef } from 'react'
import FooterSvelte from './Footer.svelte'

type SvelteClass = new (opts: { target: HTMLElement; hydrate: boolean }) => { $destroy: () => void }

export default function FooterApp({ ssrHtml = '' }: { ssrHtml?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const component = new (FooterSvelte as unknown as SvelteClass)({
      target: ref.current,
      hydrate: Boolean(ssrHtml),
    })
    return () => component.$destroy()
  }, [])

  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{ __html: ssrHtml }}
      suppressHydrationWarning
    />
  )
}
