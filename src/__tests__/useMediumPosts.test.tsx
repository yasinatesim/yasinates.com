import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, type ReactNode } from 'react'
import { useMediumPosts } from '~/hooks/useMediumPosts'

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

describe('useMediumPosts', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns items from the rss2json API response', async () => {
    const mockItems = [
      { guid: 'post-1', title: 'Title 1' },
      { guid: 'post-2', title: 'Title 2' },
    ]
    mockGet.mockResolvedValueOnce({ data: { items: mockItems } })

    const { result } = renderHook(() => useMediumPosts(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toEqual(mockItems))
  })

  it('calls the correct rss2json URL for the medium feed', async () => {
    mockGet.mockResolvedValueOnce({ data: { items: [] } })

    const { result } = renderHook(() => useMediumPosts(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toEqual([]))
    expect(mockGet).toHaveBeenCalledWith(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@yasinatesim',
    )
  })

  it('returns empty array when items is empty', async () => {
    mockGet.mockResolvedValueOnce({ data: { items: [] } })

    const { result } = renderHook(() => useMediumPosts(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toHaveLength(0))
  })
})
