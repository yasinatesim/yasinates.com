import { Link } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { OTHER_PROJECTS } from '~/constants/projects'
import type { GithubRepo } from '~/hooks/useGithubRepos'
import { LANG_COLOR, formatShort } from '../content'
import { ArrowRightIcon, ArrowUpRightIcon, ForkIcon } from '~/assets/icons/react'
import DataBoundary from './DataBoundary'
import { useLatestRepos } from '../useLatestRepos'
import SignalArt from './SignalArt'
import LogoPlate from './LogoPlate'
import styles from './Projects.module.scss'

type Project = (typeof OTHER_PROJECTS)[number]

const HOME_REPOS = 6

function ProjectMedia({ project, title, eager }: { project: Project; title: string; eager: boolean }) {
  const loading = eager ? 'eager' : 'lazy'
  if (!project.image) {
    return (
      <div className="media media--art">
        <SignalArt seed={project.title} label={title} />
      </div>
    )
  }
  if ('imageFit' in project && project.imageFit === 'contain') {
    return (
      <div className="media">
        <LogoPlate src={project.image} alt={project.alt ?? project.title} label={title} eager={eager} />
      </div>
    )
  }
  return (
    <div className="media">
      <img src={project.image} alt={project.alt ?? project.title} loading={loading} decoding="async" />
    </div>
  )
}

function StackCard({ project, index }: { project: Project; index: number }) {
  const [title, ...rest] = project.title.split(' - ')
  const subtitle = rest.join(' - ')
  return (
    <div className={styles['stack__card']} data-stack-card style={{ '--i': index } as CSSProperties}>
      <article className={styles['scard']}>
        <a className={styles['scard__media']} href={project.link} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
          <ProjectMedia project={project} title={title} eager={index === 0} />
        </a>
        <div className={styles['scard__body']}>
          <h3 className={styles['scard__title']}>{title}</h3>
          {subtitle && <p className={styles['scard__sub']}>{subtitle}</p>}
          <p className={styles['scard__desc']}>{project.desc}</p>
          {project.tags.length > 0 && (
            <ul className="tags" aria-label="Teknolojiler">
              {project.tags.map((t) => (
                <li key={t.text} className="chip">{t.text}</li>
              ))}
            </ul>
          )}
          <div className={styles['scard__ctas']}>
            <Link className="btn btn--primary btn--sm" to="/projeler" data-magnetic="0.25">
              <span className="btn__label" data-magnetic-label>Projeyi İncele</span>
            </Link>
            <a className="link-arrow" href={project.link} target="_blank" rel="noopener">
              Siteyi aç <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </article>
    </div>
  )
}

function RepoMeta({ repo }: { repo: GithubRepo }) {
  return (
    <>
      {repo.language && (
        <span>
          <span className={styles['lang__dot']} style={{ '--c': LANG_COLOR[repo.language] ?? '#8a93a3' } as CSSProperties} />
          {repo.language}
        </span>
      )}
      {repo.fork && (
        <span className={`chip ${styles['chip--fork']}`}>
          <ForkIcon />
          Fork
        </span>
      )}
    </>
  )
}

function RepoRows() {
  const repos = useLatestRepos(HOME_REPOS)
  return (
    <>
      {repos.map((r) => (
        <li key={r.id} className={styles['rrow']}>
          <a className={styles['rrow__link']} href={r.html_url} target="_blank" rel="noopener">
            <span className={styles['rrow__name']}>{r.name}</span>
            <span className={styles['rrow__desc']}>{r.description || 'Açıklama eklenmemiş.'}</span>
            <span className={styles['rrow__meta']}><RepoMeta repo={r} /></span>
            <span className={`${styles['rrow__date']} micro`}>{formatShort(r.created_at)}</span>
            <span className={styles['rrow__go']}><ArrowUpRightIcon /></span>
          </a>
        </li>
      ))}
    </>
  )
}

const Projects = () => {
  return (
    <>
      <section className="section" id="projects" aria-labelledby="projects-title">
        <div className="wrap">
          <header className="sec-head" data-reveal>
            <h2 id="projects-title" data-rv>Projelerim</h2>
            <p className="sec-head__sub" data-rv>
              Geliştirdiğim web projeleri, açık kaynak katkılarım ve müzik çalışmalarım.
            </p>
          </header>
          <h3 className={`${styles['sub-title']} micro`}>Öne Çıkan Projelerim</h3>
          <div className={styles['stack']} data-stack>
            {OTHER_PROJECTS.map((project, i) => (
              <StackCard key={project.title} project={project} index={i} />
            ))}
          </div>
          <div className="sec-cta">
            <Link className="btn btn--ghost" to="/projeler">
              Tüm Projelerim <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="gh-title">
        <div className="wrap">
          <div className={styles['list-head']} data-reveal>
            <h2 id="gh-title" className={styles['list-head__title']} data-rv>Son Github Projelerim</h2>
          </div>
          <ul className={styles['rrows']} aria-live="polite">
            <DataBoundary>
              <RepoRows />
            </DataBoundary>
          </ul>
          <div className="sec-cta">
            <Link className="btn btn--ghost" to="/github" data-magnetic>
              <span className="btn__label" data-magnetic-label>Tüm GitHub Projelerini Gör</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Projects
