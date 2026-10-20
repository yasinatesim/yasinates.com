import { describe, expect, it } from 'vitest'
import { cleanMediumContent, countReadingMinutes, getMediumExcerpt, htmlToText } from '~/utils/fetchBlogPosts'

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

describe('cleanMediumContent', () => {
  it('keeps indentation inside <pre> while collapsing whitespace elsewhere', () => {
    const html = '<p>Bir   iki</p><pre>version: 2\n  updates:\n    - npm</pre>'
    const result = cleanMediumContent(html, 'Başlık')
    expect(result).toContain('<p>Bir iki</p>')
    expect(result).toContain('version: 2\n  updates:\n    - npm')
  })
})
