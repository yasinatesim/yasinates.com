import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import styles from './DefaultCatchBoundary.module.css'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  })

  return (
    <div className={styles.wrapper}>
      <ErrorComponent error={error} />
      <div className={styles.actions}>
        <button onClick={() => router.invalidate()} className={styles.btn}>
          Try Again
        </button>
        {isRoot ? (
          <Link to="/" className={styles.btn}>
            Home
          </Link>
        ) : (
          <Link
            to="/"
            className={styles.btn}
            onClick={(e) => {
              e.preventDefault()
              window.history.back()
            }}
          >
            Go Back
          </Link>
        )}
      </div>
    </div>
  )
}
