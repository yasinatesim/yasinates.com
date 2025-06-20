import { createFileRoute } from '@tanstack/react-router'
import { useMediumPosts } from "~/hooks/useMediumPosts"
import { useDevtoPosts } from "~/hooks/useDevtoPosts"
import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { seo } from "~/utils/seo"

export const Route = createFileRoute('/blog')({
  component: Blog,
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
})

function Blog() {
  const [tab, setTab] = useState<'all' | 'medium' | 'devto'>('all')
  const mediumPosts = useMediumPosts()
  const devtoPosts = useDevtoPosts()

  let posts: any[] = []
  if (tab === 'all') {
    posts = [
      ...(mediumPosts.data || []).map((p: any) => ({ ...p, source: 'medium' })),
      ...(devtoPosts.data || []).map((p: any) => ({ ...p, source: 'devto' })),
    ]
  } else if (tab === 'medium') {
    posts = (mediumPosts.data || []).map((p: any) => ({ ...p, source: 'medium' }))
  } else if (tab === 'devto') {
    posts = (devtoPosts.data || []).map((p: any) => ({ ...p, source: 'devto' }))
  }

  return (
    <>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Blog Yazılarım</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Frontend geliştirme, web teknolojileri ve müzik üzerine paylaştığım yazılar.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-10">
              <div className="w-full max-w-md">
                <div className="relative flex border-b border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden">
                  <button
                    className={`flex-1 py-3 text-sm font-semibold ${tab === 'all' ? 'text-primary border-b-2 border-primary bg-gray-50' : 'text-gray-500 hover:text-primary hover:bg-gray-50 border-b-2 border-transparent'} transition-all focus:outline-none`}
                    onClick={() => setTab('all')}
                  >
                    Tüm Yazılar
                  </button>
                  <button
                    className={`flex-1 py-3 text-sm font-semibold ${tab === 'medium' ? 'text-primary border-b-2 border-primary bg-gray-50' : 'text-gray-500 hover:text-primary hover:bg-gray-50 border-b-2 border-transparent'} transition-all focus:outline-none`}
                    onClick={() => setTab('medium')}
                  >
                    Medium
                  </button>
                  <button
                    className={`flex-1 py-3 text-sm font-semibold ${tab === 'devto' ? 'text-primary border-b-2 border-primary bg-gray-50' : 'text-gray-500 hover:text-primary hover:bg-gray-50 border-b-2 border-transparent'} transition-all focus:outline-none`}
                    onClick={() => setTab('devto')}
                  >
                    Dev.to
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              {(mediumPosts.isLoading || devtoPosts.isLoading) && <div>Yükleniyor...</div>}
              {(mediumPosts.isError || devtoPosts.isError) && <div>Bloglar alınamadı.</div>}
              {posts.map((post: any) => {
                // Medium ve Dev.to için farklı alanlar var
                const isMedium = post.source === 'medium'
                const id = isMedium ? post.guid?.split('/').pop() : post.id
                const title = post.title
                const desc = isMedium ? post.description?.replace(/<[^>]+>/g, '').slice(0, 120) + '...' : post.description?.slice(0, 120) + '...'
                const image = isMedium
                  ? (post.thumbnail || (post.description?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)?.[1] ?? ''))
                  : post.cover_image
                const reading = isMedium ? (post.readingTime || '5 dk') : ((post.reading_time_minutes || '5') + ' dk')
                const sourceLabel = isMedium ? 'Medium' : 'Dev.to'
                const iconClass = isMedium ? 'ri-medium-fill' : 'ri-code-box-fill'
                return (
                  <article key={id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row card-hover">
                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                      {image && <img src={image} alt={title} className="w-full h-full object-cover object-top" />}
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <i className="ri-time-line"></i> {reading}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <i className={iconClass}></i> {sourceLabel}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        <Link to="/$postId" params={{ postId: String(id) }}>{title}</Link>
                      </h3>
                      <p className="text-gray-700 mb-4">{desc}</p>
                      <Link to="/$postId" params={{ postId: String(id) }} className="text-primary font-medium hover:underline flex items-center gap-1">
                        Devamını oku <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
