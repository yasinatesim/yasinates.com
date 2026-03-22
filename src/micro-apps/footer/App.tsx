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
