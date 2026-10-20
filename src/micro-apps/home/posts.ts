import { getMediumImage, getMediumPostId, type DevToPostListItem, type MediumPostListItem } from '~/utils/fetchBlogPosts'

export type HomePost = {
  id: string
  title: string
  cover: string
  reading: string
  source: 'medium' | 'devto'
  publication?: string
}

export function toHomePosts(mediumPosts: MediumPostListItem[], devtoPosts: DevToPostListItem[]): HomePost[] {
  return [
    ...mediumPosts.map((p) => ({
      id: getMediumPostId(p),
      title: p.title,
      cover: getMediumImage({ thumbnail: p.thumbnail, description: p.description, content: '' }),
      reading: `${p.readingMinutes} dk`,
      source: 'medium' as const,
      publication: p.publication,
    })),
    ...devtoPosts.map((p) => ({
      id: p.slug,
      title: p.title,
      cover: p.cover_image ?? '',
      reading: `${p.reading_time_minutes} dk`,
      source: 'devto' as const,
    })),
  ]
}

export const sourceLabel = (source: HomePost['source'], publication?: string) =>
  source === 'devto' ? 'Dev.to' : publication ? `Medium · ${publication}` : 'Medium'
