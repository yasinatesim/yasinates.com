// ─── Types ────────────────────────────────────────────────────────────────────

export type MediumPostListItem = {
  guid: string
  title: string
  description: string
  thumbnail: string | null
  readingTime?: string
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

// ─── Fetchers ─────────────────────────────────────────────────────────────────

export async function fetchMediumPosts(): Promise<MediumPost[]> {
  const res = await fetch(
    'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@yasinatesim',
  )
  const data = await res.json() as { items?: MediumPost[] }
  return data.items ?? []
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
    // Remove highlight__panel + its outer wrapper closing tags after </pre>
    // Structure: </pre> \n <div.highlight__panel> <div.action> SVGs </div> </div> </div>
    .replace(
      /(<\/pre>)\s*<div[^>]*class="[^"]*highlight__panel[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi,
      '$1',
    )
    // Unwrap any remaining highlight wrapper div (no panel case)
    .replace(/<div[^>]*class="[^"]*js-code-highlight[^"]*"[^>]*>\s*(<pre[\s\S]*?<\/pre>)\s*<\/div>/gi, '$1')
    // Remove empty anchor links inside headings (<h2><a name="..."></a>text)
    .replace(/(<h[1-6][^>]*>)\s*<a[^>]*>\s*<\/a>\s*/gi, '$1')
    // Remove tabindex from pre tags
    .replace(/(<pre[^>]*?)\s*tabindex="[^"]*"/gi, '$1')
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
    // Remove entire <figure> blocks containing the cover image (string match avoids CDN URL escaping issues)
    result = result.replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, (match) =>
      match.includes(image) ? '' : match,
    )
    // Fallback: remove standalone <img> not wrapped in a figure
    const escapedImg = image.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    result = result.replace(new RegExp(`<img[^>]*src=["']${escapedImg}["'][^>]*>`, 'i'), '')
  }
  // Move figcaption text into img alt attributes
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
  // Decode &nbsp; in text nodes only (between tags), leave attribute values untouched
  result = result.replace(/>([^<]*)</g, (match, text: string) =>
    '>' + text.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ') + '<',
  )
  return result
}

// Local slugify (avoids circular imports)
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
