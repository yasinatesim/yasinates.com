import type { QueryClient } from '@tanstack/react-query'
import { getMediumPostId } from '~/utils/fetchBlogPosts'
import type { DevToPostListItem, MediumPostListItem } from '~/utils/fetchBlogPosts'
import type { PaletteLink } from './runtime/cmdk'

type CachedMediumPost = MediumPostListItem & { pubDate?: string }
type CachedDevtoPost = DevToPostListItem & { published_at?: string }

export function readRecentPosts(queryClient: QueryClient): PaletteLink[] {
  const medium = queryClient.getQueryData<CachedMediumPost[]>(['medium-posts', 'yasinatesim']) ?? []
  const devto = queryClient.getQueryData<CachedDevtoPost[]>(['devto-posts', 'yasinatesim']) ?? []
  const posts = [
    ...medium.map((p) => ({
      label: p.title,
      hint: 'Medium',
      href: `/${getMediumPostId(p)}`,
      time: Date.parse(p.pubDate ?? '') || 0,
    })),
    ...devto.map((p) => ({
      label: p.title,
      hint: 'Dev.to',
      href: `/${p.slug}`,
      time: Date.parse(p.published_at ?? '') || 0,
    })),
  ]
  return posts.sort((a, b) => b.time - a.time).map(({ label, hint, href }) => ({ label, hint, href }))
}
