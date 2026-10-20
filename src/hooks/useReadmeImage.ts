import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import axios from "axios"

const EMOJI_RE = /\p{Emoji_Presentation}|\p{Extended_Pictographic}/u

function isBadge(url: string) {
  return /badge|shields|fury|travis|circleci|img\.shields\.io/i.test(url)
}

function extractEmojiFromBadgeUrl(url: string): string | null {
  const match = url.match(/\/badge\/([^-?]+)/)
  if (match && EMOJI_RE.test(match[1])) return match[1]
  return null
}

function resolveImageUrl(src: string, owner: string, repo: string): string {
  if (/^https?:\/\//i.test(src)) return src
  const cleanPath = src.replace(/^\.\//, '')
  return `https://raw.githubusercontent.com/${owner}/${repo}/master/${cleanPath}`
}

export function useReadmeImage(owner: string, repo: string) {
  const { data } = useSuspenseQuery(
    queryOptions({
      queryKey: ['readme-image', owner, repo],
      queryFn: async () => {
        try {
          const res = await axios.get(`https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`)
          const md = res.data as string
          const imgTagMatch = md.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)
          if (imgTagMatch && imgTagMatch[1] && !isBadge(imgTagMatch[1])) {
            return resolveImageUrl(imgTagMatch[1], owner, repo)
          }
          const mdImgRegex = /!\[[^\]]*\]\((.*?)\)/g
          let mdImgMatch
          const badgeUrls: string[] = []
          while ((mdImgMatch = mdImgRegex.exec(md))) {
            const src = mdImgMatch[1]
            if (!src) continue
            if (!isBadge(src)) return resolveImageUrl(src, owner, repo)
            badgeUrls.push(src)
          }
          const imgTagRegex = /<img[^>]*src=["']([^"'>]+)["'][^>]*>/gi
          let imgMatch
          while ((imgMatch = imgTagRegex.exec(md))) {
            if (imgMatch[1] && isBadge(imgMatch[1])) badgeUrls.push(imgMatch[1])
          }
          for (const url of badgeUrls) {
            const emoji = extractEmojiFromBadgeUrl(url)
            if (emoji) return `emoji:${emoji}`
          }
          return null
        } catch {
          return null
        }
      },
      staleTime: 1000 * 60 * 60 * 24 * 14,
      gcTime: 1000 * 60 * 60 * 24 * 14,
    })
  )
  return data
}
