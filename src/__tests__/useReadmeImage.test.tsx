import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, type ReactNode } from 'react'
import { useReadmeImage } from '~/hooks/useReadmeImage'

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

describe('useReadmeImage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns absolute URL from <img> tag when not a badge', async () => {
    const md = `# Repo\n<img src="https://example.com/screenshot.png" alt="screenshot" />`
    mockGet.mockResolvedValueOnce({ data: md })

    const { result } = renderHook(() => useReadmeImage('owner', 'repo'), {
      wrapper: makeWrapper(),
    })

    await waitFor(() => expect(result.current).toBe('https://example.com/screenshot.png'))
  })

  it('skips badge <img> tag and falls back to markdown image', async () => {
    const md = [
      '# Repo',
      '<img src="https://img.shields.io/badge/status-active-green" />',
      '![Screenshot](https://example.com/screenshot.png)',
    ].join('\n')
    mockGet.mockResolvedValueOnce({ data: md })

    const { result } = renderHook(() => useReadmeImage('owner', 'repo'), {
      wrapper: makeWrapper(),
    })

    await waitFor(() => expect(result.current).toBe('https://example.com/screenshot.png'))
  })

  it('returns URL from markdown image when no img tag', async () => {
    const md = `# Repo\n![Screenshot](https://example.com/photo.jpg)`
    mockGet.mockResolvedValueOnce({ data: md })

    const { result } = renderHook(() => useReadmeImage('owner', 'repo'), {
      wrapper: makeWrapper(),
    })

    await waitFor(() => expect(result.current).toBe('https://example.com/photo.jpg'))
  })

  it('resolves relative path to raw.githubusercontent.com URL', async () => {
    const md = `# Repo\n![Screenshot](./assets/screenshot.png)`
    mockGet.mockResolvedValueOnce({ data: md })

    const { result } = renderHook(() => useReadmeImage('owner', 'repo'), {
      wrapper: makeWrapper(),
    })

    await waitFor(() =>
      expect(result.current).toBe(
        'https://raw.githubusercontent.com/owner/repo/master/assets/screenshot.png',
      ),
    )
  })

  it('resolves relative path without leading ./ to raw URL', async () => {
    const md = `# Repo\n![img](images/demo.gif)`
    mockGet.mockResolvedValueOnce({ data: md })

    const { result } = renderHook(() => useReadmeImage('owner', 'repo'), {
      wrapper: makeWrapper(),
    })

    await waitFor(() =>
      expect(result.current).toBe(
        'https://raw.githubusercontent.com/owner/repo/master/images/demo.gif',
      ),
    )
  })

  it('extracts emoji from badge URL when all images are badges', async () => {
    const md = `# Repo\n![emoji](https://img.shields.io/badge/🚗-white?style=flat)`
    mockGet.mockResolvedValueOnce({ data: md })

    const { result } = renderHook(() => useReadmeImage('owner', 'repo'), {
      wrapper: makeWrapper(),
    })

    await waitFor(() => expect(result.current).toBe('emoji:🚗'))
  })

  it('returns null when README has no images', async () => {
    const md = `# Repo\nJust some text with no images.`
    mockGet.mockResolvedValueOnce({ data: md })

    const { result } = renderHook(() => useReadmeImage('owner', 'repo'), {
      wrapper: makeWrapper(),
    })

    await waitFor(() => expect(result.current).toBeNull())
  })

  it('returns null when axios throws (README not found)', async () => {
    mockGet.mockRejectedValueOnce(new Error('404 Not Found'))

    const { result } = renderHook(() => useReadmeImage('owner', 'repo'), {
      wrapper: makeWrapper(),
    })

    await waitFor(() => expect(result.current).toBeNull())
  })

  it('returns null when badge URL has no emoji (text badge only)', async () => {
    // badge URL whose text is NOT an emoji → extractEmojiFromBadgeUrl returns null
    const md = `# Repo\n![status](https://img.shields.io/badge/status-active-green)`
    mockGet.mockResolvedValueOnce({ data: md })

    const { result } = renderHook(() => useReadmeImage('owner', 'repo'), {
      wrapper: makeWrapper(),
    })

    await waitFor(() => expect(result.current).toBeNull())
  })

  it('collects badge img tags and extracts emoji from them', async () => {
    // img tag with badge URL (no emoji in path), markdown badge too → reach secondary img loop
    const md = [
      '# Repo',
      // First img tag is a badge → skipped by initial check
      '<img src="https://img.shields.io/badge/🚀-blue" />',
      // Markdown image is also a badge (no emoji text) → collected in badgeUrls
      '![ci](https://travis-ci.org/badge)',
    ].join('\n')
    mockGet.mockResolvedValueOnce({ data: md })

    const { result } = renderHook(() => useReadmeImage('owner', 'repo'), {
      wrapper: makeWrapper(),
    })

    // The badge img tag has 🚀 emoji → returns emoji:🚀
    await waitFor(() => expect(result.current).toBe('emoji:🚀'))
  })

  it('calls the correct raw.githubusercontent.com URL', async () => {
    mockGet.mockResolvedValueOnce({ data: '' })

    const { result } = renderHook(() => useReadmeImage('myorg', 'myrepo'), {
      wrapper: makeWrapper(),
    })

    await waitFor(() => expect(result.current).toBeNull())
    expect(mockGet).toHaveBeenCalledWith(
      'https://raw.githubusercontent.com/myorg/myrepo/master/README.md',
    )
  })
})
