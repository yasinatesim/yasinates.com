import { createFileRoute } from '@tanstack/react-router'
import { TuvixApp } from '@tuvix.js/react'
import { useYoutubeFeed } from '~/hooks/useYoutubeFeed'
import { seo } from '~/utils/seo'
import styles from './youtube.module.scss'

export const Route = createFileRoute('/youtube')({
  component: () => <TuvixApp name="youtube-app" App={YoutubePage} />,
  head: () => ({
    title: 'YouTube Videoları | Yasin Ateş',
    meta: [
      ...seo({
        title: 'YouTube Videoları | Yasin Ateş',
        description: "Yasin Ateş'in YouTube kanalında yayınladığı tüm videolar.",
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'youtube, video, içerik, yasin ateş, frontend, müzik'
      }),
      { name: 'canonical', content: 'https://yasinates.com/youtube' },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'VideoGallery',
          name: 'YouTube Videoları',
          url: 'https://yasinates.com/youtube',
          description: "Yasin Ateş'in YouTube kanalında yayınladığı tüm videolar."
        })
      }
    ]
  }),
})

type YoutubeVideo = {
  videoId: string
  title: string
  thumbnail: string
  description?: string
  views?: string
  published: string
  url: string
}

function YoutubeCard({ video }: { video: YoutubeVideo }) {
  return (
    <div className={styles.card}>
      <div className={styles.thumbnail}>
        <a href={video.url} target="_blank" rel="noopener noreferrer">
          <img src={video.thumbnail} alt={video.title} />
        </a>
      </div>
      <div className={styles.cardBody}>
        <h4 className={styles.cardTitle}>{video.title}</h4>
        {video.description && (
          <p className={styles.cardDesc}>{video.description}</p>
        )}
        <div className={styles.spacer} />
        <div className={styles.footer}>
          <div className={styles.badges}>
            <span className={styles.dateBadge}>
              <i className="ri-calendar-line" aria-hidden="true" /> {video.published}
            </span>
            {video.views && (
              <span className={styles.viewsBadge}>
                <i className="ri-eye-line" aria-hidden="true" /> {video.views}
              </span>
            )}
          </div>
          <a href={video.url} target="_blank" rel="noopener noreferrer" className={styles.watchBtn}>
            <i className="ri-youtube-fill" aria-hidden="true" /> YouTube'da Aç
          </a>
        </div>
      </div>
    </div>
  )
}

export function YoutubePage() {
  const youtubeFeed = useYoutubeFeed()
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 className={styles.title}>
            <i className="ri-youtube-fill ri-xl" style={{ color: 'var(--color-red-600)' }} aria-hidden="true" /> Tüm YouTube İçeriklerim
          </h2>
          <p className={styles.subtitle}>YouTube kanalımda yayınladığım tüm videoları buradan inceleyebilirsiniz.</p>
        </div>
        <div className={styles.grid}>
          {(youtubeFeed.data as YoutubeVideo[])?.map((video) => (
            <YoutubeCard key={video.url} video={video} />
          ))}
        </div>
      </div>
    </section>
  )
}
