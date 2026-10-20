import { Link } from '@tanstack/react-router'
import styles from './NotFound.module.scss'

export function NotFound({ children }: { children?: React.ReactNode }) {
  return (
    <main id="main" className="page-top">
      <div className="wrap">
        <header className={styles['page-head']}>
          <p className={`${styles['page-head__badge']} micro`}>
            <span className="status-dot" />
            404 · Sinyal yok
          </p>
          <h1>Aradığın sayfa bulunamadı</h1>
          <div className={styles['page-head__sub']}>
            {children || <p>Bağlantı değişmiş ya da sayfa kaldırılmış olabilir.</p>}
          </div>
          <div className={styles['actions']}>
            <Link to="/" className="btn btn--primary">
              <span className="btn__label">Anasayfaya dön</span>
            </Link>
            <button type="button" onClick={() => window.history.back()} className="btn btn--ghost">
              <span className="btn__label">Geri git</span>
            </button>
          </div>
        </header>
      </div>
    </main>
  )
}
