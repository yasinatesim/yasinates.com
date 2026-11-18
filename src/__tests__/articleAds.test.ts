import { describe, expect, it } from 'vitest'
import { insertArticleAds } from '~/micro-apps/_shared/ads/articleAds'

const AD = /<div class="ad-slot ad-slot--article">.*?<\/ins><\/div>/g
const p = (text: string) => `<p>${text}</p>`
const long = (i: number) => p(`paragraph ${i} ${'x'.repeat(700)}`)

describe('insertArticleAds', () => {
  it('puts the first ad after the second top-level paragraph', () => {
    const html = [1, 2, 3, 4, 5].map((i) => p(`p${i}`)).join('')
    const out = insertArticleAds(html)
    expect(out.match(AD)).toHaveLength(1)
    expect(out.replace(AD, '[AD]')).toBe('<p>p1</p><p>p2</p>[AD]<p>p3</p><p>p4</p><p>p5</p>')
  })

  it('leaves short articles alone', () => {
    const html = [1, 2, 3].map((i) => p(`p${i}`)).join('')
    expect(insertArticleAds(html)).toBe(html)
  })

  it('spaces later ads by paragraphs and length', () => {
    const shortOnes = Array.from({ length: 20 }, (_, i) => p(`short ${i}`)).join('')
    expect(insertArticleAds(shortOnes).match(AD)).toHaveLength(1)

    const longOnes = Array.from({ length: 20 }, (_, i) => long(i)).join('')
    const out = insertArticleAds(longOnes).replace(AD, '[AD]')
    const gaps = out.split('[AD]').slice(1, -1).map((part) => part.match(/<p>/g)?.length ?? 0)
    expect(gaps.length).toBeGreaterThan(0)
    for (const gap of gaps) expect(gap).toBeGreaterThanOrEqual(4)
  })

  it('ignores paragraphs nested in lists, quotes and figures', () => {
    const html =
      '<p>a</p><blockquote><p>q1</p><p>q2</p></blockquote><ul><li><p>l1</p></li></ul><p>b</p><p>c</p><p>d</p>'
    expect(insertArticleAds(html).replace(AD, '[AD]')).toBe(
      '<p>a</p><blockquote><p>q1</p><p>q2</p></blockquote><ul><li><p>l1</p></li></ul><p>b</p>[AD]<p>c</p><p>d</p>',
    )
  })

  it('is not thrown off by void tags or `>` inside attribute values', () => {
    const html = '<p>a<br>b</p><img src="x.png" alt="a > b"><p>c<img src="y.png"/></p><p>d</p><p>e</p>'
    expect(insertArticleAds(html).replace(AD, '[AD]')).toBe(
      '<p>a<br>b</p><img src="x.png" alt="a > b"><p>c<img src="y.png"/></p>[AD]<p>d</p><p>e</p>',
    )
  })
})
