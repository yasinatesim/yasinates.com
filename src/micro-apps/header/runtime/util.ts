export const clamp = (v: number, min = 0, max = 1): number => Math.min(max, Math.max(min, v))

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const finePointer = (): boolean => window.matchMedia('(hover: hover) and (pointer: fine)').matches

export type Cleanup = () => void
