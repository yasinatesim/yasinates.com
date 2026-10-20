import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { TuvixReactApp } from '@tuvix.js/react'
import { seo } from '~/utils/seo'
import prismCss from 'prismjs/themes/prism-okaidia.css?url'
import PostDetailApp from '~/micro-apps/post-detail/App'
import { loadPostDetail } from '~/utils/loadPostDetail'

export const Route = createFileRoute('/$postId')({
  staleTime: 1000 * 60 * 5,
  loader: async ({ params }) => {
    const data = await loadPostDetail({ data: params.postId })
    if (data.kind === 'redirect') {
      throw redirect({ to: '/$postId', params: { postId: data.to }, statusCode: 301 })
    }
    if (data.kind === 'not-found') throw notFound()
    return data
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: 'Sayfa bulunamadı | Yasin Ateş' }, { name: 'robots', content: 'noindex' }] }
    }
    const title = loaderData.postTitle
    const url = `https://yasinates.com/${loaderData.postId}`
    return {
      title: `${title} | Yasin Ateş`,
      links: [
        { rel: 'stylesheet', href: prismCss },
        { rel: 'canonical', href: url },
      ],
      meta: [
        ...seo({
          title: `${title} | Yasin Ateş`,
          description: loaderData.postDescription,
          image: loaderData.postImage || 'https://yasinates.com/og-image.jpg',
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
