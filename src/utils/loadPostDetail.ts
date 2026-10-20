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
  getMediumImage,
} from '~/utils/fetchBlogPosts'
import { highlightCodeBlocks } from '~/utils/highlightCode'

export const loadPostDetail = createServerFn({ method: 'GET' })
  .validator((postId: unknown): string => {
    if (typeof postId !== 'string' || postId.length === 0 || postId.length > 300) throw new Error('Invalid post id')
    return postId
  })
  .handler(async ({ data: postId }) => {
    const [mediumResult, devtoResult] = await Promise.allSettled([fetchMediumPosts(), fetchDevtoPosts()])
    const mediumPosts = mediumResult.status === 'fulfilled' ? mediumResult.value : []
    const devtoPosts = devtoResult.status === 'fulfilled' && Array.isArray(devtoResult.value) ? devtoResult.value : []

    if (/^[0-9a-f]{8,16}$/.test(postId)) {
      const post = mediumPosts.find((p) => p.guid.split('/').pop() === postId)
      if (post) return { redirectTo: `${slugify(post.title)}-${postId}` }
    }
    if (/^\d{5,}$/.test(postId)) {
      const post = devtoPosts.find((p) => String(p.id) === postId)
      if (post?.slug) return { redirectTo: post.slug }
    }

    let content = ''
    let postTitle = ''
    let postImage = ''

    const mediumPost = mediumPosts.find((p) => `${slugify(p.title)}-${p.guid.split('/').pop() ?? p.guid}` === postId)
    if (mediumPost) {
      postTitle = mediumPost.title
      postImage = getMediumImage(mediumPost)
      const body = mediumPost.content || await readArchivedMediumContent(mediumHash(mediumPost))
      content = highlightCodeBlocks(cleanMediumContent(body, mediumPost.title, postImage || undefined))
    } else {
      const devtoPost = devtoPosts.find((p) => p.slug === postId)
      if (devtoPost) {
        postTitle = devtoPost.title
        postImage = devtoPost.cover_image ?? ''
        const bodyHtml = await fetchDevtoArticle(postId)
        content = highlightCodeBlocks(cleanDevtoContent(bodyHtml || devtoPost.description))
      }
    }

    const mediumList = mediumPosts.map(({ content: _, ...p }) => p)
    const devtoList = devtoPosts.map(({ body_html: _, ...p }) => p)

    const ssrHtml = await renderVueToString(PostDetailVue, {
      postId,
      content,
      mediumPosts: mediumList.map((p) => ({ ...p, content: '' })),
      devtoPosts: devtoList.map((p) => ({ ...p, body_html: '' })),
    }).catch(() => '')

    return { redirectTo: null, ssrHtml, content, mediumPosts: mediumList, devtoPosts: devtoList, postTitle, postImage, postId }
  })
