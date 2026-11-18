import { getMediumExcerpt } from '../../utils/fetchBlogPosts'
import type { MediumPostListItem, DevToPostListItem } from '../../utils/fetchBlogPosts'
import { slugify } from '../../utils/slugify'
import type { BlogPost } from './types'

type MediumFeedItem = MediumPostListItem & { pubDate?: string }
type DevToFeedItem = DevToPostListItem & { published_at?: string }

const IMG_SRC_RE = /<img[^>]*src=["']([^"'>]+)["'][^>]*>/i

function toTime(value: string | undefined): number {
  if (!value) return 0
  const iso = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value) ? `${value.replace(' ', 'T')}Z` : value
  const t = new Date(iso).getTime()
  return Number.isNaN(t) ? 0 : t
}

const shortFmt = new Intl.DateTimeFormat('tr-TR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'Europe/Istanbul',
})

export function formatShort(time: number): string {
  return time ? shortFmt.format(time) : ''
}

export function toBlogPosts(medium: MediumFeedItem[], devto: DevToFeedItem[]): BlogPost[] {
  const posts: BlogPost[] = [
    ...medium.map((p): BlogPost => {
      const hash = p.guid.split('/').pop() ?? p.guid
      return {
        id: slugify(p.title) + '-' + hash,
        title: p.title,
        excerpt: getMediumExcerpt(p.description),
        cover: p.thumbnail || p.description?.match(IMG_SRC_RE)?.[1] || '',
        time: toTime(p.pubDate),
        reading: `${p.readingMinutes} dk`,
        source: 'medium',
        publication: p.publication,
      }
    }),
    ...devto.map((p): BlogPost => ({
      id: p.slug,
      title: p.title,
      excerpt: p.description ?? '',
      cover: p.cover_image ?? '',
      time: toTime(p.published_at),
      reading: `${p.reading_time_minutes} dk`,
      source: 'devto',
    })),
  ]
  return posts.sort((a, b) => b.time - a.time)
}

export type FeedEntry =
  | { kind: 'post'; post: BlogPost; index: number }
  | { kind: 'infeed'; key: string }
  | { kind: 'feed'; key: string; mobile: boolean }

// Grid cells per desktop row; the ad pattern repeats every two rows.
const ROW_CELLS = 3

// Ads between the cards: an in-feed card as the middle cell of every second row and a full-width display row after
// every row. Neither comes without at least two posts after it, so ads never pile up next to the closing multiplex.
// On a single-column phone layout every row is only one card, so only every second display row shows there
// (`mobile: false` rows are hidden by CSS): all of them would push ads past the 30% mobile ad density that the
// Better Ads Standards (and Chrome's ad filtering) allow.
export function withFeedAds(posts: BlogPost[]): FeedEntry[] {
  const entries: FeedEntry[] = []
  let cells = 0
  let feedRows = 0
  posts.forEach((post, index) => {
    const postsAfter = posts.length - index - 1
    entries.push({ kind: 'post', post, index })
    cells++
    if (cells % (ROW_CELLS * 2) === ROW_CELLS + 1 && postsAfter >= 2) {
      entries.push({ kind: 'infeed', key: `infeed-${index}` })
      cells++
    }
    if (cells % ROW_CELLS === 0 && postsAfter >= 2) {
      entries.push({ kind: 'feed', key: `feed-${index}`, mobile: feedRows % 2 === 1 })
      feedRows++
    }
  })
  return entries
}
