import Lenis from 'lenis'
import { clamp, finePointer, lerp, prefersReducedMotion } from './util'
import type { Cleanup } from './util'

type ScrollSub = (scrollY: number, viewportHeight: number) => void

export type Motion = {
  onScroll: (fn: ScrollSub) => Cleanup
  scrollToTop: () => void
  setLocked: (locked: boolean) => void
  refresh: () => void
  halt: () => void
  destroy: () => void
}

const HYDRATION_WAIT_MS = 3000
const MAGNET_MAX = 4

function hasExpando(node: Element, prefix: string): boolean {
  for (const key of Object.keys(node)) {
    if (key.startsWith(prefix)) return true
  }
  return false
}

function isHydrated(el: Element): boolean {
  for (let node: Element | null = el; node; node = node.parentElement) {
    if ('__vue_app__' in node || '_vnode' in node || '__ngContext__' in node) return true
    if (hasExpando(node, '__reactFiber$')) return node === el
  }
  return true
}

export function createMotion(): Motion {
  const reduced = prefersReducedMotion()
  const fine = finePointer()
  const bootAt = performance.now()
  const listeners = new AbortController()
  const { signal } = listeners
  const subs = new Set<ScrollSub>()
  const cleanups: Cleanup[] = []
  let vh = window.innerHeight
  let vw = window.innerWidth
  let scheduled = false
  let scanQueued = 0
  let deferTimer = 0
  let deferred = false
  let lenisRaf = 0

  const flush = (): void => {
    scheduled = false
    const y = window.scrollY
    for (const fn of subs) fn(y, vh)
  }
  const schedule = (): void => {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(flush)
  }

  let lenis: Lenis | null = null
  if (!reduced) {
    const instance = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, anchors: { offset: -80 } })
    const raf = (t: number): void => {
      instance.raf(t)
      lenisRaf = requestAnimationFrame(raf)
    }
    lenisRaf = requestAnimationFrame(raf)
    instance.on('scroll', schedule)
    lenis = instance
  }
  window.addEventListener('scroll', schedule, { passive: true, signal })
  window.addEventListener(
    'resize',
    () => {
      vh = window.innerHeight
      vw = window.innerWidth
      schedule()
    },
    { signal },
  )

  const onScroll = (fn: ScrollSub): Cleanup => {
    subs.add(fn)
    fn(window.scrollY, vh)
    return () => {
      subs.delete(fn)
    }
  }

  const claim = (claimed: WeakSet<Element>, el: Element): boolean => {
    if (claimed.has(el)) return false
    if (performance.now() - bootAt < HYDRATION_WAIT_MS && !isHydrated(el)) {
      deferred = true
      return false
    }
    claimed.add(el)
    return true
  }

  const tiltIn = new Set<HTMLElement>()
  const tiltInClaimed = new WeakSet<Element>()
  cleanups.push(
    onScroll(() => {
      for (const el of tiltIn) {
        if (!el.isConnected) {
          tiltIn.delete(el)
          continue
        }
        const r = el.getBoundingClientRect()
        if (r.top > vh * 1.1 || r.bottom < -40) continue
        const p = clamp((vh - r.top) / (vh * 0.55))
        const e = 1 - (1 - p) ** 3
        el.style.transform = `translate3d(0, ${((1 - e) * 64).toFixed(1)}px, 0) rotateX(${((1 - e) * 16).toFixed(2)}deg) scale(${(0.94 + e * 0.06).toFixed(4)})`
        el.style.opacity = (0.15 + e * 0.85).toFixed(3)
      }
    }),
  )

  const parallax = new Set<HTMLElement>()
  const parallaxClaimed = new WeakSet<Element>()
  cleanups.push(
    onScroll(() => {
      for (const el of parallax) {
        const parent = el.parentElement
        if (!el.isConnected || !parent) {
          parallax.delete(el)
          continue
        }
        const r = parent.getBoundingClientRect()
        if (r.bottom < -200 || r.top > vh + 200) continue
        const k = parseFloat(el.dataset.parallax ?? '') || 0.1
        const offset = (r.top + r.height / 2 - vh / 2) * -k
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
      }
    }),
  )

  type Pan = { section: HTMLElement; track: HTMLElement; bar: HTMLElement | null; distance: number; pin: number }
  const pans = new Set<Pan>()
  const panClaimed = new WeakSet<Element>()
  const unpin = (pan: Pan): void => {
    pan.section.classList.remove('is-pinned')
    pan.section.style.height = ''
    pan.track.style.transform = ''
    if (pan.bar) pan.bar.style.transform = ''
  }
  const measurePan = (pan: Pan): void => {
    if (reduced) return unpin(pan)
    pan.section.classList.add('is-pinned')
    const sticky = pan.section.firstElementChild
    if (sticky instanceof HTMLElement && sticky.scrollHeight > sticky.clientHeight + 1) return unpin(pan)
    pan.pin = sticky instanceof HTMLElement ? sticky.offsetHeight : vh
    const prev = pan.track.style.transform
    pan.track.style.transform = ''
    const left = pan.track.getBoundingClientRect().left
    pan.track.style.transform = prev
    pan.distance = Math.max(0, Math.ceil(left + pan.track.scrollWidth - vw + 48))
    pan.section.style.height = `${pan.pin + pan.distance}px`
  }
  const measurePans = (): void => {
    for (const pan of pans) {
      if (pan.section.isConnected) measurePan(pan)
      else pans.delete(pan)
    }
    schedule()
  }
  window.addEventListener('resize', measurePans, { signal })
  window.addEventListener('load', measurePans, { signal })
  cleanups.push(
    onScroll(() => {
      for (const pan of pans) {
        if (!pan.section.classList.contains('is-pinned')) continue
        const r = pan.section.getBoundingClientRect()
        const p = clamp(-r.top / Math.max(1, r.height - pan.pin))
        pan.track.style.transform = `translate3d(${(-p * pan.distance).toFixed(1)}px, 0, 0)`
        if (pan.bar) pan.bar.style.transform = `scaleX(${p.toFixed(4)})`
      }
    }),
  )

  const stacks = new Set<HTMLElement>()
  const stackClaimed = new WeakSet<Element>()
  const stackQuery = window.matchMedia('(min-width: 861px)')
  // Below 861px the stack is enabled from here (desktop is pure CSS). A card taller than the space under its
  // sticky offset sticks by its bottom edge instead, so it is fully readable before the next card covers it.
  const measureStack = (stack: HTMLElement): void => {
    const cards = Array.from(stack.querySelectorAll<HTMLElement>('[data-stack-card]'))
    for (const card of cards) card.style.top = ''
    const mobile = !stackQuery.matches && cards.length > 1
    stack.classList.toggle('is-stacked', mobile)
    if (!mobile) return
    const view = Math.min(vh, document.documentElement.clientHeight)
    const tops = cards.map((card) => Math.min(parseFloat(getComputedStyle(card).top) || 0, view - card.offsetHeight))
    cards.forEach((card, i) => {
      card.style.top = `${Math.floor(tops[i])}px`
    })
  }
  const measureStacks = (): void => {
    for (const stack of stacks) {
      if (stack.isConnected) measureStack(stack)
      else stacks.delete(stack)
    }
    schedule()
  }
  // innerHeight changes while the iOS toolbar slides; clientHeight and width only change on real resizes.
  let stackWidth = vw
  let stackHeight = document.documentElement.clientHeight
  window.addEventListener(
    'resize',
    () => {
      const height = document.documentElement.clientHeight
      if (window.innerWidth === stackWidth && height === stackHeight) return
      stackWidth = window.innerWidth
      stackHeight = height
      measureStacks()
    },
    { signal },
  )
  window.addEventListener('load', measureStacks, { signal })
  cleanups.push(
    onScroll(() => {
      for (const stack of stacks) {
        if (!stack.isConnected) {
          stacks.delete(stack)
          continue
        }
        const cards = Array.from(stack.querySelectorAll<HTMLElement>('[data-stack-card]'))
        for (let i = 0; i < cards.length; i++) {
          const inner = cards[i].firstElementChild
          if (!(inner instanceof HTMLElement)) continue
          const next = cards[i + 1]
          if (!next || !(stackQuery.matches || stack.classList.contains('is-stacked'))) {
            inner.style.transform = ''
            inner.style.filter = ''
            inner.style.opacity = ''
            continue
          }
          const stickTop = parseFloat(getComputedStyle(cards[i]).top) || 0
          const nextTop = next.getBoundingClientRect().top
          const p = clamp(1 - (nextTop - stickTop) / (vh * 0.85))
          const depth = cards.length - 1 - i
          inner.style.transform = `translate3d(0, ${(-p * 18).toFixed(1)}px, 0) scale(${(1 - p * (0.05 + Math.min(depth, 3) * 0.012)).toFixed(4)})`
          if (document.documentElement.dataset.theme === 'light') {
            inner.style.filter = ''
            inner.style.opacity = p > 0.01 ? (1 - p * 0.3).toFixed(3) : ''
          } else {
            inner.style.filter = p > 0.01 ? `blur(${(p * 3).toFixed(2)}px) brightness(${(1 - p * 0.38).toFixed(3)})` : ''
            inner.style.opacity = ''
          }
        }
      }
    }),
  )
  stackQuery.addEventListener('change', measureStacks, { signal })

  const magneticClaimed = new WeakSet<Element>()
  const tiltClaimed = new WeakSet<Element>()
  const spotClaimed = new WeakSet<Element>()

  const scan = (): void => {
    scanQueued = 0
    deferred = false
    window.__sgReveal?.scan()

    if (!reduced) {
      document.querySelectorAll<HTMLElement>('[data-stack]').forEach((el) => {
        if (!claim(stackClaimed, el)) return
        stacks.add(el)
        measureStack(el)
        const ro = new ResizeObserver(() => measureStack(el))
        ro.observe(el)
        cleanups.push(() => ro.disconnect())
      })
      document.querySelectorAll<HTMLElement>('[data-tilt-in]').forEach((el) => {
        if (claim(tiltInClaimed, el)) tiltIn.add(el)
      })
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        if (claim(parallaxClaimed, el)) parallax.add(el)
      })
    }

    document.querySelectorAll<HTMLElement>('[data-pan]').forEach((section) => {
      const track = section.querySelector<HTMLElement>('[data-pan-track]')
      if (!track || !claim(panClaimed, section)) return
      const pan: Pan = { section, track, bar: section.querySelector<HTMLElement>('[data-pan-progress]'), distance: 0, pin: vh }
      pans.add(pan)
      measurePan(pan)
      const ro = new ResizeObserver(() => measurePan(pan))
      ro.observe(track)
      cleanups.push(() => ro.disconnect())
    })

    if (!reduced && fine) {
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        if (!claim(magneticClaimed, el)) return
        const label = el.querySelector<HTMLElement>('[data-magnetic-label]')
        const strength = parseFloat(el.dataset.magnetic ?? '') || 0.35
        el.addEventListener(
          'pointermove',
          (e) => {
            const r = el.getBoundingClientRect()
            const nx = clamp(((e.clientX - r.left) / r.width - 0.5) * 2, -1, 1)
            const ny = clamp(((e.clientY - r.top) / r.height - 0.5) * 2, -1, 1)
            const k = Math.min(1, strength / 0.35)
            el.style.transform = `translate3d(${(nx * MAGNET_MAX * k).toFixed(1)}px, ${(ny * MAGNET_MAX * k - 1).toFixed(1)}px, 0)`
            if (label) {
              label.style.transform = `translate3d(${(nx * 2 * k).toFixed(1)}px, ${(ny * 1 * k).toFixed(1)}px, 0)`
            }
          },
          { passive: true, signal },
        )
        el.addEventListener(
          'pointerleave',
          () => {
            el.style.transform = ''
            if (label) label.style.transform = ''
          },
          { signal },
        )
      })

      document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
        if (!claim(tiltClaimed, el)) return
        const max = parseFloat(el.dataset.tilt ?? '') || 8
        const glare = el.querySelector<HTMLElement>('[data-glare]')
        let raf = 0
        let tx = 0
        let ty = 0
        let cx = 0
        let cy = 0
        const loop = (): void => {
          cx = lerp(cx, tx, 0.14)
          cy = lerp(cy, ty, 0.14)
          el.style.transform = `perspective(900px) rotateX(${(-cy * max).toFixed(2)}deg) rotateY(${(cx * max).toFixed(2)}deg)`
          if (glare) glare.style.transform = `translate3d(${(cx * 60).toFixed(1)}%, ${(cy * 60).toFixed(1)}%, 0)`
          raf = Math.abs(cx - tx) + Math.abs(cy - ty) > 0.001 ? requestAnimationFrame(loop) : 0
        }
        const kick = (): void => {
          if (!raf) raf = requestAnimationFrame(loop)
        }
        el.addEventListener(
          'pointermove',
          (e) => {
            const r = el.getBoundingClientRect()
            tx = ((e.clientX - r.left) / r.width - 0.5) * 2
            ty = ((e.clientY - r.top) / r.height - 0.5) * 2
            kick()
          },
          { passive: true, signal },
        )
        el.addEventListener(
          'pointerleave',
          () => {
            tx = 0
            ty = 0
            kick()
          },
          { signal },
        )
      })
    }

    if (fine) {
      document.querySelectorAll<HTMLElement>('[data-spot]').forEach((el) => {
        if (!claim(spotClaimed, el)) return
        el.addEventListener(
          'pointermove',
          (e) => {
            const r = el.getBoundingClientRect()
            const x = Math.round(e.clientX - r.left)
            const y = Math.round(e.clientY - r.top)
            el.style.setProperty('--mx', `${x}px`)
            el.style.setProperty('--my', `${y}px`)
            const spot = el.querySelector<HTMLElement>(':scope > .spot')
            if (spot) spot.style.transform = `translate3d(${x}px, ${y}px, 0)`
          },
          { passive: true, signal },
        )
      })
    }

    if (deferred && !deferTimer) {
      deferTimer = window.setTimeout(() => {
        deferTimer = 0
        scan()
      }, 120)
    }
  }
  scan()

  const mo = new MutationObserver((records) => {
    if (scanQueued || !records.some((r) => r.addedNodes.length > 0)) return
    scanQueued = requestAnimationFrame(scan)
  })
  mo.observe(document.body, { childList: true, subtree: true })

  return {
    onScroll,
    scrollToTop() {
      if (lenis) lenis.scrollTo(0, { duration: 1.4 })
      else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
    },
    setLocked(locked) {
      if (!lenis) return
      if (locked) lenis.stop()
      else lenis.start()
    },
    halt() {
      if (!lenis || lenis.isStopped) return
      lenis.stop()
      lenis.start()
    },
    refresh() {
      lenis?.resize()
      scan()
      measurePans()
    },
    destroy() {
      mo.disconnect()
      listeners.abort()
      for (const fn of cleanups) fn()
      subs.clear()
      tiltIn.clear()
      parallax.clear()
      stacks.clear()
      pans.clear()
      clearTimeout(deferTimer)
      cancelAnimationFrame(scanQueued)
      cancelAnimationFrame(lenisRaf)
      lenis?.destroy()
    },
  }
}
