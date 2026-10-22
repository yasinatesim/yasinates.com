import { createServerFn } from '@tanstack/react-start'
import { renderVueToString } from '@tuvix.js/vue/server'
import PostDetailVue from '~/micro-apps/post-detail/PostDetail.vue'
import { fetchMediumPosts, mediumHash, readArchivedMediumContent } from '~/utils/mediumArchive'
import { slugify } from '~/utils/slugify'
import {
  fetchDevtoPosts,
  fetchDevtoArticle,
  cleanMediumContent,
  cleanDevtoContent,
  getMediumExcerpt,
  getMediumImage,
  toMediumListItem,
} from '~/utils/fetchBlogPosts'
import { highlightCodeBlocks } from '~/utils/highlightCode'

export const loadPostDetail = createServerFn({ method: 'GET' })
  .validator((postId: unknown): string => {
    if (typeof postId !== 'string' || postId.length === 0 || postId.length > 300) throw new Error('Invalid post id')
    return postId
  })
  .handler(async ({ data: postId }) => {
    const [mediumResult, devtoResult] = await Promise.allSettled([fetchMediumPosts(), fetchDevtoPosts()])
    const medium = mediumResult.status === 'fulfilled' ? mediumResult.value : { posts: [], complete: false }
    const devtoComplete = devtoResult.status === 'fulfilled' && Array.isArray(devtoResult.value)
    const mediumPosts = medium.posts
    const devtoPosts = devtoComplete ? devtoResult.value : []

    if (/^[0-9a-f]{8,16}$/.test(postId)) {
      const post = mediumPosts.find((p) => p.guid.split('/').pop() === postId)
      if (post) return { kind: 'redirect' as const, to: `${slugify(post.title)}-${postId}` }
    }
    if (/^\d{5,}$/.test(postId)) {
      const post = devtoPosts.find((p) => String(p.id) === postId)
      if (post?.slug) return { kind: 'redirect' as const, to: post.slug }
    }

    const mediumPost = mediumPosts.find((p) => `${slugify(p.title)}-${p.guid.split('/').pop() ?? p.guid}` === postId)
    const devtoPost = mediumPost ? undefined : devtoPosts.find((p) => p.slug === postId)

    let content: string
    let postTitle: string
    let postImage: string
    let postDescription: string
    let postPublished: string | undefined
    let postTags: string[]

    if (mediumPost) {
      postTitle = mediumPost.title
      postImage = getMediumImage(mediumPost)
      postDescription = getMediumExcerpt(mediumPost.description)
      postPublished = mediumPost.pubDate ? `${mediumPost.pubDate.replace(' ', 'T')}Z` : undefined
      postTags = mediumPost.categories ?? []
      const body = mediumPost.content || await readArchivedMediumContent(mediumHash(mediumPost))
      content = highlightCodeBlocks(cleanMediumContent(body, mediumPost.title, postImage || undefined))
    } else if (devtoPost) {
      postTitle = devtoPost.title
      postImage = devtoPost.cover_image ?? ''
      postDescription = devtoPost.description
      postPublished = devtoPost.published_at
      postTags = devtoPost.tag_list ?? []
      const bodyHtml = await fetchDevtoArticle(postId)
      content = highlightCodeBlocks(cleanDevtoContent(bodyHtml || devtoPost.description))
    } else {
      if (medium.complete && devtoComplete) return { kind: 'not-found' as const }
      throw new Error('Blog sources are unavailable')
    }

    const mediumList = mediumPosts.map(toMediumListItem)
    const devtoList = devtoPosts.map(({ body_html: _, ...p }) => p)

    const ssrHtml = await renderVueToString(PostDetailVue, {
      postId,
      content,
      mediumPosts: mediumList.map((p) => ({ ...p, content: '' })),
      devtoPosts: devtoList.map((p) => ({ ...p, body_html: '' })),
    }).catch(() => '')

    return {
      kind: 'post' as const,
      ssrHtml,
      content,
      mediumPosts: mediumList,
      devtoPosts: devtoList,
      postTitle,
      postImage,
      postDescription,
      postPublished,
      postTags,
      postId,
    }
  })
