import { QueryClientProvider, HydrationBoundary, type DehydratedState } from '@tanstack/react-query'
import { Suspense } from 'react'
import { sharedQueryClient } from '~/micro-apps/_shared/queryClient'
import { useYoutubeFeed, type YoutubeVideo } from '~/hooks/useYoutubeFeed'
import styles from './youtube.module.scss'

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

function YoutubePage() {
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

export default function YoutubeApp({ dehydratedState }: { dehydratedState?: DehydratedState }) {
  return (
    <QueryClientProvider client={sharedQueryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<div style={{ padding: '5rem 1rem', color: '#6b7280' }}>Yükleniyor...</div>}>
          <YoutubePage />
        </Suspense>
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
