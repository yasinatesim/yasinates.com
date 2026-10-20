import { Link } from '@tanstack/react-router'
import { useYoutubeFeed } from '~/hooks/useYoutubeFeed'
import { ArrowUpRightIcon, CalendarIcon, EyeIcon, PlayIcon } from '~/assets/icons/react'
import styles from './Youtube.module.scss'

const Youtube = () => {
  const videos = (useYoutubeFeed().data ?? []).slice(0, 6)

  return (
    <section className={styles['pan']} data-pan aria-labelledby="yt-title">
      <div className={styles['pan__sticky']}>
        <div className={`wrap ${styles['pan__head']}`}>
          <h2 id="yt-title" className={styles['list-head__title']}>Son YouTube İçeriklerim</h2>
          <Link className="link-arrow" to="/youtube">Tüm Youtube İçeriklerimi Gör</Link>
        </div>
        <div className={styles['pan__viewport']}>
          <ul className={styles['pan__track']} data-pan-track>
            {videos.map((v) => (
              <li key={v.videoId} className={styles['pan__item']}>
                <article className={styles['vcard']} data-spot>
                  <span className="spot" aria-hidden="true" />
                  <a className={styles['vcard__link']} href={v.url} target="_blank" rel="noopener">
                    <div className={styles['vcard__thumb']}>
                      <img src={v.thumbnail} alt="" loading="lazy" decoding="async" width={480} height={360} />
                      <span className={styles['vcard__play']}><PlayIcon /></span>
                    </div>
                    <h3 className={styles['vcard__title']}>{v.title}</h3>
                    <p className={`${styles['vcard__meta']} micro`}>
                      <span><CalendarIcon />{v.published}</span>
                      <span><EyeIcon />{v.views}</span>
                    </p>
                    <span className={styles['vcard__cta']}>İzle <ArrowUpRightIcon /></span>
                  </a>
                </article>
              </li>
            ))}
          </ul>
        </div>
        <div className={`wrap ${styles['pan__progress']}`} aria-hidden="true">
          <span data-pan-progress />
        </div>
      </div>
    </section>
  )
}

export default Youtube
