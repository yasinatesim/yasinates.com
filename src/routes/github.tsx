import { createFileRoute } from '@tanstack/react-router'
import { TuvixApp } from '@tuvix.js/react'
import { useGithubRepos, type GithubRepo } from '~/hooks/useGithubRepos'
import { useReadmeImage } from '~/hooks/useReadmeImage'
import { seo } from '~/utils/seo'
import styles from './github.module.scss'

export const Route = createFileRoute('/github')({
  component: () => <TuvixApp name="github-app" App={GithubPage} />,
  head: () => ({
    title: 'GitHub Projeleri | Yasin Ateş',
    meta: [
      ...seo({
        title: 'GitHub Projeleri | Yasin Ateş',
        description: 'Açık kaynak kodlu tüm GitHub projelerim ve detayları.',
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'github, açık kaynak, yazılım, proje, yasin ateş, developer, frontend'
      }),
      { name: 'canonical', content: 'https://yasinates.com/github' },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'GitHub Projeleri',
          url: 'https://yasinates.com/github',
          description: 'Açık kaynak kodlu tüm GitHub projelerim ve detayları.'
        })
      }
    ]
  }),
})


const topicColors = [
  styles.tagBlue,
  styles.tagGreen,
  styles.tagYellow,
  styles.tagPink,
  styles.tagPurple,
  styles.tagIndigo,
  styles.tagRed,
  styles.tagGray,
]

function pascalCase(str: string) {
  if (str === 'typescript') return 'TypeScript'
  if (str === 'javascript') return 'JavaScript'
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
}

function GithubCard({ repo }: { repo: GithubRepo }) {
  const image = useReadmeImage(repo.owner.login, repo.name)
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {image?.startsWith('emoji:') ? (
          <span style={{ fontSize: '3.75rem' }}>{image.slice(6)}</span>
        ) : image ? (
          <img src={image} alt={repo.name + ' görseli'} className={styles.image} />
        ) : (
          <span style={{ fontSize: '2.5rem' }}>
            <i className="ri-github-fill" aria-hidden="true" />
          </span>
        )}
      </div>
      <div className={styles.cardBody}>
        <h4 className={styles.cardTitle}>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.repoLink}>
            {repo.name}
            {repo.fork && (
              <span title="Forked Repository" className={styles.forkBadge}>
                <svg width="150" height="150" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 5C7 3.89543 7.89543 3 9 3C10.1046 3 11 3.89543 11 5C11 5.74028 10.5978 6.38663 10 6.73244V14.0396H11.7915C12.8961 14.0396 13.7915 13.1441 13.7915 12.0396V10.7838C13.1823 10.4411 12.7708 9.78837 12.7708 9.03955C12.7708 7.93498 13.6662 7.03955 14.7708 7.03955C15.8753 7.03955 16.7708 7.93498 16.7708 9.03955C16.7708 9.77123 16.3778 10.4111 15.7915 10.7598V12.0396C15.7915 14.2487 14.0006 16.0396 11.7915 16.0396H10V17.2676C10.5978 17.6134 11 18.2597 11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 18.2597 7.4022 17.6134 8 17.2676V6.73244C7.4022 6.38663 7 5.74028 7 5Z" fill="currentColor" />
                </svg>
              </span>
            )}
            <i className="ri-external-link-line" style={{ fontSize: '1rem' }} aria-hidden="true" />
          </a>
        </h4>
        {repo.description && <p className={styles.cardDesc}>{repo.description}</p>}
        <div className={styles.tagList}>
          {repo.topics?.map((topic, idx) => (
            <span key={topic} className={`${styles.tag} ${topicColors[idx % topicColors.length]}`}>
              {pascalCase(topic)}
            </span>
          ))}
        </div>
        <div className={styles.cardMeta}>
          <span>Oluşturulma: {new Date(repo.created_at).toLocaleDateString('tr-TR')}</span>
        </div>
      </div>
    </div>
  )
}

export function GithubPage() {
  const githubRepos = useGithubRepos()
  const orderedRepos = githubRepos.data
    ?.slice()
    .sort((a: GithubRepo, b: GithubRepo) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 className={styles.title}>
            <i className="ri-github-fill ri-xl" aria-hidden="true" /> Tüm GitHub Projelerim
          </h2>
          <p className={styles.subtitle}>Açık kaynak kodlu tüm projelerim ve detayları.</p>
        </div>
        <div className={styles.grid}>
          {orderedRepos?.map((repo: GithubRepo) => (
            <GithubCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </section>
  )
}
