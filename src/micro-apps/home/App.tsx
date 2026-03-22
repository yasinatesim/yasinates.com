import { QueryClientProvider, HydrationBoundary, type DehydratedState } from '@tanstack/react-query'
import { Suspense } from 'react'
import { sharedQueryClient } from '~/micro-apps/_shared/queryClient'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Blogs from './components/Blogs'
import Contact from './components/Contact'
import type { MediumPostListItem, DevToPostListItem } from '~/utils/fetchBlogPosts'

export default function HomeApp({
  ssrHtml = '',
  blogsSsrHtml = '',
  mediumPosts = [],
  devtoPosts = [],
  dehydratedState,
}: {
  ssrHtml?: string
  blogsSsrHtml?: string
  mediumPosts?: MediumPostListItem[]
  devtoPosts?: DevToPostListItem[]
  dehydratedState?: DehydratedState
}) {
  return (
    <QueryClientProvider client={sharedQueryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<div />}>
          <Hero />
          <About />
          <Projects />
          <Blogs ssrHtml={blogsSsrHtml} mediumPosts={mediumPosts} devtoPosts={devtoPosts} />
          <Contact ssrHtml={ssrHtml} />
        </Suspense>
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
