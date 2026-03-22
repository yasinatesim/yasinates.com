import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, type ReactNode } from 'react'
import { useYoutubeFeed } from '~/hooks/useYoutubeFeed'

vi.mock('axios', () => ({
  default: { get: vi.fn() },
}))

import axios from 'axios'
const mockGet = vi.mocked(axios.get)

// Mock global fetch so thumbnail HEAD checks don't hit the network
const mockFetch = vi.fn().mockResolvedValue({ ok: true })
vi.stubGlobal('fetch', mockFetch)

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

function buildHtmlWithYtData(ytData: unknown): string {
  return `<html><script>var ytInitialData = ${JSON.stringify(ytData)};</script></html>`
}

function buildRichGridItem(videoId: string, title: string, views: string, published: string) {
  return {
    richItemRenderer: {
      content: {
        videoRenderer: {
          videoId,
          title: { runs: [{ text: title }] },
          descriptionSnippet: { runs: [{ text: 'A description' }] },
          viewCountText: { simpleText: views },
          publishedTimeText: { simpleText: published },
          thumbnail: {
            thumbnails: [
              { url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`, width: 320, height: 180 },
            ],
          },
        },
      },
    },
  }
}

function buildGridItem(videoId: string, title: string) {
  return {
    gridVideoRenderer: {
      videoId,
      title: { runs: [{ text: title }] },
      viewCountText: { simpleText: '100 views' },
      publishedTimeText: { simpleText: '2 days ago' },
      thumbnail: {
        thumbnails: [
          { url: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`, width: 320, height: 180 },
        ],
      },
    },
  }
}

describe('useYoutubeFeed', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns empty array when HTML has no ytInitialData', async () => {
    mockGet.mockResolvedValueOnce({ data: '<html>no data here</html>' })

    const { result } = renderHook(() => useYoutubeFeed(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toEqual([]))
  })

  it('parses richGridRenderer and returns video objects', async () => {
    const ytData = {
      contents: {
        twoColumnBrowseResultsRenderer: {
          tabs: [
            {
              tabRenderer: {
                content: {
                  richGridRenderer: {
                    contents: [buildRichGridItem('abc123', 'My Video', '1,000 views', '3 days ago')],
                  },
                },
              },
            },
          ],
        },
      },
    }
    mockGet.mockResolvedValueOnce({ data: buildHtmlWithYtData(ytData) })

    const { result } = renderHook(() => useYoutubeFeed(), { wrapper: makeWrapper() })

    await waitFor(() => {
      expect(result.current.data).toHaveLength(1)
    })
    const video = (result.current.data as { videoId: string; title: string; url: string }[])[0]
    expect(video.videoId).toBe('abc123')
    expect(video.title).toBe('My Video')
    expect(video.url).toBe('https://www.youtube.com/watch?v=abc123')
  })

  it('parses gridRenderer and returns video objects', async () => {
    const ytData = {
      contents: {
        twoColumnBrowseResultsRenderer: {
          tabs: [
            {
              tabRenderer: {
                content: {
                  gridRenderer: {
                    items: [buildGridItem('def456', 'Grid Video')],
                  },
                },
              },
            },
          ],
        },
      },
    }
    mockGet.mockResolvedValueOnce({ data: buildHtmlWithYtData(ytData) })

    const { result } = renderHook(() => useYoutubeFeed(), { wrapper: makeWrapper() })

    await waitFor(() => {
      expect(result.current.data).toHaveLength(1)
    })
    const video = (result.current.data as { videoId: string; title: string }[])[0]
    expect(video.videoId).toBe('def456')
    expect(video.title).toBe('Grid Video')
  })

  it('translates English view/time text to Turkish', async () => {
    const ytData = {
      contents: {
        twoColumnBrowseResultsRenderer: {
          tabs: [
            {
              tabRenderer: {
                content: {
                  richGridRenderer: {
                    contents: [
                      buildRichGridItem('xyz', 'Title', '500 views', '2 months ago'),
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    }
    mockGet.mockResolvedValueOnce({ data: buildHtmlWithYtData(ytData) })

    const { result } = renderHook(() => useYoutubeFeed(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toHaveLength(1))
    const video = (result.current.data as { views: string; published: string }[])[0]
    expect(video.views).toContain('görüntüleme')
    expect(video.published).toContain('ay')
    expect(video.published).toContain('önce')
  })

  it('returns empty array when ytInitialData contains no contents', async () => {
    const ytData = { header: {} }
    mockGet.mockResolvedValueOnce({ data: buildHtmlWithYtData(ytData) })

    const { result } = renderHook(() => useYoutubeFeed(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toEqual([]))
  })

  it('handles sectionListRenderer in ytData without crashing', async () => {
    const ytData = {
      contents: {
        sectionListRenderer: {
          contents: [{ sectionRenderer: { content: {} } }],
        },
      },
    }
    mockGet.mockResolvedValueOnce({ data: buildHtmlWithYtData(ytData) })

    const { result } = renderHook(() => useYoutubeFeed(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toEqual([]))
  })

  it('uses the API-provided thumbnail directly (no HEAD requests)', async () => {
    const ytData = {
      contents: {
        twoColumnBrowseResultsRenderer: {
          tabs: [
            {
              tabRenderer: {
                content: {
                  richGridRenderer: {
                    contents: [buildRichGridItem('thumb123', 'Thumb Video', '1 views', '1 day ago')],
                  },
                },
              },
            },
          ],
        },
      },
    }
    mockGet.mockResolvedValueOnce({ data: buildHtmlWithYtData(ytData) })

    const { result } = renderHook(() => useYoutubeFeed(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toHaveLength(1))
    const video = (result.current.data as { thumbnail: string }[])[0]
    expect(video.thumbnail).toBe('https://i.ytimg.com/vi/thumb123/hqdefault.jpg')
  })

  it('skips video items without a videoId', async () => {
    const ytData = {
      contents: {
        twoColumnBrowseResultsRenderer: {
          tabs: [
            {
              tabRenderer: {
                content: {
                  richGridRenderer: {
                    contents: [
                      // item without videoId
                      { richItemRenderer: { content: { videoRenderer: { videoId: '', title: { runs: [{ text: 'No ID' }] } } } } },
                      buildRichGridItem('real123', 'Real Video', '10 views', '1 day ago'),
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    }
    mockGet.mockResolvedValueOnce({ data: buildHtmlWithYtData(ytData) })

    const { result } = renderHook(() => useYoutubeFeed(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.data).toHaveLength(1))
    const video = (result.current.data as { videoId: string }[])[0]
    expect(video.videoId).toBe('real123')
  })
})
