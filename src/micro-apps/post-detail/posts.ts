import { htmlToText } from '../../utils/fetchBlogPosts'
import type { MediumPostListItem, DevToPostListItem } from '../../utils/fetchBlogPosts'
import { slugify } from '../../utils/slugify'

export type MediumFeedItem = MediumPostListItem & { pubDate?: string; link?: string; categories?: string[] }
export type DevToFeedItem = DevToPostListItem & { published_at?: string; url?: string; tag_list?: string[] }

export type PostSummary = {
  id: string
  title: string
  cover: string
  time: number
  reading: string
  source: 'medium' | 'devto'
  publication?: string
  tags: string[]
  url: string
}

const IMG_SRC_RE = /<img[^>]*src=["']([^"'>]+)["'][^>]*>/i

function toTime(value: string | undefined): number {
  if (!value) return 0
  const iso = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value) ? `${value.replace(' ', 'T')}Z` : value
  const t = new Date(iso).getTime()
  return Number.isNaN(t) ? 0 : t
}

const longFmt = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Istanbul' })
const shortFmt = new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Europe/Istanbul' })

export function formatDate(time: number): string {
  return time ? longFmt.format(time) : ''
}

export function formatShort(time: number): string {
  return time ? shortFmt.format(time) : ''
}

function fullMediumTitle(title: string, description: string | undefined): string {
  if (!title.endsWith('…') || !description) return title
  const heading = description.match(/^\s*<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/i)?.[1]
  const text = heading ? htmlToText(heading) : ''
  return text.startsWith(title.slice(0, -1)) ? text : title
}

export function toPostSummaries(medium: MediumFeedItem[], devto: DevToFeedItem[]): PostSummary[] {
  const posts: PostSummary[] = [
    ...medium.map((p): PostSummary => {
      const hash = p.guid.split('/').pop() ?? p.guid
      return {
        id: slugify(p.title) + '-' + hash,
        title: fullMediumTitle(p.title, p.description),
        cover: p.thumbnail || p.description?.match(IMG_SRC_RE)?.[1] || '',
        time: toTime(p.pubDate),
        reading: `${p.readingMinutes} dk`,
        source: 'medium',
        publication: p.publication,
        tags: p.categories ?? [],
        url: p.link || p.guid,
      }
    }),
    ...devto.map((p): PostSummary => ({
      id: p.slug,
      title: p.title,
      cover: p.cover_image ?? '',
      time: toTime(p.published_at),
      reading: `${p.reading_time_minutes} dk`,
      source: 'devto',
      tags: Array.isArray(p.tag_list) ? p.tag_list : [],
      url: p.url || `https://dev.to/yasinatesim/${p.slug}`,
    })),
  ]
  return posts.sort((a, b) => b.time - a.time)
}

export function normaliseArticle(html: string): string {
  return html
    .replace(/<img[^>]*src=["']https:\/\/medium\.com\/_\/stat[^>]*>/gi, '')
    .replace(/<div class="highlight js-code-highlight">\s*(<pre[\s\S]*?<\/pre>)(?!\s*<\/div>)/g, '$1')
    .replace(/<(\/?)h1\b/gi, '<$1h2')
    .replace(/<a\s(?![^>]*\btarget=)/gi, '<a target="_blank" rel="noopener" ')
    .replace(/<img\s(?![^>]*\bloading=)/gi, '<img loading="lazy" decoding="async" ')
}
