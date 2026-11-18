import { ADSENSE_CLIENT } from './config'

type AdRequest = { element: HTMLElement }
// A plain array until adsbygoogle.js loads and replaces it with an object that serves each push.
type AdsQueue = { push: (request: AdRequest) => unknown }

declare global {
  interface Window {
    adsbygoogle?: AdsQueue
  }
}

const SCRIPT_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`
// Ad block recovery (AdSense → Gizlilik ve mesajlaşma → Reklam engellemeyi geri alma): asks ad-blocking visitors to
// allow ads. Google's tag pairs the script with a hidden `googlefcPresent` iframe that tells it the tag is installed.
const FUNDING_CHOICES_SRC = `https://fundingchoicesmessages.google.com/i/${ADSENSE_CLIENT.replace('ca-', '')}?ers=1`
const QUEUED = 'data-ad-queued'
const READY = 'data-ad-ready'

// The framework that owns an `ins` calls this once it has mounted (hydrated) it. Filling a slot earlier would put
// Google's iframe into markup React may still hydrate (e.g. inside a Suspense boundary) and force a client re-render.
export function markAdReady(ins: Element): void {
  ins.setAttribute(READY, '')
}

export function adsScriptLoaded(): boolean {
  return document.querySelector('script[src*="adsbygoogle.js"]') !== null
}

// Loads adsbygoogle.js once and requests an ad for every ready `ins.adsbygoogle`, whichever framework rendered it.
// Each request names its element, so a slot without a box yet (hidden, or in a collapsed container) is skipped without
// shifting the queue onto another slot; it is requested once it gets one (checked again on resize).
export function startAds(): () => void {
  if (!adsScriptLoaded()) {
    const script = document.createElement('script')
    script.async = true
    script.crossOrigin = 'anonymous'
    script.src = SCRIPT_SRC
    // Blocked script: drop the reserved boxes instead of leaving empty frames.
    script.addEventListener('error', () => document.documentElement.classList.add('ads-off'))
    document.head.append(script)

    const recovery = document.createElement('script')
    recovery.async = true
    recovery.src = FUNDING_CHOICES_SRC
    document.head.append(recovery)
    const signal = document.createElement('iframe')
    signal.name = 'googlefcPresent'
    signal.hidden = true
    signal.setAttribute('aria-hidden', 'true')
    document.body.append(signal)
  }

  const fill = () => {
    const queue = (window.adsbygoogle ??= [] as AdRequest[])
    document.querySelectorAll<HTMLElement>(`ins.adsbygoogle[${READY}]:not([${QUEUED}])`).forEach((ins) => {
      if (ins.getClientRects().length === 0) return
      ins.setAttribute(QUEUED, '')
      queue.push({ element: ins })
    })
  }

  let resizeTimer = 0
  const onResize = () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(fill, 200)
  }

  const observer = new MutationObserver(fill)
  observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: [READY] })
  window.addEventListener('resize', onResize, { passive: true })
  fill()

  return () => {
    observer.disconnect()
    window.removeEventListener('resize', onResize)
    window.clearTimeout(resizeTimer)
  }
}
