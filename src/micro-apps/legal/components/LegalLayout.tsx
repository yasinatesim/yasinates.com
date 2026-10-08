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
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.badge}>{badge}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.updated}>Son güncelleme: {updatedAt}</p>
        </div>
        <article className={styles.content}>{children}</article>
      </div>
    </section>
  )
}
