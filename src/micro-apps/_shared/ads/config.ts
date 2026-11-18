export const ADSENSE_CLIENT = 'ca-pub-5037834528497637'

// Manual ad units created in AdSense (Reklamlar → Reklam birimine göre). Auto ads are off for the site.
export const AD_SLOTS = {
  inline: '4944894743',
  feed: '9980377812',
  sidebar: '3101650832',
  rail: '3631813075',
  article: '2318731403',
  multiplex: '7489945845',
} as const

export type AdKind = keyof typeof AD_SLOTS

// AdSense only allows "Advertisements" / "Sponsored links" as ad labels.
export const AD_LABEL = 'Reklam'

// Display units carry no data-ad-format: their size comes from the `.ad-slot--<kind>` CSS in app.css,
// so the reserved box and the served creative always match (no layout shift).
export function adInsAttrs(kind: AdKind): Record<string, string> {
  const attrs: Record<string, string> = { 'data-ad-client': ADSENSE_CLIENT, 'data-ad-slot': AD_SLOTS[kind] }
  if (kind === 'article') {
    attrs['data-ad-layout'] = 'in-article'
    attrs['data-ad-format'] = 'fluid'
  } else if (kind === 'multiplex') {
    attrs['data-ad-format'] = 'autorelaxed'
  }
  if (import.meta.env.DEV) attrs['data-adtest'] = 'on'
  return attrs
}

// Same markup as AdSlot.tsx / AdSlot.vue, for HTML strings rendered with v-html (article bodies).
export function adSlotHtml(kind: AdKind): string {
  const attrs = Object.entries(adInsAttrs(kind))
    .map(([name, value]) => ` ${name}="${value}"`)
    .join('')
  return `<div class="ad-slot ad-slot--${kind}"><span class="ad-slot__label micro">${AD_LABEL}</span><ins class="adsbygoogle"${attrs}></ins></div>`
}
