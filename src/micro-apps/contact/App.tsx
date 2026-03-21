import { QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { sharedQueryClient } from '../_shared/queryClient'
import { Iletisim } from '~/routes/iletisim'

export default function ContactApp() {
  return (
    <QueryClientProvider client={sharedQueryClient}>
      <Suspense fallback={<div style={{ padding: '5rem 1rem', color: '#6b7280' }}>Yükleniyor...</div>}>
        <Iletisim />
      </Suspense>
    </QueryClientProvider>
  )
}
