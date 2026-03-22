import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, type ReactNode } from 'react'
import { useDevtoPosts } from '~/hooks/useDevtoPosts'

vi.mock('axios', () => ({
  default: { get: vi.fn() },
}))

import axios from 'axios'
const mockGet = vi.mocked(axios.get)

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>{children}</Suspense>
    </QueryClientProvider>
  )
}

describe('useDevtoPosts', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns articles from the dev.to API', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', description: 'desc' },
      { id: 2, title: 'Post 2', description: 'desc' },
    ]
    mockGet.mockResolvedValueOnce({ data: mockPosts })

    const { result } = renderHook(() => useDevtoPosts(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toEqual(mockPosts))
  })

  it('calls the correct dev.to URL', async () => {
    mockGet.mockResolvedValueOnce({ data: [] })

    const { result } = renderHook(() => useDevtoPosts(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toEqual([]))
    expect(mockGet).toHaveBeenCalledWith(
      'https://dev.to/api/articles?username=yasinatesim',
    )
  })

  it('returns an empty array when API returns no posts', async () => {
    mockGet.mockResolvedValueOnce({ data: [] })

    const { result } = renderHook(() => useDevtoPosts(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toHaveLength(0))
  })
})
