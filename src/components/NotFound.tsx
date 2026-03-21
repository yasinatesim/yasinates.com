import { Link } from '@tanstack/react-router'
import styles from './NotFound.module.css'

export function NotFound({ children }: { children?: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.message}>
        {children || <p>The page you are looking for does not exist.</p>}
      </div>
      <p className={styles.actions}>
        <button onClick={() => window.history.back()} className={styles.btnBack}>
          Go back
        </button>
        <Link to="/" className={styles.btnHome}>
          Start Over
        </Link>
      </p>
    </div>
  )
}
