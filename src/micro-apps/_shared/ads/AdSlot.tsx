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
      <div className="ad-slot__box">
        <div className="ad-slot__unit">
          <ins ref={ins} className="adsbygoogle" {...adInsAttrs(kind)} />
        </div>
      </div>
    </div>
  )
}

// Fixed 160x600 rails beside `.wrap`, one per gutter; app.css shows them only where the gutters fit them.
export function AdRails() {
  return (
    <>
      <AdSlot kind="rail" className="ad-rail ad-rail--left" />
      <AdSlot kind="side-rail" className="ad-rail ad-rail--right" />
    </>
  )
}
