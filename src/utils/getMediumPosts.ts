import { createServerFn } from '@tanstack/react-start'
import { fetchMediumPosts } from '~/utils/mediumArchive'
import { toMediumListItem, type MediumPostListItem } from '~/utils/fetchBlogPosts'

export const getMediumPosts = createServerFn({ method: 'GET' }).handler(
  async (): Promise<MediumPostListItem[]> => (await fetchMediumPosts()).posts.map(toMediumListItem),
)
