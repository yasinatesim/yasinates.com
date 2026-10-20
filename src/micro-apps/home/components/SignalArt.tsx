import { ART_HEIGHT, ART_WIDTH, signalArtPaths } from '../art'
import styles from './SignalArt.module.scss'

export default function SignalArt({ seed, label = '' }: { seed: string; label?: string }) {
  return (
    <>
      <svg
        className="art"
        viewBox={`0 0 ${ART_WIDTH} ${ART_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={`${label || seed} için üretilmiş sinyal görseli`}
      >
        {signalArtPaths(seed).map((d, i) => (
          <path key={i} d={d} className="art__ridge" />
        ))}
      </svg>
      {label && (
        <span className={styles['art__label']} aria-hidden="true">{label}</span>
      )}
    </>
  )
}
