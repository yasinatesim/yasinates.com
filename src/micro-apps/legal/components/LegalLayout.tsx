import type { ReactNode } from 'react'
import styles from './LegalLayout.module.scss'

type LegalLayoutProps = {
  badge: string
  title: string
  updatedAt: string
  children: ReactNode
}

export function LegalLayout({ badge, title, updatedAt, children }: LegalLayoutProps) {
  return (
    <main id="main" className="page-top">
      <div className="wrap">
        <article className={styles['post']} data-field-dim="">
          <nav className={`${styles['crumbs']} micro`} aria-label="Sayfa konumu">
            <a href="/">Anasayfa</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
          </nav>
          <header className={styles['post__head']} data-reveal="">
            <p className={`${styles['page-head__badge']} micro`} data-rv="">
              <span className="status-dot" />
              {badge}
            </p>
            <h1 className={styles['post__title']} data-rv="">
              {title}
            </h1>
            <p className="micro" data-rv="">
              Son güncelleme: {updatedAt}
            </p>
          </header>
          <div className={styles['prose']}>{children}</div>
        </article>
      </div>
    </main>
  )
}
