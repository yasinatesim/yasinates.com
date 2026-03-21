import { Link } from '@tanstack/react-router'
import { OTHER_PROJECTS } from '~/constants/projects'
import { useGithubRepos } from '~/hooks/useGithubRepos'
import { useReadmeImage } from '~/hooks/useReadmeImage'
import { useYoutubeFeed } from '~/hooks/useYoutubeFeed'
import styles from './Projects.module.css'

type GithubRepo = {
  id: number
  name: string
  owner: { login: string }
  description: string
  language: string
  html_url: string
  topics?: string[]
  created_at: string
  fork?: boolean
}

type OtherProject = {
  image?: string
  alt?: string
  title: string
  desc: string
  tags: { text: string; color: string }[]
  link: string
  features?: string[]
}

const topicColorClasses = [
  styles.tagBlue,
  styles.tagGreen,
  styles.tagYellow,
  styles.tagPink,
  styles.tagPurple,
  styles.tagIndigo,
  styles.tagRed,
  styles.tagGray,
]

const tagColorMap: Record<string, string> = {
  orange: styles.tagOrange,
  blue:   styles.tagBlue,
  yellow: styles.tagYellow,
  teal:   styles.tagTeal,
  green:  styles.tagGreen,
  red:    styles.tagRed,
  purple: styles.tagPurple,
  gray:   styles.tagGray,
}

function pascalCase(str: string) {
  if (str === 'typescript') return 'TypeScript'
  if (str === 'javascript') return 'JavaScript'
  return str.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
}

function RepoCard({ repo }: { repo: GithubRepo }) {
  const image = useReadmeImage(repo.owner.login, repo.name)
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {image?.startsWith('emoji:') ? (
          <span style={{ fontSize: '3.75rem' }}>{image.slice(6)}</span>
        ) : image ? (
          <img src={image} alt={repo.name + ' görseli'} className={styles.image} />
        ) : (
          <span style={{ fontSize: '2.5rem' }}><i className="ri-github-fill" aria-hidden="true" /></span>
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
          {repo.topics?.map((topic, idx) => (
            <span key={topic} className={`${styles.tag} ${topicColorClasses[idx % topicColorClasses.length]}`}>
              {pascalCase(topic)}
            </span>
          ))}
        </div>
        <div className={styles.spacer} />
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.ghLink}>
          GitHub'da Gör <i className="ri-external-link-line" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

const Projects = () => {
  const githubRepos = useGithubRepos()
  const slicedRepos = githubRepos.data
    ?.slice()
    .sort((a: GithubRepo, b: GithubRepo) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6)

  const youtubeFeed = useYoutubeFeed()

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Projelerim</h2>
          <p className={styles.subtitle}>Geliştirdiğim web projeleri, açık kaynak katkılarım ve müzik çalışmalarım.</p>
        </div>

        {/* GitHub */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>
            <i className="ri-github-fill ri-lg" aria-hidden="true" /> Son Github Projelerim
          </h3>
          <div className={styles.grid3}>
            {slicedRepos?.map((repo: GithubRepo) => <RepoCard key={repo.id} repo={repo} />)}
          </div>
          <div className={styles.ctaRow}>
            <Link to="/github" className={styles.ctaGithub}>
              Tüm GitHub Projelerini Gör <i className="ri-arrow-right-line" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* YouTube */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>
            <i className="ri-youtube-fill ri-lg" style={{ color: 'var(--color-red-600)' }} aria-hidden="true" /> Son YouTube İçeriklerim
          </h3>
          <div className={styles.grid3}>
            {youtubeFeed.data?.slice(0, 3).map((video) => (
              <div key={video.videoId} className={styles.card}>
                <div className={styles.videoImageWrapper}>
                  <span className={styles.dateBadge}>{video.published}</span>
                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                    <img src={video.thumbnail} alt={video.title} className={styles.videoThumbnail} />
                    <div className={styles.playOverlay}>
                      <div className={styles.playBtn}>
                        <i className="ri-play-fill ri-2x" aria-hidden="true" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className={styles.cardBody}>
                  <h4 className={styles.cardTitle}>{video.title}</h4>
                  {video.description && <p className={styles.cardDesc}>{video.description}</p>}
                  <div className={styles.spacer} />
                  <div className={styles.videoMeta}>
                    {video.views && (
                      <span className={styles.views}>
                        <i className="ri-eye-line" aria-hidden="true" /> {video.views}
                      </span>
                    )}
                    <a href={video.url} target="_blank" rel="noopener noreferrer" className={styles.watchLink}>
                      İzle <i className="ri-youtube-fill" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.ctaRow}>
            <Link to="/youtube" className={styles.ctaYoutube}>
              Tüm Youtube İçeriklerimi Gör <i className="ri-arrow-right-line" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h3 className={styles.blockTitle}>
            <i className="ri-code-box-line ri-lg" aria-hidden="true" /> Diğer Projeler
          </h3>
          <div className={styles.grid3}>
            {OTHER_PROJECTS.map((project: OtherProject, idx) => (
              <div key={idx} className={styles.card}>
                {project.image ? (
                  <>
                    <div className={styles.imageCoverWrapper}>
                      <img src={project.image} alt={project.alt || project.title} className={styles.imageCover} />
                    </div>
                    <div className={styles.cardBody}>
                      <h4 className={styles.cardTitle}>{project.title}</h4>
                      <p className={styles.cardDesc}>{project.desc}</p>
                      <div className={styles.tagList}>
                        {project.tags.map((tag) => (
                          <span key={tag.text} className={`${styles.tag} ${tagColorMap[tag.color] ?? styles.tagGray}`}>
                            {tag.text}
                          </span>
                        ))}
                      </div>
                      {Array.isArray(project.features) && project.features.length > 0 && (
                        <div className={styles.featureList}>
                          {project.features.map((feature, i) => (
                            <div key={i} className={styles.featureItem}>
                              <div className={styles.featureIcon}><i className="ri-check-line ri-lg" aria-hidden="true" /></div>
                              <span className={styles.featureText}>{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className={styles.spacer} />
                      <a href={project.link} className={styles.cardLink}>
                        Projeyi İncele <i className="ri-external-link-line" aria-hidden="true" />
                      </a>
                    </div>
                  </>
                ) : (
                  <div className={styles.cardBody}>
                    <h4 className={styles.cardTitle}>{project.title}</h4>
                    <p className={styles.cardDesc}>{project.desc}</p>
                    <div className={styles.tagList}>
                      {project.tags.map((tag) => (
                        <span key={tag.text} className={`${styles.tag} ${tagColorMap[tag.color] ?? styles.tagGray}`}>
                          {tag.text}
                        </span>
                      ))}
                    </div>
                    {Array.isArray(project.features) && project.features.length > 0 && (
                      <div className={styles.featureList}>
                        {project.features.map((feature, i) => (
                          <div key={i} className={styles.featureItem}>
                            <div className={styles.featureIcon}><i className="ri-check-line ri-lg" aria-hidden="true" /></div>
                            <span className={styles.featureText}>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className={styles.spacer} />
                    <a href={project.link} className={styles.cardLink}>
                      Projeyi İncele <i className="ri-external-link-line" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
