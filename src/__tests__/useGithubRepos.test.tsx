import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, type ReactNode } from 'react'
import { useGithubRepos } from '~/hooks/useGithubRepos'

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

function makeRepo(id: number) {
  return {
    id,
    name: `repo-${id}`,
    owner: { login: 'yasinatesim' },
    description: `desc ${id}`,
    language: 'TypeScript',
    html_url: `https://github.com/yasinatesim/repo-${id}`,
    topics: [],
    created_at: '2024-01-01T00:00:00Z',
    fork: false,
  }
}

describe('useGithubRepos', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns repos from a single page when count is less than 100', async () => {
    const repos = [makeRepo(1), makeRepo(2), makeRepo(3)]
    mockGet.mockResolvedValueOnce({ data: repos })

    const { result } = renderHook(() => useGithubRepos(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toHaveLength(3))
    expect(mockGet).toHaveBeenCalledTimes(1)
  })

  it('fetches multiple pages when first page is full (100 items)', async () => {
    const page1 = Array.from({ length: 100 }, (_, i) => makeRepo(i + 1))
    const page2 = [makeRepo(101), makeRepo(102)]

    mockGet
      .mockResolvedValueOnce({ data: page1 })
      .mockResolvedValueOnce({ data: page2 })

    const { result } = renderHook(() => useGithubRepos(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toHaveLength(102))
    expect(mockGet).toHaveBeenCalledTimes(2)
  })

  it('calls the GitHub API with correct params', async () => {
    mockGet.mockResolvedValueOnce({ data: [makeRepo(1)] })

    const { result } = renderHook(() => useGithubRepos(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toBeDefined())
    expect(mockGet).toHaveBeenCalledWith(
      'https://api.github.com/users/yasinatesim/repos',
      { params: { per_page: 100, page: 1 } },
    )
  })

  it('returns an empty array when API returns no repos', async () => {
    mockGet.mockResolvedValueOnce({ data: [] })

    const { result } = renderHook(() => useGithubRepos(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toHaveLength(0))
  })

  it('stops pagination exactly when page has fewer than 100 items', async () => {
    const page1 = Array.from({ length: 100 }, (_, i) => makeRepo(i + 1))
    const page2 = Array.from({ length: 99 }, (_, i) => makeRepo(i + 101))

    mockGet
      .mockResolvedValueOnce({ data: page1 })
      .mockResolvedValueOnce({ data: page2 })

    const { result } = renderHook(() => useGithubRepos(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toHaveLength(199))
    expect(mockGet).toHaveBeenCalledTimes(2)
  })
})
