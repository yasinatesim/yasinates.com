import { useEffect, useRef } from 'react'
import { AD_LABEL, adInsAttrs, type AdKind } from './config'
import { markAdReady } from './runtime'

// Filled by startAds() (runtime.ts) once this component has mounted.
export function AdSlot({ kind, className }: { kind: AdKind; className?: string }) {
  const ins = useRef<HTMLModElement>(null)
  useEffect(() => {
    if (ins.current) markAdReady(ins.current)
  }, [])
  return (
    <div className={className ? `ad-slot ad-slot--${kind} ${className}` : `ad-slot ad-slot--${kind}`}>
      <span className="ad-slot__label micro">{AD_LABEL}</span>
      <ins ref={ins} className="adsbygoogle" {...adInsAttrs(kind)} />
    </div>
  )
}
