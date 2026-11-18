import { adSlotHtml } from './config'

// The article opens with an ad right above its text (post-detail `post__top-ad`), so every in-article ad, the first
// included, needs this much reading since the previous ad.
const MIN_PARAGRAPHS_BETWEEN = 3
const MIN_CHARS_BETWEEN = 1500
// Never right before the end: the article footer is followed by the multiplex unit.
const MIN_PARAGRAPHS_AFTER = 2

const VOID_TAGS: Record<string, true> = {
  area: true, base: true, br: true, col: true, embed: true, hr: true, img: true,
  input: true, link: true, meta: true, source: true, track: true, wbr: true,
}
// Attribute values may contain `>`, so quoted strings are consumed whole.
const TAG = /<(\/?)([a-zA-Z][\w:-]*)(?:[^>"']|"[^"]*"|'[^']*')*?(\/?)>/g

// Offsets right after every `</p>` that closes a top-level paragraph (not one nested in a list, quote or figure).
function topLevelParagraphEnds(html: string): number[] {
  const ends: number[] = []
  let depth = 0
  for (const match of html.matchAll(TAG)) {
    const [tag, closing, rawName, selfClosing] = match
    const name = rawName.toLowerCase()
    if (VOID_TAGS[name] === true || selfClosing) continue
    if (!closing) {
      depth++
      continue
    }
    depth = Math.max(0, depth - 1)
    if (depth === 0 && name === 'p') ends.push(match.index + tag.length)
  }
  return ends
}

export function insertArticleAds(html: string): string {
  const ends = topLevelParagraphEnds(html)
  const last = ends.length - 1 - MIN_PARAGRAPHS_AFTER
  const at: number[] = []
  // The ad above the article counts as one ending before the first paragraph.
  let previousIndex = -1
  let previousOffset = 0
  for (let i = 0; i <= last; i++) {
    if (i - previousIndex < MIN_PARAGRAPHS_BETWEEN || ends[i] - previousOffset < MIN_CHARS_BETWEEN) continue
    at.push(ends[i])
    previousIndex = i
    previousOffset = ends[i]
  }
  if (at.length === 0) return html

  const slot = adSlotHtml('article')
  let out = ''
  let from = 0
  for (const offset of at) {
    out += html.slice(from, offset) + slot
    from = offset
  }
  return out + html.slice(from)
}
