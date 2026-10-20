export type RevealEngine = { scan: () => void }

declare global {
  interface Window {
    __sgReveal?: RevealEngine
  }
}

type RevealTarget = { el: Element; order: number }

export function installReveal(): void {
  const supported =
    'IntersectionObserver' in window &&
    typeof document.documentElement.animate === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!supported) {
    window.__sgReveal = { scan: () => {} }
    return
  }

  const EASING = 'cubic-bezier(0.23, 1, 0.32, 1)'
  const DURATION_MS = 900
  const STAGGER_MS = 70
  const FOLD_RATIO = 0.92
  const HIDDEN: Keyframe = { opacity: 0, transform: 'translate3d(0, 26px, 0)' }
  const SHOWN: Keyframe = { opacity: 1, transform: 'translate3d(0, 0, 0)' }

  const bound = new WeakSet<Element>()
  const holds = new WeakMap<Element, Animation>()

  const targetsOf = (container: Element): RevealTarget[] => {
    const self = container.hasAttribute('data-rv-self') ? [{ el: container, order: 0 }] : []
    const children = [...container.querySelectorAll('[data-rv]')]
      .filter((el) => el.closest('[data-reveal]') === container)
      .map((el, order) => ({ el, order }))
    return [...self, ...children]
  }

  const reveal = (container: Element): void => {
    for (const { el, order } of targetsOf(container)) {
      const hold = holds.get(el)
      if (!hold) continue
      holds.delete(el)
      hold.cancel()
      el.animate([HIDDEN, SHOWN], { duration: DURATION_MS, delay: order * STAGGER_MS, easing: EASING, fill: 'backwards' })
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer.unobserve(entry.target)
        reveal(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )

  const scan = (): void => {
    const fold = window.innerHeight * FOLD_RATIO
    for (const container of document.querySelectorAll('[data-reveal]')) {
      if (bound.has(container)) continue
      bound.add(container)
      let held = false
      for (const { el } of targetsOf(container)) {
        const rect = el.getBoundingClientRect()
        const belowFold = rect.top >= fold && (rect.width > 0 || rect.height > 0)
        if (!belowFold) continue
        holds.set(el, el.animate([HIDDEN, HIDDEN], { duration: 1, fill: 'forwards' }))
        held = true
      }
      if (held) observer.observe(container)
    }
  }

  window.__sgReveal = { scan }
  scan()
}

export const REVEAL_SCRIPT = `(${installReveal.toString()})()`
