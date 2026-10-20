export type MediumPostListItem = {
  guid: string
  title: string
  description: string
  thumbnail: string | null
  readingMinutes: number
  pubDate?: string
  link?: string
  categories?: string[]
  publication?: string
}

export type MediumPost = MediumPostListItem & { content: string }

export type DevToPostListItem = {
  id: number
  slug: string
  title: string
  description: string
  cover_image: string | null
  reading_time_minutes: number
}

export type DevToPost = DevToPostListItem & { body_html: string }

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' ',
}

export function htmlToText(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTITIES[m] ?? m)
    .replace(/\s+/g, ' ')
    .trim()
}

const WORDS_PER_MINUTE = 200

export function countReadingMinutes(html: string): number {
  const words = htmlToText(html).split(' ').filter(Boolean).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

export function getMediumExcerpt(description: string | undefined): string {
  if (!description) return ''
  const firstParagraph = description.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1]
  return htmlToText(firstParagraph ?? description)
}

export async function fetchDevtoPosts(): Promise<DevToPost[]> {
  const res = await fetch('https://dev.to/api/articles?username=yasinatesim')
  return res.json() as Promise<DevToPost[]>
}

export async function fetchDevtoArticle(slug: string): Promise<string> {
  const res = await fetch(`https://dev.to/api/articles/yasinatesim/${slug}`)
  const data = await res.json() as { body_html?: string }
  return data.body_html ?? ''
}

export function cleanDevtoContent(html: string): string {
  return html
    .replace(
      /(<\/pre>)\s*<div[^>]*class="[^"]*highlight__panel[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi,
      '$1',
    )
    .replace(/<div[^>]*class="[^"]*js-code-highlight[^"]*"[^>]*>\s*(<pre[\s\S]*?<\/pre>)\s*<\/div>/gi, '$1')
    .replace(/(<h[1-6][^>]*>)\s*<a[^>]*>\s*<\/a>\s*/gi, '$1')
    .replace(/(<pre[^>]*?)\s*tabindex="[^"]*"/gi, '$1')
}

export function getMediumPostId(post: MediumPostListItem): string {
  const hash = post.guid.split('/').pop() ?? post.guid
  return slugify(post.title) + '-' + hash
}

export function getMediumImage(post: Pick<MediumPost, 'thumbnail' | 'description' | 'content'>): string {
  return (
    post.thumbnail
    || post.description?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)?.[1]
    || (post as MediumPost).content?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)?.[1]
    || ''
  )
}

export function cleanMediumContent(html: string, postTitle: string, image?: string): string {
  let result = html
  const escapedTitle = postTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  result = result.replace(new RegExp(`<h[1-3][^>]*>${escapedTitle}</h[1-3]>`, 'gi'), '')
  result = result.replace(
    new RegExp(`<figure>.*?<figcaption[^>]*>${escapedTitle}<\\/figcaption>.*?<\\/figure>`, 'gis'),
    '',
  )
  if (image) {
    result = result.replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, (match) =>
      match.includes(image) ? '' : match,
    )
    const escapedImg = image.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    result = result.replace(new RegExp(`<img[^>]*src=["']${escapedImg}["'][^>]*>`, 'i'), '')
  }
  result = result.replace(/<figure[^>]*>([\s\S]*?)<\/figure>/gi, (match, inner: string) => {
    const captionMatch = inner.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i)
    if (!captionMatch) return match
    const altText = captionMatch[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim()
    if (!altText) return match
    return match
      .replace(/(<img[^>]*?)alt="[^"]*"([^>]*>)/i, `$1alt="${altText}"$2`)
      .replace(/<figcaption[^>]*>[\s\S]*?<\/figcaption>/i, '')
  })
  result = result
    .split(/(<pre[\s\S]*?<\/pre>)/i)
    .map((part) =>
      /^<pre/i.test(part)
        ? part
        : part.replace(/>([^<]*)</g, (_match, text: string) =>
            '>' + text.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ') + '<',
          ),
    )
    .join('')
  return result
}

function slugify(text: string): string {
  const map: Record<string, string> = {
    ı: 'i', İ: 'i', ğ: 'g', Ğ: 'g', ş: 's', Ş: 's',
    ç: 'c', Ç: 'c', ö: 'o', Ö: 'o', ü: 'u', Ü: 'u',
  }
  return text
    .split('').map(c => map[c] ?? c).join('')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}
