import { type ReactNode } from 'react'
import { createFileRoute, useParams, Link } from '@tanstack/react-router'
import { useMediumPosts } from '~/hooks/useMediumPosts'
import { useDevtoPosts } from '~/hooks/useDevtoPosts'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { seo } from '~/utils/seo'
import styles from './$postId.module.css'

export const Route = createFileRoute('/$postId')({
  component: PostDetail,
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

type MediumPost = {
  guid: string
  title: string
  description: string
  thumbnail: string | null
  readingTime?: string
  content: string
}

type DevToPost = {
  id: number
  title: string
  description: string
  cover_image: string | null
  reading_time_minutes: number
  body_html: string
}

type Post =
  | (MediumPost & { source: 'medium'; id: string })
  | (Omit<DevToPost, 'id'> & { source: 'devto'; id: string })

function cleanMediumContent(html: string, postTitle: string, image?: string) {
  let result = html
  result = result.replace(new RegExp(`<h[1-3][^>]*>${postTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</h[1-3]>`, 'gi'), '')
  result = result.replace(new RegExp(`<figure>.*?<figcaption[^>]*>${postTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/figcaption>.*?<\\/figure>`, 'gis'), '')
  if (image) {
    result = result.replace(new RegExp(`<img[^>]*src=["']${image.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'i'), '')
  }
  return result
}

function renderHtmlWithHighlight(html: string) {
  const codeBlockRegex = /<pre><code(?: class="language-([a-zA-Z0-9]+)")?>([\\s\\S]*?)<\/code><\/pre>|<pre(?: class="language-([a-zA-Z0-9]+)")?>([\\s\\S]*?)<\/pre>|<code(?: class="language-([a-zA-Z0-9]+)")?>([\\s\\S]*?)<\/code>/g
  let lastIndex = 0
  let match
  const elements: ReactNode[] = []
  let key = 0

  while ((match = codeBlockRegex.exec(html))) {
    if (match.index > lastIndex) {
      const before = html.slice(lastIndex, match.index)
      elements.push(<span key={key++} dangerouslySetInnerHTML={{ __html: before }} />)
    }
    const lang = match[1] ?? match[3] ?? match[5] ?? 'javascript'
    let code = match[2] ?? match[4] ?? match[6] ?? ''
    code = code
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/<br\s*\/?>(\r?\n)?/gi, '\n')
    elements.push(
      <div key={key++} className={styles.codeBlock}>
        <SyntaxHighlighter
          language={lang}
          style={oneDark}
          customStyle={{ borderRadius: 16, fontSize: 16, margin: 0, padding: 20, background: 'transparent' }}
          showLineNumbers
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    )
    lastIndex = codeBlockRegex.lastIndex
  }
  if (lastIndex < html.length) {
    elements.push(<span key={key++} dangerouslySetInnerHTML={{ __html: html.slice(lastIndex) }} />)
  }
  return elements
}

function PostDetail() {
  const { postId } = useParams({ strict: false })
  const mediumPosts = useMediumPosts()
  const devtoPosts = useDevtoPosts()

  if (mediumPosts.isLoading || devtoPosts.isLoading) {
    return <div className={styles.status}>Yükleniyor...</div>
  }
  if (mediumPosts.isError || devtoPosts.isError) {
    return <div className={styles.status}>Bloglar alınamadı.</div>
  }

  const posts: Post[] = [
    ...((mediumPosts.data as MediumPost[]) ?? []).map(p => ({
      ...p,
      source: 'medium' as const,
      id: p.guid?.split('/').pop() ?? p.guid,
    })),
    ...((devtoPosts.data as DevToPost[]) ?? []).map(p => ({
      ...p,
      source: 'devto' as const,
      id: String(p.id),
    })),
  ]

  const post = posts.find(p => p.id === String(postId))

  if (!post) {
    return <div className={styles.status}>Yazı bulunamadı.</div>
  }

  const otherPosts = posts.filter(p => p.id !== String(postId)).slice(0, 6)
  const isMedium = post.source === 'medium'

  let image: string
  let reading: string
  let content: string
  if (isMedium) {
    image = post.thumbnail
      ?? post.description?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)?.[1]
      ?? ''
    reading = post.readingTime ?? '5 dk'
    content = cleanMediumContent(post.content, post.title, image || undefined)
  } else {
    image = post.cover_image ?? ''
    reading = `${post.reading_time_minutes ?? 5} dk`
    content = post.body_html ?? post.description
  }

  const sourceLabel = isMedium ? 'Medium' : 'Dev.to'
  const iconClass = isMedium ? 'ri-medium-fill' : 'ri-code-box-fill'

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Main content */}
        <div className={styles.main}>
          <div className={styles.mainCard}>
            <div className={styles.postMeta}>
              <span className={styles.metaItem}>
                <i className="ri-time-line" aria-hidden="true" /> {reading}
              </span>
              <span className={styles.metaItem}>
                <i className={iconClass} aria-hidden="true" /> {sourceLabel}
              </span>
            </div>
            <h1 className={styles.postTitle}>{post.title}</h1>
            {image && (
              <img src={image} alt={post.title} className={styles.postCover} />
            )}
            <article className={styles.prose}>
              {renderHtmlWithHighlight(content)}
            </article>
          </div>
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h2 className={styles.sidebarTitle}>Diğer Yazılar</h2>
            <div className={styles.otherList}>
              {otherPosts.map((p) => {
                const isMediumOther = p.source === 'medium'
                const img = isMediumOther
                  ? (p.thumbnail ?? p.description?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)?.[1] ?? '')
                  : (p.cover_image ?? '')
                return (
                  <Link
                    key={p.id}
                    to="/$postId"
                    params={{ postId: p.id }}
                    className={styles.otherLink}
                  >
                    {img && (
                      <img src={img} alt={p.title} className={styles.otherImg} />
                    )}
                    <div>
                      <div className={styles.otherTitle}>{p.title}</div>
                      <div className={styles.otherSource}>
                        <i className={isMediumOther ? 'ri-medium-fill' : 'ri-code-box-fill'} aria-hidden="true" />
                        {isMediumOther ? 'Medium' : 'Dev.to'}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
