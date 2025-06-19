import { createFileRoute, useParams, Link } from '@tanstack/react-router'
import { useMediumPosts } from '~/hooks/useMediumPosts'
import { useDevtoPosts } from '~/hooks/useDevtoPosts'
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export const Route = createFileRoute('/$postId')({
  component: PostDetail,
})

// Kod bloklarını hem <pre><code> hem de <pre> veya <code> için yakala
function cleanMediumContent(html: string, postTitle: string, image?: string) {
  let result = html
  // Başlıkları (h1, h2, h3) post başlığı ile aynı olanları kaldır
  result = result.replace(new RegExp(`<h[1-3][^>]*>${postTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</h[1-3]>`, 'gi'), '')
  // <figure> içinde başlıkla aynı figcaption'ı kaldır
  result = result.replace(new RegExp(`<figure>.*?<figcaption[^>]*>${postTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\/figcaption>.*?<\/figure>`, 'gis'), '')
  // Ana görseli kaldır
  if (image) {
    result = result.replace(new RegExp(`<img[^>]*src=["']${image.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'i'), '')
  }
  return result
}

function renderHtmlWithHighlight(html: string) {
  const codeBlockRegex = /<pre><code(?: class=\"language-([a-zA-Z0-9]+)\")?>([\s\S]*?)<\/code><\/pre>|<pre(?: class=\"language-([a-zA-Z0-9]+)\")?>([\s\S]*?)<\/pre>|<code(?: class=\"language-([a-zA-Z0-9]+)\")?>([\s\S]*?)<\/code>/g
  let lastIndex = 0
  let match
  const elements: React.ReactNode[] = []
  let key = 0

  while ((match = codeBlockRegex.exec(html))) {
    if (match.index > lastIndex) {
      const before = html.slice(lastIndex, match.index)
      elements.push(<span key={key++} dangerouslySetInnerHTML={{ __html: before }} />)
    }
    let lang = match[1] || match[3] || match[5] || 'javascript'
    let code = match[2] || match[4] || match[6] || ''
    code = code
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/<br\s*\/?>(\r?\n)?/gi, '\n')
    elements.push(
      <div key={key++} className="my-6 rounded-xl overflow-auto border border-primary/10 bg-zinc-900/95">
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
    return <div className="container mx-auto py-20">Yükleniyor...</div>
  }
  if (mediumPosts.isError || devtoPosts.isError) {
    return <div className="container mx-auto py-20">Bloglar alınamadı.</div>
  }

  // Tüm postları birleştir
  const posts = [
    ...(mediumPosts.data || []).map((p: any) => ({ ...p, source: 'medium', id: p.guid?.split('/').pop() })),
    ...(devtoPosts.data || []).map((p: any) => ({ ...p, source: 'devto', id: String(p.id) })),
  ]

  // Detay postu bul
  const post = posts.find((p) => String(p.id) === String(postId))

  if (!post) {
    return <div className="container mx-auto py-20">Yazı bulunamadı.</div>
  }

  // Sidebar için diğer postlar (şu anki post hariç)
  const otherPosts = posts.filter((p) => String(p.id) !== String(postId)).slice(0, 6)

  // Medium ve Dev.to ayrımı
  const isMedium = post.source === 'medium'
  const image = isMedium
    ? (post.thumbnail || (post.description?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)?.[1] ?? ''))
    : post.cover_image
  const reading = isMedium ? (post.readingTime || '5 dk') : ((post.reading_time_minutes || '5') + ' dk')
  const sourceLabel = isMedium ? 'Medium' : 'Dev.to'
  const iconClass = isMedium ? 'ri-medium-fill' : 'ri-code-box-fill'

  // Modern ve daha şık bir görünüm
  return (
    <section className="py-20 bg-gradient-to-br from-white via-primary/5 to-secondary/10 min-h-[100vh]">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12">
        {/* Ana içerik */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white/90 rounded-3xl shadow-2xl p-10 mb-8 border border-primary/10">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <i className="ri-time-line"></i> {reading}
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <i className={iconClass}></i> {sourceLabel}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold mb-6 text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {post.title}
            </h1>
            {/* Sadece bir kez ana görseli göster */}
            {image && (
              <img src={image} alt={post.title} className="w-full h-80 object-cover rounded-2xl mb-10 shadow-lg border border-primary/10" />
            )}
            <article className="prose prose-lg max-w-none text-gray-900
              prose-pre:p-0 prose-pre:bg-transparent prose-pre:shadow-none prose-pre:border-0
              prose-code:before:hidden prose-code:after:hidden
              prose-a:text-primary prose-a:font-medium prose-a:underline-offset-2 prose-a:decoration-primary prose-a:transition-all prose-a:hover:text-secondary prose-a:p-1 prose-a:rounded prose-a:bg-primary/5 prose-a:hover:bg-secondary/10
              prose-h1:mt-12 prose-h1:mb-8 prose-h1:font-extrabold prose-h1:leading-tight
              prose-h2:mt-10 prose-h2:mb-5 prose-h2:font-bold prose-h2:leading-tight
              prose-h3:mt-8 prose-h3:mb-4 prose-h3:font-semibold prose-h3:leading-snug
              prose-p:leading-8 prose-p:my-6 prose-p:text-lg
              prose-li:my-2 prose-li:pl-2 prose-li:leading-7 prose-li:text-base
              prose-blockquote:my-8 prose-blockquote:pl-6 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:font-medium prose-blockquote:text-gray-700
              prose-img:my-8 prose-img:rounded-xl prose-img:shadow
              ">
              {renderHtmlWithHighlight(
                isMedium
                  ? cleanMediumContent(post.content, post.title, image)
                  : (post.body_html || post.description)
              )}
            </article>
          </div>
        </div>
        {/* Sidebar */}
        <aside className="w-full lg:w-1/3">
          <div className="bg-white/80 rounded-2xl shadow-lg p-8 border border-primary/10">
            <h2 className="text-xl font-bold mb-6 text-primary">Diğer Yazılar</h2>
            <div className="space-y-4">
              {otherPosts.map((p) => {
                const isMediumOther = p.source === 'medium'
                const img = isMediumOther
                  ? (p.thumbnail || (p.description?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)?.[1] ?? ''))
                  : p.cover_image
                return (
                  <Link
                    key={p.id}
                    to="/$postId"
                    params={{ postId: String(p.id) }}
                    className="flex items-center gap-4 p-2 rounded-xl hover:bg-primary/10 transition-colors group"
                  >
                    {img && (
                      <img src={img} alt={p.title} className="w-16 h-16 object-cover rounded-xl border border-primary/10 shadow" />
                    )}
                    <div>
                      <div className="text-base font-semibold line-clamp-2 group-hover:text-primary transition-colors">{p.title}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <i className={isMediumOther ? 'ri-medium-fill' : 'ri-code-box-fill'}></i> {isMediumOther ? 'Medium' : 'Dev.to'}
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