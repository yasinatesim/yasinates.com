import { createFileRoute } from '@tanstack/react-router'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { TuvixReactApp } from '@tuvix.js/react'
import HomeApp from '~/micro-apps/home/App'
import { renderVueToString } from '@tuvix.js/vue/server'
import ContactVue from '~/micro-apps/home/components/Contact.vue'
import BlogsVue from '~/micro-apps/home/components/Blogs.vue'
import { fetchYoutubeVideos, YOUTUBE_QUERY_KEY } from '~/utils/fetchYoutubeVideos'
import { fetchDevtoPosts } from '~/utils/fetchBlogPosts'
import { getMediumPosts } from '~/utils/getMediumPosts'
import { fetchAllGithubRepos, GITHUB_REPOS_QUERY_KEY } from '~/hooks/useGithubRepos'
import { PERSON_LD, SITE_NAME, SITE_URL, seo } from '~/utils/seo'

export const Route = createFileRoute('/')(({
  loader: async () => {
    const qc = new QueryClient()
    const [mediumResult, devtoResult, contactResult] = await Promise.allSettled([
      getMediumPosts(),
      fetchDevtoPosts(),
      renderVueToString(ContactVue),
    ])
    const mediumPosts = mediumResult.status === 'fulfilled' ? mediumResult.value : []
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
    meta: [
      ...seo({
        title: 'Yasin Ateş | Frontend Developer, Web & Müzik',
        url: 'https://yasinates.com/',
        description: "Yasin Ateş'in kişisel web sitesi. Frontend geliştirme, projeler, blog yazıları ve müzik içerikleri.",
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'frontend, yazılım, web, müzik, yasin ateş, developer, react, blog, proje',
      }),
    ],
    links: [{ rel: 'canonical', href: 'https://yasinates.com/' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              '@id': `${SITE_URL}/#website`,
              url: `${SITE_URL}/`,
              name: SITE_NAME,
              inLanguage: 'tr-TR',
              publisher: { '@id': PERSON_LD['@id'] },
            },
            PERSON_LD,
          ],
        }),
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
