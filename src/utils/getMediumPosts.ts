import { createServerFn } from '@tanstack/react-start'
import { fetchMediumPosts } from '~/utils/mediumArchive'
import type { MediumPostListItem } from '~/utils/fetchBlogPosts'

export const getMediumPosts = createServerFn({ method: 'GET' }).handler(
  async (): Promise<MediumPostListItem[]> => (await fetchMediumPosts()).map(({ content: _, ...post }) => post),
)
