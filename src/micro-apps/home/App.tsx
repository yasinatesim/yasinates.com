import { QueryClientProvider, HydrationBoundary, type DehydratedState } from '@tanstack/react-query'
import { Suspense } from 'react'
import { sharedQueryClient } from '~/micro-apps/_shared/queryClient'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Blogs from './components/Blogs'
import Contact from './components/Contact'

export default function HomeApp({
  ssrHtml = '',
  dehydratedState,
}: {
  ssrHtml?: string
  dehydratedState?: DehydratedState
}) {
  return (
    <QueryClientProvider client={sharedQueryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<div />}>
          <Hero />
          <About />
          <Projects />
          <Blogs />
          <Contact ssrHtml={ssrHtml} />
        </Suspense>
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
