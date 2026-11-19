import { ADSENSE_CLIENT, HOUSE_PROMOS } from './config'

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
const COLLAPSED = 'data-ad-collapsed'
const ADS_OFF = 'ads-off'

// The framework that owns an `ins` calls this once it has mounted (hydrated) it. Filling a slot earlier would put
// Google's iframe into markup React may still hydrate (e.g. inside a Suspense boundary) and force a client re-render.
export function markAdReady(ins: Element): void {
  ins.setAttribute(READY, '')
}

export function adsScriptLoaded(): boolean {
  return document.querySelector('script[src*="adsbygoogle.js"]') !== null
}

let housesShown = 0

// AdSense keeps the size of an unfilled unit on screen and collapses only the ones off screen, so the page never moves
// in front of the reader (support.google.com/adsense/answer/10762946). Same here, for unfilled slots and for every slot
// once the ad script is blocked: a slot still below the viewport collapses (only content further down moves); one on
// or above it keeps its reserved box and shows one of the site's own pages there, as that help page suggests. Rails
// are fixed, so they never move content; app.css just hides them.
function settleEmptySlot(slot: Element): void {
  if (slot.classList.contains('ad-rail') || slot.hasAttribute(COLLAPSED)) return
  const box = slot.querySelector('.ad-slot__box')
  if (!box || box.querySelector('.ad-slot__house')) return
  if (slot.getBoundingClientRect().top >= window.innerHeight) {
    slot.setAttribute(COLLAPSED, '')
    return
  }
  const promos = HOUSE_PROMOS.filter((promo) => promo.href !== window.location.pathname)
  const promo = promos[housesShown++ % promos.length]
  const link = document.createElement('a')
  link.className = 'ad-slot__house'
  link.href = promo.href
  const parts = [
    { className: 'ad-slot__house-kicker micro', text: 'yasinates.com' },
    { className: 'ad-slot__house-title', text: promo.title },
    { className: 'ad-slot__house-text', text: promo.text },
    { className: 'ad-slot__house-cta', text: `${promo.cta} →` },
  ]
  for (const { className, text } of parts) {
    const span = document.createElement('span')
    span.className = className
    span.textContent = text
    link.append(span)
  }
  box.append(link)
}

function settleReadySlots(): void {
  document.querySelectorAll(`ins.adsbygoogle[${READY}]`).forEach((ins) => {
    const slot = ins.closest('.ad-slot')
    if (slot) settleEmptySlot(slot)
  })
}

// Loads adsbygoogle.js once and requests an ad for every ready `ins.adsbygoogle`, whichever framework rendered it, once
// it comes within three screens of the viewport. Google answers in a second or two, so most slots are settled (filled,
// or collapsed while still below the viewport) before the reader gets to them, and far-away slots don't spend the
// page's ad budget. Each request names its element; a slot without a box (hidden by a media query) never intersects,
// so it is requested only once it is shown.
export function startAds(): () => void {
  if (!adsScriptLoaded()) {
    const script = document.createElement('script')
    script.async = true
    script.crossOrigin = 'anonymous'
    script.src = SCRIPT_SRC
    script.addEventListener('error', () => {
      document.documentElement.classList.add(ADS_OFF)
      settleReadySlots()
    })
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

  const root = document.documentElement

  const nearViewport = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const ins = entry.target
        if (!entry.isIntersecting || !(ins instanceof HTMLElement)) continue
        nearViewport.unobserve(ins)
        ins.setAttribute(QUEUED, '')
        // Read at push time: adsbygoogle.js replaces the plain array once it loads.
        const queue = (window.adsbygoogle ??= [] as AdRequest[])
        queue.push({ element: ins })
      }
    },
    { rootMargin: '300% 0px' },
  )
  // Slots never scrolled near stay observed; release the ones a navigation removed so their old page can be freed.
  const watched = new Set<Element>()
  const fill = () => {
    if (root.classList.contains(ADS_OFF)) {
      settleReadySlots()
      return
    }
    for (const ins of watched) {
      if (ins.isConnected && !ins.hasAttribute(QUEUED)) continue
      nearViewport.unobserve(ins)
      watched.delete(ins)
    }
    document.querySelectorAll<HTMLElement>(`ins.adsbygoogle[${READY}]:not([${QUEUED}])`).forEach((ins) => {
      if (watched.has(ins)) return
      watched.add(ins)
      nearViewport.observe(ins)
    })
  }

  // Google's bottom anchor ad (auto ads) covers the bottom of the viewport. `--anchor-h` tells fixed page elements
  // (gutter rails, toast) how much of it is covered, so they stay above it instead of under it.
  let anchor: HTMLElement | null = null
  const syncAnchor = () => {
    const box = anchor?.getBoundingClientRect()
    const covered = box && box.height > 0 && box.top < window.innerHeight ? Math.ceil(window.innerHeight - box.top) : 0
    root.style.setProperty('--anchor-h', `${covered}px`)
  }
  const anchorResize = new ResizeObserver(syncAnchor)
  const anchorChange = new MutationObserver(syncAnchor)
  const findAnchor = () => {
    const found = document.querySelector<HTMLElement>('ins.adsbygoogle[data-anchor-status]')
    if (found && found !== anchor) {
      anchor = found
      anchorResize.observe(found)
      anchorChange.observe(found, { attributes: true })
      // Collapsing/expanding the anchor slides it with a transform, so measure again once that settles.
      found.addEventListener('transitionend', syncAnchor)
    }
    syncAnchor()
  }
  // The anchor is appended straight to <body>.
  const bodyChildren = new MutationObserver(findAnchor)
  bodyChildren.observe(document.body, { childList: true })

  let resizeTimer = 0
  const onResize = () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(syncAnchor, 200)
  }

  // Slots become ready via `data-ad-ready` and get `data-ad-status` from Google; the anchor may get
  // `data-anchor-status` only after it was appended.
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.attributeName !== 'data-ad-status' || !(record.target instanceof Element)) continue
      const slot = record.target.closest('.ad-slot')
      if (slot && record.target.getAttribute('data-ad-status') === 'unfilled') settleEmptySlot(slot)
    }
    if (records.some((record) => record.attributeName === READY)) fill()
    if (records.some((record) => record.attributeName === 'data-anchor-status')) findAnchor()
  })
  observer.observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: [READY, 'data-ad-status', 'data-anchor-status'],
  })
  window.addEventListener('resize', onResize, { passive: true })
  fill()
  findAnchor()

  return () => {
    observer.disconnect()
    nearViewport.disconnect()
    anchor?.removeEventListener('transitionend', syncAnchor)
    bodyChildren.disconnect()
    anchorResize.disconnect()
    anchorChange.disconnect()
    window.removeEventListener('resize', onResize)
    window.clearTimeout(resizeTimer)
    root.style.removeProperty('--anchor-h')
  }
}
