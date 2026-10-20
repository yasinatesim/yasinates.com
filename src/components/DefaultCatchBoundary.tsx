import { Link, rootRouteId, useMatch, useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import styles from './NotFound.module.scss'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  })

  return (
    <main id="main" className="page-top">
      <div className="wrap">
        <header className={styles['page-head']} role="alert">
          <p className={`${styles['page-head__badge']} micro`}>
            <span className="status-dot is-soon" />
            Hata · Sinyal kesildi
          </p>
          <h1>Bir şeyler ters gitti</h1>
          <pre className={styles['error']}>{error.message || 'Beklenmeyen bir hata oluştu.'}</pre>
          <div className={styles['actions']}>
            <button type="button" onClick={() => router.invalidate()} className="btn btn--primary">
              <span className="btn__label">Tekrar dene</span>
            </button>
            {isRoot ? (
              <Link to="/" className="btn btn--ghost">
                <span className="btn__label">Anasayfa</span>
              </Link>
            ) : (
              <Link
                to="/"
                className="btn btn--ghost"
                onClick={(e) => {
                  e.preventDefault()
                  window.history.back()
                }}
              >
                <span className="btn__label">Geri git</span>
              </Link>
            )}
          </div>
        </header>
      </div>
    </main>
  )
}
