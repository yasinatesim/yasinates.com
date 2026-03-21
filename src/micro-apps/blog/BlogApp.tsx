/**
 * Standalone blog micro app — no TanStack Router dependency.
 * Routes between BlogList and PostDetail based on window.location.pathname.
 * Uses <a href> for navigation (full-page for SSR, event-bus for future SPA mode).
 */
import { useState, type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useMediumPosts } from '~/hooks/useMediumPosts'
import { useDevtoPosts } from '~/hooks/useDevtoPosts'
import { sharedQueryClient } from '../_shared/queryClient'
import blogStyles from '~/routes/blog.module.css'
import postStyles from '~/routes/$postId.module.css'

// ─── Types ──────────────────────────────────────────────────────────────────

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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getPostIdFromPath(): string | null {
  if (typeof window === 'undefined') return null
  const path = window.location.pathname
  // Matches /:postId — single path segment that isn't a known top-level route
  const knownRoutes = ['', 'blog', 'projeler', 'hakkimda', 'iletisim', 'github', 'youtube']
  const segment = path.replace(/^\//, '').split('/')[0]
  return segment && !knownRoutes.includes(segment) ? segment : null
}

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
      elements.push(<span key={key++} dangerouslySetInnerHTML={{ __html: html.slice(lastIndex, match.index) }} />)
    }
    const lang = match[1] ?? match[3] ?? match[5] ?? 'javascript'
    let code = match[2] ?? match[4] ?? match[6] ?? ''
    code = code
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
      .replace(/<br\s*\/?>(\\r?\\n)?/gi, '\n')
    elements.push(
      <div key={key++} className={postStyles.codeBlock}>
        <SyntaxHighlighter language={lang} style={oneDark} customStyle={{ borderRadius: 16, fontSize: 16, margin: 0, padding: 20, background: 'transparent' }} showLineNumbers>
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

// ─── BlogList ────────────────────────────────────────────────────────────────

function BlogList() {
  const [tab, setTab] = useState<'all' | 'medium' | 'devto'>('all')
  const mediumPosts = useMediumPosts()
  const devtoPosts = useDevtoPosts()

  const mediumWithSource: Post[] = ((mediumPosts.data as MediumPost[]) ?? []).map(
    p => ({ ...p, source: 'medium' as const, id: p.guid?.split('/').pop() ?? p.guid })
  )
  const devtoWithSource: Post[] = ((devtoPosts.data as DevToPost[]) ?? []).map(
    p => ({ ...p, source: 'devto' as const, id: String(p.id) })
  )

  let posts: Post[] = []
  if (tab === 'all') posts = [...mediumWithSource, ...devtoWithSource]
  else if (tab === 'medium') posts = mediumWithSource
  else posts = devtoWithSource

  return (
    <section className={blogStyles.section}>
      <div className={blogStyles.container}>
        <div className={blogStyles.heading}>
          <h2 className={blogStyles.title}>Blog Yazılarım</h2>
          <p className={blogStyles.subtitle}>Frontend geliştirme, web teknolojileri ve müzik üzerine paylaştığım yazılar.</p>
        </div>
        <div className={blogStyles.inner}>
          <div className={blogStyles.tabRow}>
            <div className={blogStyles.tabGroup}>
              {(['all', 'medium', 'devto'] as const).map((t) => (
                <button
                  key={t}
                  className={`${blogStyles.tab} ${tab === t ? blogStyles.tabActive : ''}`}
                  onClick={() => setTab(t)}
                >
                  {t === 'all' ? 'Tüm Yazılar' : t === 'medium' ? 'Medium' : 'Dev.to'}
                </button>
              ))}
            </div>
          </div>
          <div className={blogStyles.postList}>
            {posts.map((post) => {
              const isMedium = post.source === 'medium'
              let desc: string
              let image: string
              let reading: string
              if (isMedium) {
                desc = (post.description?.replace(/<[^>]+>/g, '').slice(0, 120) ?? '') + '...'
                image = post.thumbnail ?? post.description?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)?.[1] ?? ''
                reading = post.readingTime ?? '5 dk'
              } else {
                desc = (post.description?.slice(0, 120) ?? '') + '...'
                image = post.cover_image ?? ''
                reading = `${post.reading_time_minutes ?? 5} dk`
              }
              const iconClass = isMedium ? 'ri-medium-fill' : 'ri-code-box-fill'
              return (
                <article key={post.id} className={blogStyles.article}>
                  <div className={blogStyles.articleImg}>
                    {image && <img src={image} alt={post.title} />}
                  </div>
                  <div className={blogStyles.articleBody}>
                    <div className={blogStyles.articleMeta}>
                      <span className={blogStyles.metaItem}>
                        <i className="ri-time-line" aria-hidden="true" /> {reading}
                      </span>
                      <span className={blogStyles.metaItem}>
                        <i className={iconClass} aria-hidden="true" /> {isMedium ? 'Medium' : 'Dev.to'}
                      </span>
                    </div>
                    <h3 className={blogStyles.articleTitle}>
                      <a href={`/${post.id}`}>{post.title}</a>
                    </h3>
                    <p className={blogStyles.articleDesc}>{desc}</p>
                    <a href={`/${post.id}`} className={blogStyles.readMore}>
                      Devamını oku <i className="ri-arrow-right-line" aria-hidden="true" />
                    </a>
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

// ─── PostDetail ──────────────────────────────────────────────────────────────

function PostDetail({ postId }: { postId: string }) {
  const mediumPosts = useMediumPosts()
  const devtoPosts = useDevtoPosts()

  if (mediumPosts.isLoading || devtoPosts.isLoading) {
    return <div className={postStyles.status}>Yükleniyor...</div>
  }
  if (mediumPosts.isError || devtoPosts.isError) {
    return <div className={postStyles.status}>Bloglar alınamadı.</div>
  }

  const posts: Post[] = [
    ...((mediumPosts.data as MediumPost[]) ?? []).map(p => ({
      ...p, source: 'medium' as const, id: p.guid?.split('/').pop() ?? p.guid,
    })),
    ...((devtoPosts.data as DevToPost[]) ?? []).map(p => ({
      ...p, source: 'devto' as const, id: String(p.id),
    })),
  ]

  const post = posts.find(p => p.id === postId)
  if (!post) return <div className={postStyles.status}>Yazı bulunamadı.</div>

  const otherPosts = posts.filter(p => p.id !== postId).slice(0, 6)
  const isMedium = post.source === 'medium'

  let image: string
  let reading: string
  let content: string
  if (isMedium) {
    image = post.thumbnail ?? post.description?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)?.[1] ?? ''
    reading = post.readingTime ?? '5 dk'
    content = cleanMediumContent(post.content, post.title, image || undefined)
  } else {
    image = post.cover_image ?? ''
    reading = `${post.reading_time_minutes ?? 5} dk`
    content = post.body_html ?? post.description
  }

  return (
    <section className={postStyles.section}>
      <div className={postStyles.container}>
        <div className={postStyles.main}>
          <div className={postStyles.mainCard}>
            <div className={postStyles.postMeta}>
              <span className={postStyles.metaItem}>
                <i className="ri-time-line" aria-hidden="true" /> {reading}
              </span>
              <span className={postStyles.metaItem}>
                <i className={isMedium ? 'ri-medium-fill' : 'ri-code-box-fill'} aria-hidden="true" /> {isMedium ? 'Medium' : 'Dev.to'}
              </span>
            </div>
            <h1 className={postStyles.postTitle}>{post.title}</h1>
            {image && <img src={image} alt={post.title} className={postStyles.postCover} />}
            <article className={postStyles.prose}>{renderHtmlWithHighlight(content)}</article>
          </div>
        </div>
        <aside className={postStyles.sidebar}>
          <div className={postStyles.sidebarCard}>
            <h2 className={postStyles.sidebarTitle}>Diğer Yazılar</h2>
            <div className={postStyles.otherList}>
              {otherPosts.map((p) => {
                const isMediumOther = p.source === 'medium'
                const img = isMediumOther
                  ? (p.thumbnail ?? p.description?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)?.[1] ?? '')
                  : (p.cover_image ?? '')
                return (
                  <a key={p.id} href={`/${p.id}`} className={postStyles.otherLink}>
                    {img && <img src={img} alt={p.title} className={postStyles.otherImg} />}
                    <div>
                      <div className={postStyles.otherTitle}>{p.title}</div>
                      <div className={postStyles.otherSource}>
                        <i className={isMediumOther ? 'ri-medium-fill' : 'ri-code-box-fill'} aria-hidden="true" />
                        {isMediumOther ? 'Medium' : 'Dev.to'}
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

// ─── BlogApp (URL router) ────────────────────────────────────────────────────

function BlogRouter() {
  const postId = getPostIdFromPath()
  return postId ? <PostDetail postId={postId} /> : <BlogList />
}

export default function BlogApp() {
  return (
    <QueryClientProvider client={sharedQueryClient}>
      <Suspense fallback={<div style={{ padding: '5rem 1rem', color: '#6b7280' }}>Yükleniyor...</div>}>
        <BlogRouter />
      </Suspense>
    </QueryClientProvider>
  )
}
