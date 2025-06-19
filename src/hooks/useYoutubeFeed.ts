import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import axios from "axios"
import xml2js from 'xml2js'

export function useYoutubeFeed() {
  return useSuspenseQuery(
    queryOptions({
      queryKey: ['youtube-feed', 'UCMBBlJsFiUYu2akYvmdi99g'],
      queryFn: async () => {
        const res = await axios.get('https://www.youtube.com/feeds/videos.xml?channel_id=UCMBBlJsFiUYu2akYvmdi99g')
        let entries: any[] = []

        if (typeof window !== 'undefined') {
          // Client-side: window.DOMParser
          const parser = new window.DOMParser()
          const xml = parser.parseFromString(res.data, 'text/xml')
          entries = Array.from(xml.querySelectorAll('entry')).map((entry) => {
            const title = entry.querySelector('title')?.textContent || ''
            const link = entry.querySelector('link')?.getAttribute('href') || ''
            const published = entry.querySelector('published')?.textContent || ''
            // media:group içinden thumbnail, description, views
            const mediaGroup = entry.getElementsByTagName('media:group')[0]
            const mediaThumbnail = mediaGroup?.getElementsByTagName('media:thumbnail')[0]?.getAttribute('url') || ''
            const description = mediaGroup?.getElementsByTagName('media:description')[0]?.textContent || ''
            const views = mediaGroup?.getElementsByTagName('media:statistics')[0]?.getAttribute('views') || ''
            return { title, link, published, mediaThumbnail, description, views }
          })
        } else {
          // Server-side: xml2js
          const parsed = await xml2js.parseStringPromise(res.data)
          entries = (parsed.feed.entry || []).map((entry: any) => ({
            title: entry.title?.[0] || '',
            link: entry.link?.[0]?.$.href || '',
            published: entry.published?.[0] || '',
            mediaThumbnail: entry['media:group']?.[0]['media:thumbnail']?.[0]?.$.url || '',
            description: entry['media:group']?.[0]['media:description']?.[0] || '',
            views: entry['media:group']?.[0]['media:statistics']?.[0]?.$.views || '',
          }))
        }
        return entries
      },
      staleTime: 1000 * 60 * 60 * 24 * 14,
      gcTime: 1000 * 60 * 60 * 24 * 14,
    })
  )
}