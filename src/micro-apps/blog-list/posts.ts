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
