import { QueryClientProvider } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Component, type CSSProperties, type ReactNode, Suspense, useMemo, useState } from 'react'
import { sharedQueryClient } from '~/micro-apps/_shared/queryClient'
import { useGithubRepos, type GithubRepo } from '~/hooks/useGithubRepos'
import { ArrowUpRightIcon, ForkIcon, RepoIcon, SearchIcon, StarIcon } from '~/assets/icons/react'
import { SortSelect, type SelectOption } from './components/SortSelect'
import styles from './github.module.scss'

type Repo = GithubRepo & { stargazers_count?: number }
type SortKey = 'new' | 'stars' | 'name'

const ALL = 'all'

const SORT_OPTIONS: SelectOption<SortKey>[] = [
  { value: 'new', label: 'En yeni' },
  { value: 'stars', label: 'En çok yıldız' },
  { value: 'name', label: 'A–Z' },
]

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
const FALLBACK_LANG_COLOR = '#8a93a3'

const dateFmt = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })

function RepoCard({ repo }: { repo: Repo }) {
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
              <span className={styles['lang__dot']} style={{ '--c': LANG_COLOR[repo.language] ?? FALLBACK_LANG_COLOR } as CSSProperties} />
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

function Repos() {
  const repos: Repo[] = useGithubRepos().data
  const [query, setQuery] = useState('')
  const [lang, setLang] = useState(ALL)
  const [sort, setSort] = useState<SortKey>('new')

  const languages = useMemo(() => {
    const counts = new Map<string, number>()
    for (const r of repos) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1)
    return [...counts.entries()].sort((a, b) => b[1] - a[1])
  }, [repos])

  const list = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr')
    const filtered = repos.filter(
      (r) =>
        (lang === ALL || r.language === lang) &&
        (!q || `${r.name} ${r.description ?? ''} ${(r.topics ?? []).join(' ')}`.toLocaleLowerCase('tr').includes(q)),
    )
    if (sort === 'stars') return filtered.sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
    if (sort === 'name') return filtered.sort((a, b) => a.name.localeCompare(b.name, 'tr'))
    return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }, [repos, query, lang, sort])

  return (
    <>
      <div className={`${styles.toolbar} glass`} data-reveal data-rv-self>
        <label className={styles.search}>
          <span className="sr-only">Repository'lerde ara</span>
          <span aria-hidden="true">
            <SearchIcon />
          </span>
          <input type="search" placeholder="Repository, açıklama veya konu ara…" autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <div className={styles['toolbar__langs']} role="group" aria-label="Dil filtresi">
          <button type="button" className={`chip ${styles['chip--btn']}`} aria-pressed={lang === ALL} onClick={() => setLang(ALL)}>
            Tümü <span className="mono">{repos.length}</span>
          </button>
          {languages.map(([name, count]) => (
            <button key={name} type="button" className={`chip ${styles['chip--btn']}`} aria-pressed={lang === name} onClick={() => setLang(name)}>
              <span className={styles['lang__dot']} style={{ '--c': LANG_COLOR[name] ?? FALLBACK_LANG_COLOR } as CSSProperties} />
              {name} <span className="mono">{count}</span>
            </button>
          ))}
        </div>
        <SortSelect label="Sırala" value={sort} options={SORT_OPTIONS} onChange={setSort} />
      </div>
      <div className={styles['results-bar']}>
        <p className="micro" aria-live="polite">
          {list.length} / {repos.length} repository
        </p>
      </div>
      <div className={styles.rgrid}>
        {list.map((repo) => (
          <div key={repo.id} className={styles['rgrid__cell']} data-reveal data-rv-self>
            <RepoCard repo={repo} />
          </div>
        ))}
      </div>
      {list.length === 0 && <p className={styles['error-note']}>Bu filtreyle eşleşen repository yok.</p>}
    </>
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

export function GithubPage() {
  return (
    <main id="main" className="page-top">
      <div className="wrap">
        <header className={styles['page-head']} data-reveal>
          <nav className={`${styles.crumbs} micro`} aria-label="Sayfa konumu" data-rv>
            <Link to="/">Anasayfa</Link>
            <span aria-hidden="true">/</span>
            <Link to="/projeler">Projeler</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">GitHub</span>
          </nav>
          <h1 data-rv>Tüm GitHub Projelerim</h1>
          <p className={styles['page-head__sub']} data-rv>
            Açık kaynak kodlu tüm projelerim ve detayları.
          </p>
        </header>
        <RepoErrorBoundary>
          <Suspense fallback={<p className={styles.loading}>Yükleniyor...</p>}>
            <Repos />
          </Suspense>
        </RepoErrorBoundary>
      </div>
    </main>
  )
}

export default function GithubApp() {
  return (
    <QueryClientProvider client={sharedQueryClient}>
      <GithubPage />
    </QueryClientProvider>
  )
}
