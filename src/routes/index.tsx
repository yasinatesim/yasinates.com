import { createFileRoute } from '@tanstack/react-router'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { TuvixReactApp } from '@tuvix.js/react'
import HomeApp from '~/micro-apps/home/App'
import { renderVueToString } from '@tuvix.js/vue/server'
import ContactVue from '~/micro-apps/home/components/Contact.vue'
import BlogsVue from '~/micro-apps/home/components/Blogs.vue'
import { fetchYoutubeVideos, YOUTUBE_QUERY_KEY } from '~/utils/fetchYoutubeVideos'
import { fetchMediumPosts, fetchDevtoPosts } from '~/utils/fetchBlogPosts'
import { fetchAllGithubRepos, GITHUB_REPOS_QUERY_KEY } from '~/hooks/useGithubRepos'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/')(({
  loader: async () => {
    const qc = new QueryClient()
    const [mediumResult, devtoResult, contactResult] = await Promise.allSettled([
      fetchMediumPosts(),
      fetchDevtoPosts(),
      renderVueToString(ContactVue),
    ])
    const mediumPosts = mediumResult.status === 'fulfilled'
      ? mediumResult.value.map(({ content: _, ...p }) => p)
      : []
    const devtoPosts = devtoResult.status === 'fulfilled'
      ? devtoResult.value.map(({ body_html: _, ...p }) => p)
      : []
    const [blogsSsrResult] = await Promise.allSettled([
      renderVueToString(BlogsVue, { mediumPosts, devtoPosts }),
      fetchYoutubeVideos().then(videos => qc.setQueryData(YOUTUBE_QUERY_KEY, videos)),
      fetchAllGithubRepos().then(repos => qc.setQueryData(GITHUB_REPOS_QUERY_KEY, repos)),
    ])
    return {
      ssrHtml: contactResult.status === 'fulfilled' ? contactResult.value : '',
      blogsSsrHtml: blogsSsrResult.status === 'fulfilled' ? blogsSsrResult.value : '',
      mediumPosts,
      devtoPosts,
      dehydratedState: dehydrate(qc),
    }
  },
  head: () => ({
    title: 'Yasin Ateş | Frontend Developer, Web & Müzik',
    meta: [
      ...seo({
        title: 'Yasin Ateş | Frontend Developer, Web & Müzik',
        description: "Yasin Ateş'in kişisel web sitesi. Frontend geliştirme, projeler, blog yazıları ve müzik içerikleri.",
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'frontend, yazılım, web, müzik, yasin ateş, developer, react, blog, proje',
      }),
      { name: 'canonical', content: 'https://yasinates.com/' },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Yasin Ateş',
          url: 'https://yasinates.com/',
          sameAs: [
            'https://github.com/yasinatesim',
            'https://linkedin.com/in/yasinatesim',
            'https://twitter.com/yasinatesim',
            'https://instagram.com/yasinatesim',
            'https://medium.com/@yasinatesim',
            'https://dev.to/yasinatesim'
          ],
          jobTitle: 'Frontend Developer',
          image: 'https://yasinates.com/yasin-ates-hakkimda.jpg',
          description: 'Frontend geliştirici, web teknolojileri ve müzik ile ilgilenen yazılımcı.'
        })
      }
    ]
  }),
  component: () => {
    const { ssrHtml, blogsSsrHtml, mediumPosts, devtoPosts, dehydratedState } = Route.useLoaderData()
    return (
      <TuvixReactApp
        name="home-app"
        App={HomeApp}
        ssrHtml={ssrHtml}
        blogsSsrHtml={blogsSsrHtml}
        mediumPosts={mediumPosts}
        devtoPosts={devtoPosts}
        dehydratedState={dehydratedState}
      />
    )
  },
}))
