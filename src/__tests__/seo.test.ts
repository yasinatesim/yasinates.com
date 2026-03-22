import { describe, it, expect } from 'vitest'
import { seo } from '~/utils/seo'

describe('seo()', () => {
  it('returns title tag', () => {
    const tags = seo({ title: 'Test Title' })
    expect(tags).toContainEqual({ title: 'Test Title' })
  })

  it('returns og:title with property attribute and twitter:title with name attribute', () => {
    const tags = seo({ title: 'Test Title' })
    expect(tags).toContainEqual({ property: 'og:title', content: 'Test Title' })
    expect(tags).toContainEqual({ name: 'twitter:title', content: 'Test Title' })
  })

  it('always includes og:type website using property attribute', () => {
    const tags = seo({ title: 'T' })
    expect(tags).toContainEqual({ property: 'og:type', content: 'website' })
  })

  it('uses @yasinatesim twitter handles', () => {
    const tags = seo({ title: 'T' })
    expect(tags).toContainEqual({ name: 'twitter:creator', content: '@yasinatesim' })
    expect(tags).toContainEqual({ name: 'twitter:site', content: '@yasinatesim' })
  })

  it('includes description meta tags when provided', () => {
    const tags = seo({ title: 'T', description: 'A description' })
    expect(tags).toContainEqual({ name: 'description', content: 'A description' })
    expect(tags).toContainEqual({ property: 'og:description', content: 'A description' })
    expect(tags).toContainEqual({ name: 'twitter:description', content: 'A description' })
  })

  it('omits description tags when description is not provided', () => {
    const tags = seo({ title: 'T' })
    const keys = tags.flatMap((t) => Object.keys(t))
    const values = tags.flatMap((t) => Object.values(t))
    expect(values).not.toContain('description')
    expect(keys).not.toContain('og:description')
  })

  it('omits keywords tag when not provided', () => {
    const tags = seo({ title: 'T' })
    const names = tags.map((t) => ('name' in t ? t.name : null))
    expect(names).not.toContain('keywords')
  })

  it('includes keywords tag when provided', () => {
    const tags = seo({ title: 'T', keywords: 'react, typescript' })
    expect(tags).toContainEqual({ name: 'keywords', content: 'react, typescript' })
  })

  it('omits image tags when image is not provided', () => {
    const tags = seo({ title: 'T' })
    const props = tags.map((t) => ('property' in t ? t.property : null))
    const names = tags.map((t) => ('name' in t ? t.name : null))
    expect(props).not.toContain('og:image')
    expect(names).not.toContain('twitter:image')
    expect(names).not.toContain('twitter:card')
  })

  it('includes image tags when image is provided', () => {
    const tags = seo({ title: 'T', image: 'https://example.com/og.jpg' })
    expect(tags).toContainEqual({ property: 'og:image', content: 'https://example.com/og.jpg' })
    expect(tags).toContainEqual({ name: 'twitter:image', content: 'https://example.com/og.jpg' })
    expect(tags).toContainEqual({ name: 'twitter:card', content: 'summary_large_image' })
  })

  it('does not emit tags with undefined content', () => {
    const tags = seo({ title: 'T' })
    const hasUndefinedContent = tags.some(
      (t) => 'content' in t && t.content === undefined,
    )
    expect(hasUndefinedContent).toBe(false)
  })
})
