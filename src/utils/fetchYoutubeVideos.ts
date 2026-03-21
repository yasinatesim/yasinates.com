/**
 * Server-side YouTube video fetcher.
 * Calls YouTube directly (no proxy) — intended for use in route loaders only.
 * Client-side data fetching goes through /api/youtube to avoid CORS.
 */

export const YOUTUBE_CHANNEL_ID = 'UCMBBlJsFiUYu2akYvmdi99g'
export const YOUTUBE_QUERY_KEY = ['youtube-feed', YOUTUBE_CHANNEL_ID] as const

// ─── Types ────────────────────────────────────────────────────────────────────

export type YoutubeVideo = {
  videoId: string
  title: string
  thumbnail: string
  description: string
  views: string
  published: string
  url: string
}

interface YtThumbnail {
  url: string
  width?: number
  height?: number
}

interface YtTextRun {
  text: string
}

interface YtText {
  runs?: YtTextRun[]
  simpleText?: string
}

interface YtVideoRenderer {
  videoId?: string
  title?: YtText
  descriptionSnippet?: YtText
  viewCountText?: YtText
  shortViewCountText?: YtText
  publishedTimeText?: YtText
  thumbnail?: { thumbnails: YtThumbnail[] }
}

interface YtRichGridRenderer {
  contents?: Array<{
    richItemRenderer?: {
      content?: { videoRenderer?: YtVideoRenderer }
    }
  }>
}

interface YtGridRenderer {
  items?: Array<{ gridVideoRenderer?: YtVideoRenderer }>
}

interface YtTabContent {
  richGridRenderer?: YtRichGridRenderer
  gridRenderer?: YtGridRenderer
}

interface YtTab {
  tabRenderer?: { content?: YtTabContent }
}

export interface YtInitialData {
  contents?: {
    twoColumnBrowseResultsRenderer?: { tabs?: YtTab[] }
    sectionListRenderer?: { contents?: unknown[] }
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getBestThumbnail(thumbnails: YtThumbnail[] | undefined, videoId: string): string {
  if (thumbnails && thumbnails.length > 0) {
    const sorted = [...thumbnails].sort((a, b) => {
      return ((b.width || 0) * (b.height || 0)) - ((a.width || 0) * (a.height || 0))
    })
    const best = sorted[0]
    if (best?.url) {
      return best.url.replace(/[?&](width|height|sqp|rs)=[^&]*/g, '').replace(/[?&]$/, '')
    }
  }
  return `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`
}

function turkishViews(views: string): string {
  if (!views) return ''
  const v = views.replace(/ views?/, '').replace(/,/g, '.').trim()
  if (v.endsWith('görüntüleme')) return v
  return v + ' görüntüleme'
}

function turkishPublished(published: string): string {
  if (!published) return ''
  return published
    .replace('years', 'yıl').replace('year', 'yıl')
    .replace('months', 'ay').replace('month', 'ay')
    .replace('weeks', 'hafta').replace('week', 'hafta')
    .replace('days', 'gün').replace('day', 'gün')
    .replace('hours', 'saat').replace('hour', 'saat')
    .replace('minutes', 'dakika').replace('minute', 'dakika')
    .replace('seconds', 'saniye').replace('second', 'saniye')
    .replace('ago', 'önce')
    .replace('Streamed', 'Yayınlandı')
}

function extractVideoRenderer(renderer: YtVideoRenderer): YoutubeVideo | null {
  const videoId = renderer.videoId ?? ''
  if (!videoId) return null
  return {
    videoId,
    title: renderer.title?.runs?.[0]?.text ?? renderer.title?.simpleText ?? '',
    thumbnail: getBestThumbnail(renderer.thumbnail?.thumbnails, videoId),
    description: renderer.descriptionSnippet?.runs?.[0]?.text ?? '',
    views: turkishViews(renderer.viewCountText?.simpleText ?? renderer.shortViewCountText?.simpleText ?? ''),
    published: turkishPublished(renderer.publishedTimeText?.simpleText ?? ''),
    url: `https://www.youtube.com/watch?v=${videoId}`,
  }
}

export function extractVideosFromYtData(ytData: YtInitialData): YoutubeVideo[] {
  const videos: YoutubeVideo[] = []
  const tabs = ytData?.contents?.twoColumnBrowseResultsRenderer?.tabs
  if (!tabs) return videos

  for (const tab of tabs) {
    const tabContent = tab.tabRenderer?.content

    // richGridRenderer
    for (const item of tabContent?.richGridRenderer?.contents ?? []) {
      const renderer = item?.richItemRenderer?.content?.videoRenderer
      if (renderer) {
        const video = extractVideoRenderer(renderer)
        if (video) videos.push(video)
      }
    }

    // gridRenderer
    for (const item of tabContent?.gridRenderer?.items ?? []) {
      const renderer = item?.gridVideoRenderer
      if (renderer) {
        const video = extractVideoRenderer(renderer)
        if (video) videos.push(video)
      }
    }
  }

  return videos
}

export function parseYoutubeHtml(html: string): YoutubeVideo[] {
  const patterns = [
    /var ytInitialData = ({.*?});/s,
    /window\["ytInitialData"\] = ({.*?});/s,
  ]
  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match) {
      try {
        return extractVideosFromYtData(JSON.parse(match[1]) as YtInitialData)
      } catch {
        // continue to next pattern
      }
    }
  }
  return []
}

// ─── Server-side fetcher ──────────────────────────────────────────────────────

export async function fetchYoutubeVideos(): Promise<YoutubeVideo[]> {
  const url = `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}/videos`
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
    },
  })
  return parseYoutubeHtml(await res.text())
}
