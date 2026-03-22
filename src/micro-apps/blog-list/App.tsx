import { useEffect, useRef } from 'react'
import { createApp, createSSRApp } from 'vue'
import BlogListVue from './BlogList.vue'
import type { MediumPostListItem, DevToPostListItem } from '~/utils/fetchBlogPosts'

export default function BlogListApp({
  ssrHtml = '',
  mediumPosts = [],
  devtoPosts = [],
}: {
  ssrHtml?: string
  mediumPosts?: MediumPostListItem[]
  devtoPosts?: DevToPostListItem[]
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const app = el.hasChildNodes()
      ? createSSRApp(BlogListVue, { mediumPosts, devtoPosts })
      : createApp(BlogListVue, { mediumPosts, devtoPosts })
    app.mount(el)
    return () => app.unmount()
  }, [])

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: ssrHtml }} suppressHydrationWarning />
}
