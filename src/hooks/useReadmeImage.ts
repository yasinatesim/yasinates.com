import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import axios from "axios"

function isBadge(url: string) {
  return /badge|shields|fury|travis|circleci|githubusercontent|img\.shields\.io/i.test(url)
}

export function useReadmeImage(owner: string, repo: string) {
  const { data } = useSuspenseQuery(
    queryOptions({
      queryKey: ['readme-image', owner, repo],
      queryFn: async () => {
        try {
          const res = await axios.get(`https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`)
          const md = res.data as string
          // Önce <img src="..."> ile eklenen ilk görseli bul
          const imgTagMatch = md.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)
          if (imgTagMatch && imgTagMatch[1] && !isBadge(imgTagMatch[1])) {
            return imgTagMatch[1]
          }
          // Yoksa, ilk markdown görselini (![](...)) bul, badge olmayanı al
          const mdImgRegex = /!\[[^\]]*\]\((.*?)\)/g
          let mdImgMatch
          while ((mdImgMatch = mdImgRegex.exec(md))) {
            if (mdImgMatch[1] && !isBadge(mdImgMatch[1])) {
              return mdImgMatch[1]
            }
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
