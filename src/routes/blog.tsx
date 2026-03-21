import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useMediumPosts } from '~/hooks/useMediumPosts'
import { useDevtoPosts } from '~/hooks/useDevtoPosts'
import { seo } from '~/utils/seo'
import styles from './blog.module.css'

export const Route = createFileRoute('/blog')({
  component: () => <div data-tuvix-app="blog-app" />,
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

type MediumPost = {
  guid: string
  title: string
  description: string
  thumbnail: string | null
  readingTime?: string
}

type DevToPost = {
  id: number
  title: string
  description: string
  cover_image: string | null
  reading_time_minutes: number
}

type Post =
  | (MediumPost & { source: 'medium' })
  | (DevToPost & { source: 'devto' })

function Blog() {
  const [tab, setTab] = useState<'all' | 'medium' | 'devto'>('all')
  const mediumPosts = useMediumPosts()
  const devtoPosts = useDevtoPosts()

  const mediumWithSource: Post[] = ((mediumPosts.data as MediumPost[]) ?? []).map(
    p => ({ ...p, source: 'medium' as const })
  )
  const devtoWithSource: Post[] = ((devtoPosts.data as DevToPost[]) ?? []).map(
    p => ({ ...p, source: 'devto' as const })
  )

  let posts: Post[] = []
  if (tab === 'all') {
    posts = [...mediumWithSource, ...devtoWithSource]
  } else if (tab === 'medium') {
    posts = mediumWithSource
  } else {
    posts = devtoWithSource
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Blog Yazılarım</h2>
          <p className={styles.subtitle}>Frontend geliştirme, web teknolojileri ve müzik üzerine paylaştığım yazılar.</p>
        </div>

        <div className={styles.inner}>
          <div className={styles.tabRow}>
            <div className={styles.tabGroup}>
              <button
                className={`${styles.tab} ${tab === 'all' ? styles.tabActive : ''}`}
                onClick={() => setTab('all')}
              >
                Tüm Yazılar
              </button>
              <button
                className={`${styles.tab} ${tab === 'medium' ? styles.tabActive : ''}`}
                onClick={() => setTab('medium')}
              >
                Medium
              </button>
              <button
                className={`${styles.tab} ${tab === 'devto' ? styles.tabActive : ''}`}
                onClick={() => setTab('devto')}
              >
                Dev.to
              </button>
            </div>
          </div>

          <div className={styles.postList}>
            {(mediumPosts.isLoading || devtoPosts.isLoading) && (
              <div className={styles.status}>Yükleniyor...</div>
            )}
            {(mediumPosts.isError || devtoPosts.isError) && (
              <div className={styles.status}>Bloglar alınamadı.</div>
            )}
            {posts.map((post) => {
              const isMedium = post.source === 'medium'
              let id: string
              let desc: string
              let image: string
              let reading: string
              if (isMedium) {
                id = post.guid.split('/').pop() ?? post.guid
                desc = (post.description?.replace(/<[^>]+>/g, '').slice(0, 120) ?? '') + '...'
                image = post.thumbnail
                  ?? post.description?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)?.[1]
                  ?? ''
                reading = post.readingTime ?? '5 dk'
              } else {
                id = String(post.id)
                desc = (post.description?.slice(0, 120) ?? '') + '...'
                image = post.cover_image ?? ''
                reading = `${post.reading_time_minutes ?? 5} dk`
              }
              const title = post.title
              const sourceLabel = isMedium ? 'Medium' : 'Dev.to'
              const iconClass = isMedium ? 'ri-medium-fill' : 'ri-code-box-fill'

              return (
                <article key={id} className={styles.article}>
                  <div className={styles.articleImg}>
                    {image && <img src={image} alt={title} />}
                  </div>
                  <div className={styles.articleBody}>
                    <div className={styles.articleMeta}>
                      <span className={styles.metaItem}>
                        <i className="ri-time-line" aria-hidden="true" /> {reading}
                      </span>
                      <span className={styles.metaItem}>
                        <i className={iconClass} aria-hidden="true" /> {sourceLabel}
                      </span>
                    </div>
                    <h3 className={styles.articleTitle}>
                      <Link to="/$postId" params={{ postId: id }}>{title}</Link>
                    </h3>
                    <p className={styles.articleDesc}>{desc}</p>
                    <Link to="/$postId" params={{ postId: id }} className={styles.readMore}>
                      Devamını oku <i className="ri-arrow-right-line" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
