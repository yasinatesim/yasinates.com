import { describe, expect, it } from 'vitest'
import {
  cleanMediumContent,
  compactMediumDescription,
  countReadingMinutes,
  getMediumExcerpt,
  getMediumImage,
  htmlToText,
  mediumImageUrl,
} from '~/utils/fetchBlogPosts'

describe('htmlToText', () => {
  it('strips tags, decodes entities once and collapses whitespace', () => {
    expect(htmlToText('<p>Tom &amp;amp; <b>Jerry</b>&nbsp;&lt;3</p>\n  ')).toBe('Tom &amp; Jerry <3')
  })
})

describe('countReadingMinutes', () => {
  it('counts words of the text only, 200 per started minute', () => {
    const words = (n: number) => `<p>${Array.from({ length: n }, () => '<b>kelime</b>').join(' ')}</p>`
    expect(countReadingMinutes(words(200))).toBe(1)
    expect(countReadingMinutes(words(201))).toBe(2)
    expect(countReadingMinutes(words(1400))).toBe(7)
  })

  it('never shows less than a minute', () => {
    expect(countReadingMinutes('')).toBe(1)
    expect(countReadingMinutes('<figure><img src="x.png"></figure>')).toBe(1)
  })
})

describe('getMediumExcerpt', () => {
  it('uses the first paragraph, skipping the repeated title and cover caption', () => {
    const description =
      '<h3>Dependabot ile Paket Güncelleme</h3><figure><img src="x.png"><figcaption>Kapak</figcaption></figure><p>Projelerimizde <strong>bağımlılık</strong> güncellemeleri</p><p>İkinci</p>'
    expect(getMediumExcerpt(description)).toBe('Projelerimizde bağımlılık güncellemeleri')
  })

  it('falls back to the whole description when there is no paragraph', () => {
    expect(getMediumExcerpt('<div>Sadece metin</div>')).toBe('Sadece metin')
  })

  it('returns an empty string for a missing description', () => {
    expect(getMediumExcerpt(undefined)).toBe('')
  })
})

describe('compactMediumDescription', () => {
  const article =
    '<h3>Dependabot ile Paket Güncelleme: Tam Başlık</h3>' +
    '<p>Projelerimizde <strong>bağımlılık</strong> güncellemeleri</p>' +
    '<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/cover.png"><figcaption>Kapak</figcaption></figure>' +
    '<p>İkinci paragraf</p><pre>kod</pre><figure><img src="https://cdn-images-1.medium.com/max/1024/other.png"></figure>' +
    '<p>Son</p>'

  it('keeps the excerpt, cover image and leading heading that list views read', () => {
    const compact = compactMediumDescription(article)
    expect(getMediumExcerpt(compact)).toBe(getMediumExcerpt(article))
    expect(getMediumImage({ thumbnail: null, description: compact, content: '' })).toBe(
      'https://cdn-images-1.medium.com/max/1024/cover.png',
    )
    expect(compact.startsWith('<h3>Dependabot ile Paket Güncelleme: Tam Başlık</h3>')).toBe(true)
    expect(compact).not.toContain('İkinci paragraf')
  })

  it('leaves a description without paragraphs unchanged, so the excerpt fallback still works', () => {
    expect(compactMediumDescription('<div>Sadece metin</div>')).toBe('<div>Sadece metin</div>')
  })
})

describe('mediumImageUrl', () => {
  it('asks Medium for a WebP at the given width, for both CDN URL styles', () => {
    expect(mediumImageUrl('https://cdn-images-1.medium.com/max/1024/1*-TftnWyQ8wrTpXM1Ub5IIQ.png', 800)).toBe(
      'https://miro.medium.com/v2/resize:fit:800/format:webp/1*-TftnWyQ8wrTpXM1Ub5IIQ.png',
    )
    expect(mediumImageUrl('https://miro.medium.com/v2/da:true/resize:fit:1200/0*v6g2xetIL2FIMQgG', 800)).toBe(
      'https://miro.medium.com/v2/resize:fit:800/format:webp/0*v6g2xetIL2FIMQgG',
    )
  })

  it('can resize an already rewritten card URL again', () => {
    expect(mediumImageUrl('https://miro.medium.com/v2/resize:fit:800/format:webp/0*v6g2xetIL2FIMQgG', 1400)).toBe(
      'https://miro.medium.com/v2/resize:fit:1400/format:webp/0*v6g2xetIL2FIMQgG',
    )
  })

  it('leaves other hosts and empty values alone', () => {
    expect(mediumImageUrl('https://media2.dev.to/cover.png', 800)).toBe('https://media2.dev.to/cover.png')
    expect(mediumImageUrl('', 800)).toBe('')
  })
})

describe('cleanMediumContent', () => {
  it('keeps indentation inside <pre> while collapsing whitespace elsewhere', () => {
    const html = '<p>Bir   iki</p><pre>version: 2\n  updates:\n    - npm</pre>'
    const result = cleanMediumContent(html, 'Başlık')
    expect(result).toContain('<p>Bir iki</p>')
    expect(result).toContain('version: 2\n  updates:\n    - npm')
  })
})
