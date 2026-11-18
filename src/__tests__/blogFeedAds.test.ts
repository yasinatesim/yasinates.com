import { describe, expect, it } from 'vitest'
import { withFeedAds } from '~/micro-apps/blog-list/posts'
import type { BlogPost } from '~/micro-apps/blog-list/types'

const post = (i: number): BlogPost => ({
  id: `p${i}`,
  title: `Post ${i}`,
  excerpt: '',
  cover: '',
  time: i,
  reading: '1 dk',
  source: 'medium',
})
const layout = (count: number) =>
  withFeedAds(Array.from({ length: count }, (_, i) => post(i)))
    .map((e) => (e.kind === 'post' ? 'p' : e.kind === 'infeed' ? 'F' : e.mobile ? '|' : ':'))
    .join('')

describe('withFeedAds', () => {
  it('fills every 3-column row before an ad row, with an in-feed card in every second row', () => {
    // `:` rows are hidden on single-column phones, `|` rows show everywhere.
    expect(layout(12)).toBe('ppp:pFp|ppp:pFp|pp')
    for (const row of layout(30).split(/[|:]/).slice(0, -1)) expect(row).toHaveLength(3)
  })

  it('never ends with an ad or puts one before fewer than two posts', () => {
    for (let count = 0; count <= 20; count++) {
      const out = layout(count)
      expect(out.replace(/[^p]/g, '')).toHaveLength(count)
      expect(out).not.toMatch(/[F|:]p?$/)
    }
  })
})
