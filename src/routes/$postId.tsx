import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { TuvixReactApp } from '@tuvix.js/react'
import { DEFAULT_OG_IMAGE, PERSON_REF, SITE_URL, seo } from '~/utils/seo'
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
    const title = `${loaderData.postTitle} | Yasin Ateş`
    const url = `${SITE_URL}/${loaderData.postId}`
    const image = loaderData.postImage || DEFAULT_OG_IMAGE
    return {
      links: [
        { rel: 'stylesheet', href: prismCss },
        { rel: 'canonical', href: url },
      ],
      meta: seo({
        title,
        description: loaderData.postDescription,
        image,
        url,
        keywords: loaderData.postTags.join(', ') || undefined,
        article: { publishedTime: loaderData.postPublished },
      }),
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: loaderData.postTitle,
            description: loaderData.postDescription,
            image,
            url,
            mainEntityOfPage: url,
            datePublished: loaderData.postPublished,
            inLanguage: 'tr-TR',
            keywords: loaderData.postTags,
            author: PERSON_REF,
            publisher: PERSON_REF,
          }),
        },
      ],
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
