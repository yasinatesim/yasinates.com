import styles from './LogoPlate.module.scss'

export default function LogoPlate({ src, alt, label, eager = false }: { src: string; alt: string; label: string; eager?: boolean }) {
  return (
    <div className={styles['plate']}>
      <span className={styles['plate__frame']}>
        <span className={styles['plate__tile']}>
          <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        </span>
      </span>
      <span className={styles['plate__label']} lang="en" aria-hidden="true">{label}</span>
    </div>
  )
}
