import { Link } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { useLatestRepos } from '../useLatestRepos'
import { useYoutubeFeed } from '~/hooks/useYoutubeFeed'
import { CONTACT_EMAIL, HOME_STACK, LANG_COLOR, STACK, formatShort, type Tech } from '../content'
import { sourceLabel, type HomePost } from '../posts'
import { ArrowRightIcon, ArrowUpRightIcon, CopyIcon, ForkIcon, PlayIcon } from '~/assets/icons/react'
import DataBoundary from './DataBoundary'
import SignalArt from './SignalArt'
import Socials from './Socials'
import styles from './About.module.scss'

const s = (...names: string[]) => names.map((n) => styles[n]).join(' ')

function MarqueeRow({ items, reverse }: { items: readonly Tech[]; reverse: boolean }) {
  const chips = items.map((t) => (
    <li key={t.name} className={`chip ${styles['chip--tech']}`} style={{ '--c': t.color } as CSSProperties}>
      <span className={styles['chip__dot']} />
      {t.name}
    </li>
  ))
  return (
    <div className={`${styles['marquee']} ${reverse ? styles['marquee--rev'] : ''}`}>
      <ul className={styles['marquee__track']}>{chips}</ul>
      <ul className={styles['marquee__track']} aria-hidden="true">{chips}</ul>
    </div>
  )
}

function RepoTile() {
  const [repo] = useLatestRepos(1)
  if (!repo) return null
  return (
    <article className={s('tile', 'tile--repo')} data-spot data-tilt-in>
      <span className="spot" aria-hidden="true" />
      <div className={styles['tile__head']}>
        <p className="micro">Son GitHub projesi</p>
      </div>
      <h3 className={`${styles['tile__title']} mono`}>{repo.name}</h3>
      <p className={styles['tile__text']}>{repo.description || 'Açıklama eklenmemiş.'}</p>
      <div className={styles['tile__foot']}>
        <div className={styles['rcard__meta']}>
          {repo.language && (
            <span>
              <span className={styles['lang__dot']} style={{ '--c': LANG_COLOR[repo.language] ?? '#8a93a3' } as CSSProperties} />
              {repo.language}
            </span>
          )}
          {repo.fork && <span className={`chip ${styles['chip--fork']}`}><ForkIcon />Fork</span>}
          <span>{formatShort(repo.created_at)}</span>
        </div>
        <a className="link-arrow" href={repo.html_url} target="_blank" rel="noopener">
          GitHub&apos;da Gör <ArrowUpRightIcon />
        </a>
      </div>
    </article>
  )
}

function VideoTile() {
  const video = useYoutubeFeed().data?.[0]
  if (!video) return null
  return (
    <article className={s('tile', 'tile--video')} data-spot data-tilt-in>
      <span className="spot" aria-hidden="true" />
      <a className={styles['tile__cover-link']} href={video.url} target="_blank" rel="noopener">
        <div className={s('tile__cover', 'tile__cover--video')}>
          <img src={video.thumbnail} alt="" loading="lazy" decoding="async" width={480} height={360} />
          <span className={styles['vcard__play']}><PlayIcon /></span>
        </div>
        <p className="micro">Son video · {video.published} · {video.views}</p>
        <h3 className={styles['tile__title']}>{video.title}</h3>
        <span className="link-arrow">İzle <ArrowUpRightIcon /></span>
      </a>
    </article>
  )
}

function PostTile({ post }: { post: HomePost }) {
  return (
    <article className={s('tile', 'tile--post')} data-spot data-tilt-in>
      <span className="spot" aria-hidden="true" />
      <Link className={styles['tile__cover-link']} to="/$postId" params={{ postId: post.id }}>
        <div className={styles['tile__cover']}>
          {post.cover ? (
            <img src={post.cover} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
          ) : (
            <SignalArt seed={post.id + post.title} label={sourceLabel(post.source)} />
          )}
        </div>
        <p className="micro">Son yazı · {sourceLabel(post.source)} · {post.reading}</p>
        <h3 className={styles['tile__title']}>{post.title}</h3>
        <span className="link-arrow">Devamını Oku <ArrowRightIcon /></span>
      </Link>
    </article>
  )
}

const About = ({ latestPost }: { latestPost?: HomePost }) => {
  const homeTech = STACK.filter((t) => HOME_STACK.includes(t.name))
  const restTech = STACK.filter((t) => !HOME_STACK.includes(t.name))

  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <header className="sec-head" data-reveal>
          <h2 id="about-title" data-rv>Hakkımda</h2>
          <p className="sec-head__sub" data-rv>
            Frontend geliştirici olarak deneyimlerim ve müzik tutkumla birlikte profesyonel yolculuğum.
          </p>
        </header>
        <div className={styles['bento']}>
          <article className={s('tile', 'tile--about')} data-spot data-tilt-in>
            <span className="spot" aria-hidden="true" />
            <div className={styles['tile__about-media']}>
              <img src="/yasin-ates-hakkimda.jpg" alt="" loading="lazy" decoding="async" width={480} height={480} />
            </div>
            <div className={styles['tile__about-copy']}>
              <p className="micro">Kısaca ben</p>
              <p className={styles['tile__lead']}>
                2012 yılında başlayan yazılımcılık hikayeme, 2015 yılından beri Frontend Developer olarak devam ediyorum. Genellikle frontend ağırlıklı olmak üzere, yazılımla ilgili güncel teknolojileri takip etmeye çalışıyorum.
              </p>
              <p className={styles['tile__text']}>
                Medium&apos;da paylaşmış olduğum Türkçe içerikleri, İngilizce olarak dev.to&apos;da paylaşıyorum. Beni daha yakından tanımak ve hesaplarımı takip etmek için aşağıdaki bağlantıları takip edebilirsiniz.
              </p>
              <Link className="btn btn--ghost btn--sm" to="/hakkimda">
                Hakkımda <ArrowRightIcon />
              </Link>
            </div>
          </article>

          <article className={s('tile', 'tile--stack')} data-spot data-tilt-in>
            <span className="spot" aria-hidden="true" />
            <div className={styles['tile__head']}>
              <h3 className={styles['tile__label']}>Teknolojiler</h3>
              <p className="micro">{STACK.length} araç</p>
            </div>
            <MarqueeRow items={homeTech} reverse={false} />
            <MarqueeRow items={restTech} reverse />
          </article>

          <article className={s('tile', 'tile--mail')} data-spot data-tilt-in>
            <span className="spot" aria-hidden="true" />
            <p className="micro">E-posta</p>
            <a className={styles['tile__mail']} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <button className="btn btn--ghost btn--sm" type="button" data-copy-email>
              <CopyIcon /> Kopyala
            </button>
          </article>

          <DataBoundary fallback={<article className={s('tile', 'tile--repo')} aria-hidden="true" />}>
            <RepoTile />
          </DataBoundary>
          <VideoTile />
          {latestPost && <PostTile post={latestPost} />}

          <article className={s('tile', 'tile--social')} data-spot data-tilt-in>
            <span className="spot" aria-hidden="true" />
            <div className={styles['tile__head']}>
              <h3 className={styles['tile__label']}>Sosyal Medya</h3>
              <p className="micro">@yasinatesim</p>
            </div>
            <Socials className={styles['socials--tile']} labels />
          </article>
        </div>
      </div>
    </section>
  )
}

export default About
