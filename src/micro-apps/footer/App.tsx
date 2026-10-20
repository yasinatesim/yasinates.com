import { useEffect, useRef, useState } from 'react'
import FooterSvelte from './Footer.svelte'

type SvelteClass = new (opts: { target: HTMLElement; hydrate: boolean }) => { $destroy: () => void }

export default function FooterApp({ ssrHtml = '' }: { ssrHtml?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [innerHtml] = useState(() => ({ __html: ssrHtml }))

  useEffect(() => {
    if (!ref.current) return
    const component = new (FooterSvelte as unknown as SvelteClass)({
      target: ref.current,
      hydrate: Boolean(innerHtml.__html),
    })
    return () => component.$destroy()
  }, [])

  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={innerHtml}
      suppressHydrationWarning
    />
  )
}
