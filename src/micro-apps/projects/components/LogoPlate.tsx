import styles from './LogoPlate.module.scss'

export function LogoPlate({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className={styles['plate']}>
      <span className={styles['plate__frame']}>
        <span className={styles['plate__tile']}>
          <img src={src} alt={alt} loading="lazy" decoding="async" />
        </span>
      </span>
      <span className={styles['plate__label']} lang="en" aria-hidden="true">{label}</span>
    </div>
  )
}
