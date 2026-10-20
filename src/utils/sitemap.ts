import { fetchDevtoPosts, getMediumPostId, type DevToPostListItem } from '~/utils/fetchBlogPosts'
import { fetchMediumPosts } from '~/utils/mediumArchive'

const SITE = 'https://yasinates.com'

const PAGES = ['/', '/hakkimda', '/projeler', '/blog', '/github', '/youtube', '/iletisim', '/gizlilik-politikasi', '/kullanim-kosullari']

type SitemapEntry = { path: string; lastmod?: string }

const toDate = (value: string | undefined): string | undefined => {
  const time = Date.parse(value?.includes('T') ? value : `${(value ?? '').replace(' ', 'T')}Z`)
  return Number.isNaN(time) ? undefined : new Date(time).toISOString().slice(0, 10)
}

const escapeXml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export async function buildSitemap(): Promise<string> {
  const [medium, devto] = await Promise.allSettled([fetchMediumPosts(), fetchDevtoPosts()])
  const mediumPosts = medium.status === 'fulfilled' ? medium.value.posts : []
  const devtoPosts: Array<DevToPostListItem & { published_at?: string }> =
    devto.status === 'fulfilled' && Array.isArray(devto.value) ? devto.value : []

  const entries: SitemapEntry[] = [
    ...PAGES.map((path) => ({ path })),
    ...mediumPosts.map((post) => ({ path: `/${getMediumPostId(post)}`, lastmod: toDate(post.pubDate) })),
    ...devtoPosts.map((post) => ({ path: `/${post.slug}`, lastmod: toDate(post.published_at) })),
  ]

  const urls = entries.map(({ path, lastmod }) => {
    const loc = `<loc>${escapeXml(SITE + path)}</loc>`
    return lastmod ? `  <url>${loc}<lastmod>${lastmod}</lastmod></url>` : `  <url>${loc}</url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}
