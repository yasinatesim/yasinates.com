import { createAPIFileRoute } from '@tanstack/react-start/api'

const CHANNEL_ID = 'UCMBBlJsFiUYu2akYvmdi99g'

export const APIRoute = createAPIFileRoute('/api/youtube')({
  GET: async () => {
    const url = `https://www.youtube.com/channel/${CHANNEL_ID}/videos`

    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
      },
    })

    const html = await res.text()

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=1800', // 30 min
      },
    })
  },
})
