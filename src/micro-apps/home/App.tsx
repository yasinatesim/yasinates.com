import { QueryClientProvider, HydrationBoundary, hydrate, type DehydratedState } from '@tanstack/react-query'
import { Suspense } from 'react'
import { sharedQueryClient } from '~/micro-apps/_shared/queryClient'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Youtube from './components/Youtube'
import Blogs from './components/Blogs'
import Contact from './components/Contact'
import type { MediumPostListItem, DevToPostListItem } from '~/utils/fetchBlogPosts'
import { toHomePosts } from './posts'

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
  if (typeof window === 'undefined' && dehydratedState) hydrate(sharedQueryClient, dehydratedState)

  return (
    <QueryClientProvider client={sharedQueryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<div />}>
          <Hero />
          <About latestPost={toHomePosts(mediumPosts, devtoPosts)[0]} />
          <Projects />
          <Youtube />
          <Blogs ssrHtml={blogsSsrHtml} mediumPosts={mediumPosts} devtoPosts={devtoPosts} />
          <Contact ssrHtml={ssrHtml} />
        </Suspense>
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
