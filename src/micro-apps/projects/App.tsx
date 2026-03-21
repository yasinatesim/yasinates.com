import { Component, type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { sharedQueryClient } from '../_shared/queryClient'
import { ProjelerPage } from '~/routes/projeler'

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '5rem 1rem', color: '#6b7280', textAlign: 'center' }}>
          Projeler yüklenirken bir hata oluştu.
        </div>
      )
    }
    return this.props.children
  }
}

export default function ProjectsApp() {
  return (
    <QueryClientProvider client={sharedQueryClient}>
      <ErrorBoundary>
        <Suspense fallback={<div style={{ padding: '5rem 1rem', color: '#6b7280' }}>Yükleniyor...</div>}>
          <ProjelerPage />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}
