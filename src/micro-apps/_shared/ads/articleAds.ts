import { adSlotHtml } from './config'

// AdSense suggests the first in-article ad two paragraphs into the text; later ones need enough reading between them.
const FIRST_AFTER_PARAGRAPHS = 2
const MIN_PARAGRAPHS_BETWEEN = 4
const MIN_CHARS_BETWEEN = 2500
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
  let previous = -1
  for (let i = FIRST_AFTER_PARAGRAPHS - 1; i <= last; i++) {
    const first = previous === -1
    if (!first && (i - previous < MIN_PARAGRAPHS_BETWEEN || ends[i] - ends[previous] < MIN_CHARS_BETWEEN)) continue
    at.push(ends[i])
    previous = i
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
