import { createFileRoute, redirect } from '@tanstack/react-router'
import { TuvixReactApp } from '@tuvix.js/react'
import { seo } from '~/utils/seo'
import prismCss from 'prismjs/themes/prism-okaidia.css?url'
import PostDetailApp from '~/micro-apps/post-detail/App'
import { loadPostDetail } from '~/utils/loadPostDetail'

export const Route = createFileRoute('/$postId')({
  staleTime: 1000 * 60 * 5,
  loader: async ({ params }) => {
    const data = await loadPostDetail({ data: params.postId })
    if (data.redirectTo !== null) {
      throw redirect({ to: '/$postId', params: { postId: data.redirectTo }, statusCode: 301 })
    }
    return data
  },
  head: ({ loaderData }) => {
    const title = loaderData?.postTitle || 'Blog Yazısı'
    const url = `https://yasinates.com/${loaderData?.postId ?? ''}`
    return {
      title: `${title} | Yasin Ateş`,
      links: [
        { rel: 'stylesheet', href: prismCss },
        { rel: 'canonical', href: url },
      ],
      meta: [
        ...seo({
          title: `${title} | Yasin Ateş`,
          description: 'Blog yazısının kısa özeti.',
          image: loaderData?.postImage || 'https://yasinates.com/og-image.jpg',
          keywords: 'blog, yazı, medium, devto, yasin ateş, frontend, developer'
        }),
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
        key={postId}
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
