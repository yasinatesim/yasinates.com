import { createFileRoute, redirect } from '@tanstack/react-router'
import { TuvixReactApp } from '@tuvix.js/react'
import { renderVueToString } from '@tuvix.js/vue/server'
import { seo } from '~/utils/seo'
import PostDetailApp from '~/micro-apps/post-detail/App'
import PostDetailVue from '~/micro-apps/post-detail/PostDetail.vue'
import { slugify } from '~/utils/slugify'
import { fetchMediumPosts, fetchDevtoPosts, fetchDevtoArticle, cleanMediumContent, cleanDevtoContent, getMediumImage } from '~/utils/fetchBlogPosts'
import { highlightCodeBlocks } from '~/utils/highlightCode'

export const Route = createFileRoute('/$postId')({
  staleTime: 1000 * 60 * 5,
  loader: async ({ params }) => {
    const { postId } = params

    // ── Legacy URL redirects ─────────────────────────────────────────────────
    if (/^[0-9a-f]{8,16}$/.test(postId)) {
      try {
        const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@yasinatesim')
        const data = await res.json() as { items?: Array<{ guid: string; title: string }> }
        const post = data.items?.find(p => p.guid?.split('/').pop() === postId)
        if (post) {
          throw redirect({ to: '/$postId', params: { postId: `${slugify(post.title)}-${postId}` }, statusCode: 301 })
        }
      } catch (e: unknown) {
        if (e && typeof e === 'object' && 'statusCode' in e) throw e
      }
    }
    if (/^\d{5,}$/.test(postId)) {
      try {
        const res = await fetch('https://dev.to/api/articles?username=yasinatesim')
        const data = await res.json() as Array<{ id: number; slug: string }>
        const post = data.find(p => String(p.id) === postId)
        if (post?.slug) {
          throw redirect({ to: '/$postId', params: { postId: post.slug }, statusCode: 301 })
        }
      } catch (e: unknown) {
        if (e && typeof e === 'object' && 'statusCode' in e) throw e
      }
    }

    // ── Fetch posts ──────────────────────────────────────────────────────────
    const [mediumResult, devtoResult] = await Promise.allSettled([
      fetchMediumPosts(),
      fetchDevtoPosts(),
    ])
    const mediumPosts = mediumResult.status === 'fulfilled' ? mediumResult.value : []
    const devtoPosts  = devtoResult.status  === 'fulfilled' ? devtoResult.value : []

    // ── Find active post & pre-highlight content ──────────────────────────────
    let content = ''
    let postTitle = ''
    let postImage = ''

    const mediumPost = mediumPosts.find(p => {
      const hash = p.guid.split('/').pop() ?? p.guid
      return (slugify(p.title) + '-' + hash) === postId
    })
    if (mediumPost) {
      postTitle = mediumPost.title
      postImage = getMediumImage(mediumPost)
      const cleaned = cleanMediumContent(mediumPost.content, mediumPost.title, postImage || undefined)
      content = highlightCodeBlocks(cleaned)
    } else {
      const devtoPost = devtoPosts.find(p => p.slug === postId)
      if (devtoPost) {
        postTitle = devtoPost.title
        postImage = devtoPost.cover_image ?? ''
        const bodyHtml = await fetchDevtoArticle(postId)
        const cleaned = cleanDevtoContent(bodyHtml || devtoPost.description)
        content = highlightCodeBlocks(cleaned)
      }
    }

    // Strip full content from list (too large to serialise)
    const mediumList = mediumPosts.map(({ content: _, ...p }) => p)
    const devtoList  = devtoPosts.map(({ body_html: _, ...p }) => p)

    const ssrHtml = await renderVueToString(PostDetailVue, {
      postId,
      content,
      mediumPosts: mediumPosts.map(({ content: _, ...p }) => ({ ...p, content: '' })),
      devtoPosts:  devtoPosts.map(({ body_html: _, ...p }) => ({ ...p, body_html: p.slug === postId ? devtoPosts.find(d => d.slug === postId)?.body_html ?? '' : '' })),
    }).catch(() => '')

    return { ssrHtml, content, mediumPosts: mediumList, devtoPosts: devtoList, postTitle, postImage }
  },
  head: ({ loaderData }) => {
    const title = loaderData?.postTitle || 'Blog Yazısı'
    const url = `https://yasinates.com/${loaderData ? '' : ''}`
    return {
      title: `${title} | Yasin Ateş`,
      meta: [
        ...seo({
          title: `${title} | Yasin Ateş`,
          description: 'Blog yazısının kısa özeti.',
          image: loaderData?.postImage || 'https://yasinates.com/og-image.jpg',
          keywords: 'blog, yazı, medium, devto, yasin ateş, frontend, developer'
        }),
        { name: 'canonical', content: url },
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            author: { '@type': 'Person', name: 'Yasin Ateş', url: 'https://yasinates.com/hakkimda' }
          })
        }
      ]
    }
  },
  component: () => {
    const { ssrHtml, content, mediumPosts, devtoPosts } = Route.useLoaderData()
    const { postId } = Route.useParams()
    return (
      <TuvixReactApp
        name="post-detail-app"
        App={PostDetailApp}
        ssrHtml={ssrHtml}
        postId={postId}
        content={content}
        mediumPosts={mediumPosts}
        devtoPosts={devtoPosts}
      />
    )
  },
})
