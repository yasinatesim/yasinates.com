import { QueryClientProvider, HydrationBoundary, type DehydratedState } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { sharedQueryClient } from '~/micro-apps/_shared/queryClient'
import { useYoutubeFeed, type YoutubeVideo } from '~/hooks/useYoutubeFeed'
import { YOUTUBE_CHANNEL_ID } from '~/utils/fetchYoutubeVideos'
import { ArrowUpRightIcon, CalendarIcon, EyeIcon, PlayIcon } from '~/assets/icons/react'
import styles from './youtube.module.scss'

const CHANNEL_URL = `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`

function fallbackToFeedThumb(e: SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget
  const hq = img.dataset.hq
  if (hq && img.src !== hq) img.src = hq
}

function FeatureVideo({ video }: { video: YoutubeVideo }) {
  const hiRes = video.thumbnail.replace('hqdefault', 'maxresdefault')
  return (
    <a className={styles['yt-feature__link']} href={video.url} target="_blank" rel="noopener noreferrer" data-rv>
      <div className={styles['yt-feature__media']} data-tilt="3">
        <img src={hiRes} alt="" width={1280} height={720} data-hq={video.thumbnail} onError={fallbackToFeedThumb} />
        <span className={`${styles['vcard__play']} ${styles['yt-feature__play']}`}>
          <PlayIcon />
        </span>
      </div>
      <div className={styles['yt-feature__body']}>
        <p className="micro">
          <span className="status-dot" />
          {video.published} · {video.views}
        </p>
        <h2 className={styles['yt-feature__title']}>{video.title}</h2>
        <span className="link-arrow">
          İzle <ArrowUpRightIcon />
        </span>
      </div>
    </a>
  )
}

function VideoCard({ video }: { video: YoutubeVideo }) {
  return (
    <article className={styles.vcard} data-spot>
      <span className="spot" aria-hidden="true" />
      <a className={styles['vcard__link']} href={video.url} target="_blank" rel="noopener noreferrer">
        <div className={styles['vcard__thumb']}>
          <img src={video.thumbnail} alt="" loading="lazy" decoding="async" width={480} height={360} />
          <span className={styles['vcard__play']}>
            <PlayIcon />
          </span>
        </div>
        <h3 className={styles['vcard__title']}>{video.title}</h3>
        <p className={`${styles['vcard__meta']} micro`}>
          <span>
            <CalendarIcon />
            {video.published}
          </span>
          <span>
            <EyeIcon />
            {video.views}
          </span>
        </p>
        <span className={styles['vcard__cta']}>
          İzle <ArrowUpRightIcon />
        </span>
      </a>
    </article>
  )
}

function YoutubePage() {
  const youtubeFeed = useYoutubeFeed()
  const videos = youtubeFeed.data ?? []
  const feature = videos.find((v) => /official music video/i.test(v.title)) ?? videos[0]

  return (
    <main id="main" className="page-top">
      <div className="wrap">
        <header className={`${styles['page-head']} ${styles['page-head--split']}`} data-reveal>
          <div>
            <nav className={`${styles.crumbs} micro`} aria-label="Sayfa konumu" data-rv>
              <Link to="/">Anasayfa</Link>
              <span aria-hidden="true">/</span>
              <Link to="/projeler">Projeler</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">YouTube</span>
            </nav>
            <h1 data-rv>Tüm YouTube İçeriklerim</h1>
            <p className={styles['page-head__sub']} data-rv>
              YouTube kanalımda yayınladığım tüm videoları buradan inceleyebilirsiniz.
            </p>
          </div>
          <a className="btn btn--primary" href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" data-rv data-magnetic>
            <span className="btn__label" data-magnetic-label>
              YouTube'da Aç <ArrowUpRightIcon />
            </span>
          </a>
        </header>

        {youtubeFeed.isPending && <p className={styles.loading}>Yükleniyor...</p>}

        {feature && (
          <section className={styles['yt-feature']} data-reveal aria-label="Öne çıkan video">
            <FeatureVideo video={feature} />
          </section>
        )}
        <div className={`${styles.vgrid} ${styles['vgrid--all']}`}>
          {videos
            .filter((v) => v !== feature)
            .map((video) => (
              <div key={video.videoId} className={styles['vgrid__cell']} data-reveal data-rv-self>
                <VideoCard video={video} />
              </div>
            ))}
        </div>
      </div>
    </main>
  )
}

export default function YoutubeApp({ dehydratedState }: { dehydratedState?: DehydratedState }) {
  return (
    <QueryClientProvider client={sharedQueryClient}>
      <HydrationBoundary state={dehydratedState}>
        <YoutubePage />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
