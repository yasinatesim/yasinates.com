import { createFileRoute } from '@tanstack/react-router'
import { TuvixReactApp } from '@tuvix.js/react'
import { seo } from '~/utils/seo'
import BlogListApp from '~/micro-apps/blog-list/App'
import BlogListVue from '~/micro-apps/blog-list/BlogList.vue'
import { renderVueToString } from '@tuvix.js/vue/server'
import { fetchMediumPosts, fetchDevtoPosts } from '~/utils/fetchBlogPosts'

export const Route = createFileRoute('/blog')({
  staleTime: 1000 * 60 * 5,
  loader: async () => {
    const [mediumResult, devtoResult] = await Promise.allSettled([
      fetchMediumPosts(),
      fetchDevtoPosts(),
    ])
    const mediumPosts = mediumResult.status === 'fulfilled' ? mediumResult.value.map(({ content: _, ...p }) => p) : []
    const devtoPosts  = devtoResult.status  === 'fulfilled' ? devtoResult.value.map(({ body_html: _, ...p }) => p) : []
    const ssrHtml = await renderVueToString(BlogListVue, { mediumPosts, devtoPosts }).catch(() => '')
    return { ssrHtml, mediumPosts, devtoPosts }
  },
  head: () => ({
    title: 'Blog | Yasin Ateş',
    meta: [
      ...seo({
        title: 'Blog | Yasin Ateş',
        description: 'Frontend geliştirme, web teknolojileri ve müzik üzerine blog yazılarım.',
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'frontend, yazılım, web, müzik, blog, yasin ateş, developer, react, proje'
      }),
      { name: 'canonical', content: 'https://yasinates.com/blog' },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Yasin Ateş Blog',
          url: 'https://yasinates.com/blog',
          description: 'Frontend geliştirme, web teknolojileri ve müzik üzerine blog yazıları.'
        })
      }
    ]
  }),
  component: () => {
    const { ssrHtml, mediumPosts, devtoPosts } = Route.useLoaderData()
    return (
      <TuvixReactApp
        name="blog-list-app"
        App={BlogListApp}
        ssrHtml={ssrHtml}
        mediumPosts={mediumPosts}
        devtoPosts={devtoPosts}
      />
    )
  },
})
