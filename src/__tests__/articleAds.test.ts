import { describe, expect, it } from 'vitest'
import { insertArticleAds } from '~/micro-apps/_shared/ads/articleAds'

const AD = /<div class="ad-slot ad-slot--article">.*?<\/ins><\/div><\/div><\/div>/g
const p = (text: string) => `<p>${text}</p>`
// ~700 characters each, so three of them clear the 1500-character spacing.
const long = (i: number) => p(`paragraph ${i} ${'x'.repeat(700)}`)
const paragraphsBetween = (html: string) =>
  html
    .replace(AD, '[AD]')
    .split('[AD]')
    .slice(0, -1)
    .map((part) => part.match(/<p>/g)?.length ?? 0)

describe('insertArticleAds', () => {
  it('keeps the first ad three long paragraphs below the ad that opens the article', () => {
    const html = [1, 2, 3, 4, 5, 6].map(long).join('')
    const out = insertArticleAds(html).replace(AD, '[AD]')
    expect(out).toBe([1, 2, 3].map(long).join('') + '[AD]' + [4, 5, 6].map(long).join(''))
  })

  it('leaves short articles alone', () => {
    const shortOnes = Array.from({ length: 20 }, (_, i) => p(`short ${i}`)).join('')
    expect(insertArticleAds(shortOnes)).toBe(shortOnes)
    const fewLong = [1, 2, 3, 4].map(long).join('')
    expect(insertArticleAds(fewLong)).toBe(fewLong)
  })

  it('spaces every ad by at least three paragraphs and never ends on one', () => {
    const html = Array.from({ length: 30 }, (_, i) => long(i)).join('')
    const out = insertArticleAds(html)
    const gaps = paragraphsBetween(out)
    expect(gaps.length).toBeGreaterThan(3)
    for (const gap of gaps) expect(gap).toBeGreaterThanOrEqual(3)
    const afterLast = out.replace(AD, '[AD]').split('[AD]').pop() ?? ''
    expect(afterLast.match(/<p>/g)?.length ?? 0).toBeGreaterThanOrEqual(2)
  })

  it('ignores paragraphs nested in lists, quotes and figures', () => {
    const nested = `<blockquote>${long(90)}${long(91)}${long(92)}</blockquote><ul><li>${long(93)}</li></ul>`
    const html = long(1) + nested + [2, 3, 4, 5, 6].map(long).join('')
    const out = insertArticleAds(html).replace(AD, '[AD]')
    expect(out).toBe(long(1) + nested + [2, 3].map(long).join('') + '[AD]' + [4, 5, 6].map(long).join(''))
  })

  it('is not thrown off by void tags or `>` inside attribute values', () => {
    const tricky = `<p>a<br>b ${'x'.repeat(700)}</p><img src="x.png" alt="a > b"><p>c<img src="y.png"/> ${'x'.repeat(700)}</p>`
    const html = tricky + [3, 4, 5, 6].map(long).join('')
    const out = insertArticleAds(html).replace(AD, '[AD]')
    expect(out).toBe(tricky + long(3) + '[AD]' + [4, 5, 6].map(long).join(''))
  })
})
