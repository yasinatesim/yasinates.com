import { Component, type ReactNode, Suspense } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { sharedQueryClient } from '../_shared/queryClient'
import { useGithubRepos, type GithubRepo } from '~/hooks/useGithubRepos'
import { useReadmeImage } from '~/hooks/useReadmeImage'
import { OTHER_PROJECTS } from '~/constants/projects'
import { useYoutubeFeed } from '~/hooks/useYoutubeFeed'
import styles from './projeler.module.scss'

type OtherProject = {
  image?: string
  alt?: string
  title: string
  desc: string
  tags: { text: string; color: string }[]
  link: string
  features?: string[]
}

type YoutubeVideo = {
  videoId: string
  title: string
  thumbnail: string
  description?: string
  views?: string
  published: string
  url: string
}

const tagColorMap: Record<string, string> = {
  orange:  styles.tagOrange,
  blue:    styles.tagBlue,
  yellow:  styles.tagYellow,
  teal:    styles.tagTeal,
  green:   styles.tagGreen,
  red:     styles.tagRed,
  purple:  styles.tagPurple,
  gray:    styles.tagGray,
  zinc:    styles.tagZinc,
  fuchsia: styles.tagFuchsia,
  rose:    styles.tagRose,
}

function pascalCase(str: string) {
  if (str === 'typescript') return 'TypeScript'
  if (str === 'javascript') return 'JavaScript'
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
}

function GithubProjectCard({ repo }: { repo: GithubRepo }) {
  const image = useReadmeImage(repo.owner.login, repo.name)
  return (
    <div className={`${styles.card} ${styles.cardGithub}`}>
      <div className={styles.cardImg}>
        {image?.startsWith('emoji:') ? (
          <span style={{ fontSize: '3.75rem' }}>{image.slice(6)}</span>
        ) : image ? (
          <img src={image} alt={repo.name + ' görseli'} />
        ) : (
          <span style={{ fontSize: '1.875rem', color: 'var(--color-gray-400)' }}>
            <i className="ri-github-fill" aria-hidden="true" />
          </span>
        )}
      </div>
      <div className={styles.cardBody}>
        <h4 className={styles.cardTitle}>
          {repo.name}
          {repo.fork && (
            <span title="Forked Repository" className={styles.forkBadge}>
              <svg width="150" height="150" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 5C7 3.89543 7.89543 3 9 3C10.1046 3 11 3.89543 11 5C11 5.74028 10.5978 6.38663 10 6.73244V14.0396H11.7915C12.8961 14.0396 13.7915 13.1441 13.7915 12.0396V10.7838C13.1823 10.4411 12.7708 9.78837 12.7708 9.03955C12.7708 7.93498 13.6662 7.03955 14.7708 7.03955C15.8753 7.03955 16.7708 7.93498 16.7708 9.03955C16.7708 9.77123 16.3778 10.4111 15.7915 10.7598V12.0396C15.7915 14.2487 14.0006 16.0396 11.7915 16.0396H10V17.2676C10.5978 17.6134 11 18.2597 11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 18.2597 7.4022 17.6134 8 17.2676V6.73244C7.4022 6.38663 7 5.74028 7 5Z" fill="currentColor" />
              </svg>
            </span>
          )}
        </h4>
        {repo.description && <p className={styles.cardDesc}>{repo.description}</p>}
        <div className={styles.tagList}>
          {repo.topics?.slice(0, 3).map((topic) => (
            <span key={topic} className={`${styles.tag} ${styles.tagTopic}`}>{pascalCase(topic)}</span>
          ))}
        </div>
        <div className={styles.cardFooter}>
          <span>{repo.language}</span>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
            GitHub <i className="ri-external-link-line" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}

function OtherProjectCard({ project }: { project: OtherProject }) {
  return (
    <div className={`${styles.card} ${styles.cardOther}`}>
      {project.image && (
        <div className={`${styles.cardImg} ${styles.cardImgCover}`}>
          <img src={project.image} alt={project.alt ?? project.title} />
        </div>
      )}
      <div className={styles.cardBody}>
        <h4 className={styles.cardTitle}>{project.title}</h4>
        <p className={styles.cardDesc}>{project.desc}</p>
        <div className={styles.tagList}>
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag.text} className={`${styles.tag} ${tagColorMap[tag.color] ?? styles.tagGray}`}>
              {tag.text}
            </span>
          ))}
        </div>
        <div className={styles.cardFooter}>
          <span />
          <a href={project.link} target="_blank" rel="noopener noreferrer" className={`${styles.cardLink} ${styles.cardLinkBlue}`}>
            İncele <i className="ri-external-link-line" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}

function YoutubeVideoCard({ video }: { video: YoutubeVideo }) {
  return (
    <div className={`${styles.card} ${styles.cardYoutube}`}>
      <div className={styles.videoImgWrapper}>
        <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
          <img src={video.thumbnail} alt={video.title} />
          <div className={styles.videoOverlay}>
            <div className={styles.playBtn}>
              <i className="ri-play-fill ri-xl" aria-hidden="true" />
            </div>
          </div>
        </a>
        <span className={styles.dateBadge}>{video.published}</span>
      </div>
      <div className={styles.cardBody}>
        <h4 className={styles.cardTitle}>{video.title}</h4>
        {video.description && <p className={styles.cardDesc}>{video.description}</p>}
        <div className={styles.cardFooter}>
          {video.views && (
            <span className={styles.views}>
              <i className="ri-eye-line" aria-hidden="true" /> {video.views}
            </span>
          )}
          <a href={video.url} target="_blank" rel="noopener noreferrer" className={`${styles.cardLink} ${styles.cardLinkRed}`}>
            İzle <i className="ri-youtube-fill" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}

function ProjelerPage() {
  const githubRepos = useGithubRepos()
  const orderedRepos = githubRepos.data
    ?.slice()
    .sort((a: GithubRepo, b: GithubRepo) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  const youtubeFeed = useYoutubeFeed()

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 className={styles.title}>
            <i className="ri-folder-3-fill ri-xl" aria-hidden="true" /> Tüm Projelerim
          </h2>
          <p className={styles.subtitle}>Açık kaynak kodlu projelerim ve diğer geliştirdiğim uygulamalar.</p>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>
            <i className="ri-github-fill ri-lg" aria-hidden="true" /> Github Projeleri
          </h3>
          <div className={styles.grid}>
            {orderedRepos?.map((repo: GithubRepo) => (
              <GithubProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>
            <i className="ri-youtube-fill ri-lg" style={{ color: 'var(--color-red-600)' }} aria-hidden="true" /> YouTube İçeriklerim
          </h3>
          <div className={styles.grid}>
            {(youtubeFeed.data as YoutubeVideo[])?.map((video) => (
              <YoutubeVideoCard key={video.videoId} video={video} />
            ))}
          </div>
        </div>

        <div>
          <h3 className={styles.blockTitle}>
            <i className="ri-code-box-line ri-lg" aria-hidden="true" /> Diğer Projeler
          </h3>
          <div className={styles.grid}>
            {OTHER_PROJECTS.map((project: OtherProject, idx) => (
              <OtherProjectCard key={idx} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '5rem 1rem', color: '#6b7280', textAlign: 'center' }}>
          Projeler yüklenirken bir hata oluştu.
        </div>
      )
    }
    return this.props.children
  }
}

export default function ProjectsApp() {
  return (
    <QueryClientProvider client={sharedQueryClient}>
      <ErrorBoundary>
        <Suspense fallback={<div style={{ padding: '5rem 1rem', color: '#6b7280' }}>Yükleniyor...</div>}>
          <ProjelerPage />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}
