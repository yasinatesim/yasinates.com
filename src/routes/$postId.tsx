import { createFileRoute, redirect } from '@tanstack/react-router'
import { TuvixReactApp } from '@tuvix.js/react'
import PostDetailApp from '~/micro-apps/post-detail/App'
import { slugify } from '~/utils/slugify'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/$postId')({
  loader: async ({ params }) => {
    const { postId } = params
    // Old Medium format: 8–16 lowercase hex chars, no dashes (e.g. 40b59079697f)
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
    // Old Dev.to format: pure numeric ID (e.g. 123456)
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
    return {}
  },
  component: () => <TuvixReactApp name="post-detail-app" App={PostDetailApp} />,
  head: ({ params }) => {
    const title = 'Blog Yazısı Başlığı'
    const description = 'Blog yazısının kısa özeti veya ilk 150 karakteri.'
    const url = `https://yasinates.com/${params.postId}`
    return {
      title: `${title} | Yasin Ateş`,
      meta: [
        ...seo({
          title: `${title} | Yasin Ateş`,
          description,
          image: 'https://yasinates.com/og-image.jpg',
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
            description: description,
            url: url,
            author: {
              '@type': 'Person',
              name: 'Yasin Ateş',
              url: 'https://yasinates.com/hakkimda'
            }
          })
        }
      ]
    }
  },
})
