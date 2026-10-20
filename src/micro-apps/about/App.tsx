import { Component, type ComponentType, type CSSProperties, type ReactNode, type SVGProps, Suspense } from 'react'
import { QueryClientProvider, HydrationBoundary, type DehydratedState } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { sharedQueryClient } from '../_shared/queryClient'
import { useGithubRepos } from '~/hooks/useGithubRepos'
import { useYoutubeFeed } from '~/hooks/useYoutubeFeed'
import { YOUTUBE_CHANNEL_ID } from '~/utils/fetchYoutubeVideos'
import {
  ArrowUpRightIcon,
  DevtoIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MediumIcon,
  PlayIcon,
  XIcon,
  YoutubeIcon,
} from '~/assets/icons/react'
import { TECH_ICONS } from './components/TechIcons'
import styles from './about.module.scss'

const STACK = [
  { name: 'HTML5', color: '#f97316' },
  { name: 'CSS3', color: '#3b82f6' },
  { name: 'SASS', color: '#ec4899' },
  { name: 'JavaScript', color: '#eab308' },
  { name: 'ES6', color: '#ca8a04' },
  { name: 'Babel', color: '#eab308' },
  { name: 'React', color: '#60a5fa' },
  { name: 'Redux', color: '#a855f7' },
  { name: 'Vue.js', color: '#10b981' },
  { name: 'Next.js', color: '#9ca3af' },
  { name: 'Remix', color: '#c026d3' },
  { name: 'TanStack', color: '#e11d48' },
  { name: 'Storybook', color: '#f472b6' },
  { name: 'TypeScript', color: '#1d4ed8' },
  { name: 'Yarn', color: '#60a5fa' },
  { name: 'Pnpm', color: '#d97706' },
  { name: 'Tailwind', color: '#0ea5e9' },
  { name: 'BEM', color: '#6b7280' },
  { name: 'Webpack', color: '#2563eb' },
  { name: 'Gulp', color: '#dc2626' },
  { name: 'GraphQL', color: '#db2777' },
  { name: 'PWA', color: '#4338ca' },
  { name: 'React Native', color: '#3b82f6' },
  { name: 'Node.js', color: '#16a34a' },
]

const SOCIALS: { name: string; url: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { name: 'GitHub', url: 'https://github.com/yasinatesim', Icon: GithubIcon },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yasinatesim', Icon: LinkedinIcon },
  { name: 'X', url: 'https://twitter.com/yasinatesim', Icon: XIcon },
  { name: 'Instagram', url: 'https://instagram.com/yasinatesim', Icon: InstagramIcon },
  { name: 'Medium', url: 'https://medium.com/@yasinatesim', Icon: MediumIcon },
  { name: 'Dev.to', url: 'https://dev.to/yasinatesim', Icon: DevtoIcon },
  { name: 'YouTube', url: `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`, Icon: YoutubeIcon },
]

const MUSIC_COUNT = 3
const UNKNOWN_COUNT = '—'

class DataBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) return this.props.fallback
    return <Suspense fallback={this.props.fallback}>{this.props.children}</Suspense>
  }
}

function RepoCount() {
  return useGithubRepos().data.length
}

function CountCard({ n, label, to }: { n: ReactNode; label: string; to: '/github' | '/blog' | '/youtube' }) {
  return (
    <Link className={`${styles.count} glass`} to={to} data-rv data-spot>
      <span className="spot" aria-hidden="true" />
      <span className={`${styles['count__n']} mono`}>{n}</span>
      <span className={styles['count__label']}>{label}</span>
      <ArrowUpRightIcon className={`i ${styles['count__go']}`} />
    </Link>
  )
}

export function Hakkimda({ postCount }: { postCount: number | null }) {
  const videos = useYoutubeFeed().data ?? []

  return (
    <main id="main" className="page-top">
      <div className="wrap">
        <header className={styles['page-head']} data-reveal>
          <nav className={`${styles.crumbs} micro`} aria-label="Sayfa konumu" data-rv>
            <Link to="/">Anasayfa</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Hakkımda</span>
          </nav>
          <p className={`${styles['page-head__badge']} micro`} data-rv>
            <span className="status-dot" />
            Kısaca Ben
          </p>
          <h1 data-rv>Hakkımda</h1>
          <p className={styles['page-head__sub']} data-rv>
            Frontend geliştirici olarak deneyimlerim
          </p>
        </header>

        <section className={styles['about-grid']} aria-label="Profil">
          <aside className={styles.profile} data-reveal>
            <div className={`${styles['profile__card']} glass`} data-rv data-spot>
              <span className="spot" aria-hidden="true" />
              <figure className={styles['profile__photo']} data-tilt="6">
                <img src="/yasin-ates-hakkimda.jpg" alt="Yasin Ateş Hakkımda Resmi" width={480} height={480} />
                <span className={styles['portrait__glare']} data-glare aria-hidden="true" />
              </figure>
              <div className={styles['profile__id']}>
                <h2 className={styles['profile__name']}>Yasin Ateş</h2>
                <p className={styles['profile__role']}>Frontend Developer</p>
              </div>
              <dl className={styles['profile__facts']}>
                <div>
                  <dt className="micro">Konum</dt>
                  <dd>İstanbul, Türkiye</dd>
                </div>
                <div>
                  <dt className="micro">E-posta</dt>
                  <dd>
                    <a href="mailto:yasinatesim@gmail.com">yasinatesim@gmail.com</a>
                  </dd>
                </div>
              </dl>
              <div>
                <ul className={`socials ${styles['profile__socials']}`}>
                  {SOCIALS.map((s) => (
                    <li key={s.name}>
                      <a className="social" href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                        <s.Icon />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <div className={styles['about-main']}>
            <div className={styles.bio} data-reveal>
              <p className={styles['bio__lead']} data-rv>
                2012 yılında başlayan yazılımcılık hikayeme, 2015 yılından beri Frontend Developer olarak devam ediyorum. Genellikle frontend ağırlıklı olmak üzere, yazılımla ilgili güncel teknolojileri takip etmeye çalışıyorum.
              </p>
              <p className={styles['bio__text']} data-rv>
                Medium'da paylaşmış olduğum Türkçe içerikleri, İngilizce olarak dev.to'da paylaşıyorum. Yazılım geliştirmenin yanı sıra müzikle de ilgileniyorum ve YouTube kanalımda müzik içerikleri paylaşıyorum.
              </p>
            </div>

            <ol className={styles.timeline} data-reveal aria-label="Yolculuk">
              <li className={styles['timeline__item']} data-rv>
                <p className={`${styles['timeline__year']} mono`}>2012</p>
                <p className={styles['timeline__text']}>Yazılımcılık hikayem başladı.</p>
              </li>
              <li className={styles['timeline__item']} data-rv>
                <p className={`${styles['timeline__year']} mono`}>2015</p>
                <p className={styles['timeline__text']}>Frontend Developer olarak devam ediyorum.</p>
              </li>
              <li className={`${styles['timeline__item']} ${styles['is-now']}`} data-rv>
                <p className={`${styles['timeline__year']} mono`}>Bugün</p>
                <p className={styles['timeline__text']}>Türkçe içerikler Medium'da, İngilizceleri dev.to'da; müzik YouTube kanalımda.</p>
              </li>
            </ol>

            <div className={styles.counts} data-reveal>
              <CountCard
                n={
                  <DataBoundary fallback={UNKNOWN_COUNT}>
                    <RepoCount />
                  </DataBoundary>
                }
                label="GitHub repository"
                to="/github"
              />
              <CountCard n={postCount ?? UNKNOWN_COUNT} label="blog yazısı" to="/blog" />
              <CountCard n={videos.length > 0 ? videos.length : UNKNOWN_COUNT} label="YouTube videosu" to="/youtube" />
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="tech-title">
          <div className={styles['list-head']} data-reveal>
            <h2 id="tech-title" className={styles['list-head__title']} data-rv>
              Kullandığım Teknolojiler
            </h2>
            <p className="micro" data-rv>
              {STACK.length} teknoloji
            </p>
          </div>
          <ul className={styles['tech-grid']}>
            {STACK.map((t) => (
              <li key={t.name} className={styles.tech} style={{ '--c': t.color } as CSSProperties} data-reveal data-rv-self data-spot>
                <span className="spot" aria-hidden="true" />
                <span className={styles['tech__ring']} aria-hidden="true">
                  {TECH_ICONS[t.name]}
                </span>
                <span className={styles['tech__name']}>{t.name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`section ${styles.music}`} aria-labelledby="music-title">
          <div className={`${styles['music__panel']} glass`} data-reveal data-spot>
            <span className="spot" aria-hidden="true" />
            <div className={styles['music__copy']}>
              <p className="micro" data-rv>
                YouTube
              </p>
              <h2 id="music-title" data-rv>
                Müzik
              </h2>
              <p data-rv>Yazılım geliştirmenin yanı sıra müzikle de ilgileniyorum ve YouTube kanalımda müzik içerikleri paylaşıyorum.</p>
              <div className={styles['music__ctas']} data-rv>
                <Link className="btn btn--primary btn--sm" to="/youtube" data-magnetic="0.25">
                  <span className="btn__label" data-magnetic-label>
                    Tüm Youtube İçeriklerimi Gör
                  </span>
                </Link>
              </div>
            </div>
            {videos.length > 0 && (
            <ul className={styles['music__list']}>
              {videos.slice(0, MUSIC_COUNT).map((v) => (
                <li key={v.videoId}>
                  <a className={styles.mrow} href={v.url} target="_blank" rel="noopener noreferrer">
                    <span className={styles['mrow__thumb']}>
                      <img src={v.thumbnail} alt="" loading="lazy" decoding="async" width={480} height={360} />
                    </span>
                    <span className={styles['mrow__body']}>
                      <span className={styles['mrow__title']}>{v.title}</span>
                      <span className="micro">
                        {v.published} · {v.views}
                      </span>
                    </span>
                    <span className={styles['mrow__go']}>
                      <PlayIcon />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default function AboutApp({ dehydratedState, postCount = null }: { dehydratedState?: DehydratedState; postCount?: number | null }) {
  return (
    <QueryClientProvider client={sharedQueryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Hakkimda postCount={postCount} />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
