import { QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { sharedQueryClient } from '../_shared/queryClient'
import { GithubPage } from '~/routes/github'

export default function GithubApp() {
  return (
    <QueryClientProvider client={sharedQueryClient}>
      <Suspense fallback={<div style={{ padding: '5rem 1rem', color: '#6b7280' }}>Yükleniyor...</div>}>
        <GithubPage />
      </Suspense>
    </QueryClientProvider>
  )
}
