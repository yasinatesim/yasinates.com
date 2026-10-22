import { Component, type CSSProperties, type ReactNode, Suspense } from 'react'
import { QueryClientProvider, HydrationBoundary, type DehydratedState } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { sharedQueryClient } from '../_shared/queryClient'
import { useGithubRepos, type GithubRepo } from '~/hooks/useGithubRepos'
import { OTHER_PROJECTS } from '~/constants/projects'
import { useYoutubeFeed, type YoutubeVideo } from '~/hooks/useYoutubeFeed'
import { ArrowRightIcon, ArrowUpRightIcon, CalendarIcon, EyeIcon, FolderIcon, ForkIcon, PlayIcon, RepoIcon, StarIcon } from '~/assets/icons/react'
import { LogoPlate } from './components/LogoPlate'
import styles from './projeler.module.scss'

type Project = (typeof OTHER_PROJECTS)[number]

const REPO_COUNT = 9

const LANG_COLOR: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#663399',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Python: '#3572a5',
  Shell: '#89e051',
  Svelte: '#ff3e00',
  Dart: '#00b4ab',
  Swift: '#f05138',
  Kotlin: '#a97bff',
  'Jupyter Notebook': '#da5b0b',
}

const dateFmt = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })

function ProjectCard({ project }: { project: Project }) {
  const [title, ...rest] = project.title.split(' - ')
  const subtitle = rest.join(' - ')
  return (
    <article className={styles.pcard} data-spot data-tilt="5">
      <span className="spot" aria-hidden="true" />
      <a className={styles['pcard__link']} href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${title}: İncele`} />
      {'imageFit' in project && project.imageFit === 'contain' ? (
        <div className="media">
          <LogoPlate src={project.image} alt={project.alt ?? project.title} label={title} />
        </div>
      ) : (
        <div className="media">
          <img src={project.image} alt={project.alt ?? project.title} loading="lazy" decoding="async" />
        </div>
      )}
      <div className={styles['pcard__body']}>
        <h3 className={styles['pcard__title']}>{title}</h3>
        {subtitle && <p className={styles['pcard__sub']}>{subtitle}</p>}
        <p className={styles['pcard__desc']}>{project.desc}</p>
        <ul className="tags" aria-label="Teknolojiler">
          {project.tags.slice(0, 4).map((tag) => (
            <li key={tag.text} className="chip">
              {tag.text}
            </li>
          ))}
        </ul>
        <span className={styles['pcard__cta']}>
          İncele <ArrowRightIcon />
        </span>
      </div>
    </article>
  )
}

function RepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <article className={styles.rcard} data-spot>
      <span className="spot" aria-hidden="true" />
      <div className={styles['rcard__top']}>
        <span className={styles['rcard__ico']}>
          <RepoIcon />
        </span>
        <p className="micro">Oluşturulma: {dateFmt.format(new Date(repo.created_at))}</p>
      </div>
      <h3 className={styles['rcard__name']}>{repo.name}</h3>
      <p className={styles['rcard__desc']}>{repo.description || 'Açıklama eklenmemiş.'}</p>
      {repo.topics && repo.topics.length > 0 && (
        <ul className="tags">
          {repo.topics.slice(0, 5).map((topic) => (
            <li key={topic} className="chip">
              {topic}
            </li>
          ))}
        </ul>
      )}
      <div className={styles['rcard__foot']}>
        <div className={styles['rcard__meta']}>
          {repo.language && (
            <span>
              <span className={styles['lang__dot']} style={{ '--c': LANG_COLOR[repo.language] ?? '#8a93a3' } as CSSProperties} />
              {repo.language}
            </span>
          )}
          <span>
            <StarIcon />
            {repo.stargazers_count ?? 0}
          </span>
          {repo.fork && (
            <span className={`chip ${styles['chip--fork']}`}>
              <ForkIcon />
              Fork
            </span>
          )}
        </div>
        <a className="link-arrow" href={repo.html_url} target="_blank" rel="noopener noreferrer">
          GitHub'da Gör <ArrowUpRightIcon />
          <span className="sr-only"> ({repo.name})</span>
        </a>
      </div>
    </article>
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

function Repos() {
  const repos = useGithubRepos()
    .data.slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  return (
    <div className={styles.rgrid} aria-live="polite">
      {repos.slice(0, REPO_COUNT).map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  )
}

class RepoErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  render() {
    if (this.state.error) return <p className={styles['error-note']}>Projeler yüklenirken bir hata oluştu.</p>
    return this.props.children
  }
}

function ProjelerPage() {
  const videos = useYoutubeFeed().data ?? []

  return (
    <main id="main" className="page-top">
      <div className="wrap">
        <header className={styles['page-head']} data-reveal>
          <nav className={`${styles.crumbs} micro`} aria-label="Sayfa konumu" data-rv>
            <Link to="/">Anasayfa</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Projeler</span>
          </nav>
          <h1 data-rv>
            <span className="sec-head__icon">
              <FolderIcon />
            </span>
            Tüm Projelerim
          </h1>
          <p className={styles['page-head__sub']} data-rv>
            Açık kaynak kodlu projelerim ve diğer geliştirdiğim uygulamalar.
          </p>
          <nav className={styles.jump} aria-label="Bölümler" data-rv>
            <a className="chip" href="#featured">
              Öne Çıkan Projeler
            </a>
            <a className="chip" href="#github">
              Github Projeleri
            </a>
            <a className="chip" href="#youtube">
              YouTube İçeriklerim
            </a>
          </nav>
        </header>

        <section className={`section ${styles['section--tight']}`} id="featured" aria-labelledby="featured-title">
          <div className={styles['list-head']} data-reveal>
            <h2 id="featured-title" className={styles['list-head__title']} data-rv>
              Öne Çıkan Projeler
            </h2>
            <p className="micro" data-rv>
              {OTHER_PROJECTS.length} proje
            </p>
          </div>
          <div className={styles.pgrid}>
            {OTHER_PROJECTS.map((project) => (
              <div key={project.link} className={styles['pgrid__cell']} data-reveal data-rv-self>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="github" aria-labelledby="github-title">
          <div className={styles['list-head']} data-reveal>
            <h2 id="github-title" className={styles['list-head__title']} data-rv>
              Github Projeleri
            </h2>
          </div>
          <RepoErrorBoundary>
            <Suspense fallback={<p className={styles.loading}>Yükleniyor...</p>}>
              <Repos />
            </Suspense>
          </RepoErrorBoundary>
          <div className="sec-cta">
            <Link className="btn btn--ghost" to="/github" data-magnetic>
              <span className="btn__label" data-magnetic-label>
                Tüm GitHub Projelerini Gör
              </span>
            </Link>
          </div>
        </section>

        <section className="section" id="youtube" aria-labelledby="youtube-title">
          <div className={styles['list-head']} data-reveal>
            <h2 id="youtube-title" className={styles['list-head__title']} data-rv>
              YouTube İçeriklerim
            </h2>
            <Link className="link-arrow" to="/youtube" data-rv>
              Tüm Youtube İçeriklerimi Gör
            </Link>
          </div>
          <div className={styles.vgrid}>
            {videos.map((video) => (
              <VideoCard key={video.videoId} video={video} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default function ProjectsApp({ dehydratedState }: { dehydratedState?: DehydratedState }) {
  return (
    <QueryClientProvider client={sharedQueryClient}>
      <HydrationBoundary state={dehydratedState}>
        <ProjelerPage />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
