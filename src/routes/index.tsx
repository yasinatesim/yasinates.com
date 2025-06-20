import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import axios from 'axios'
import xml2js from 'xml2js'
import Hero from '~/components/Home/Hero'
import About from '~/components/Home/About'
import Projects from '~/components/Home/Projects'
import Blogs from '~/components/Home/Blogs'
import Contact from '~/components/Home/Contact'

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    title: 'Yasin Ateş | Frontend Developer, Web & Müzik',
    meta: [
      { name: 'description', content: "Yasin Ateş'in kişisel web sitesi. Frontend geliştirme, projeler, blog yazıları ve müzik içerikleri." },
      { property: 'og:title', content: 'Yasin Ateş | Frontend Developer, Web & Müzik' },
      { property: 'og:description', content: "Yasin Ateş'in kişisel web sitesi. Frontend geliştirme, projeler, blog yazıları ve müzik içerikleri." },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://yasinates.com/' },
      { property: 'og:image', content: 'https://yasinates.com/og-image.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Yasin Ateş | Frontend Developer, Web & Müzik' },
      { name: 'twitter:description', content: "Yasin Ateş'in kişisel web sitesi. Frontend geliştirme, projeler, blog yazıları ve müzik içerikleri." },
      { name: 'twitter:image', content: 'https://yasinates.com/og-image.jpg' },
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
})

function Home() {

  return (
    <>
      <Hero />

      <About />

      <Projects />

      <Blogs />

      <Contact />


    </>
  )
}
