import { useEffect, useRef } from 'react'
import { createApp, createSSRApp } from 'vue'
import PostDetailVue from './PostDetail.vue'
import type { MediumPostListItem, DevToPostListItem } from '~/utils/fetchBlogPosts'

export default function PostDetailApp({
  ssrHtml = '',
  postId = '',
  content = '',
  mediumPosts = [],
  devtoPosts = [],
}: {
  ssrHtml?: string
  postId?: string
  content?: string
  mediumPosts?: MediumPostListItem[]
  devtoPosts?: DevToPostListItem[]
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const app = el.hasChildNodes()
      ? createSSRApp(PostDetailVue, { postId, content, mediumPosts, devtoPosts })
      : createApp(PostDetailVue, { postId, content, mediumPosts, devtoPosts })
    app.mount(el)
    return () => app.unmount()
  }, [])

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: ssrHtml }} suppressHydrationWarning />
}
