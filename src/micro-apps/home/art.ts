export const ART_WIDTH = 480
export const ART_HEIGHT = 300

function hash(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function rng(seed: number): () => number {
  let s = seed
  return () => {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function signalArtPaths(seedText: string): string[] {
  const rand = rng(hash(seedText))
  const rows = 15
  const step = 8
  const bumps = Array.from({ length: rows }, () =>
    Array.from({ length: 3 }, () => ({ x: 120 + rand() * 240, w: 14 + rand() * 34, a: 0.25 + rand() * 0.9 })),
  )
  const phase = Array.from({ length: rows }, () => rand() * Math.PI * 2)
  const paths: string[] = []
  for (let r = 0; r < rows; r++) {
    const base = 70 + r * 14
    let d = `M0 ${base}`
    for (let x = 0; x <= ART_WIDTH; x += step) {
      const env = Math.exp(-((x - ART_WIDTH / 2) ** 2) / (2 * 95 ** 2))
      let y = Math.sin(x * 0.05 + phase[r]) * 0.18
      for (const b of bumps[r]) y += b.a * Math.exp(-((x - b.x) ** 2) / (2 * b.w ** 2))
      d += ` L${x} ${(base - y * env * 52).toFixed(1)}`
    }
    paths.push(`${d} L${ART_WIDTH} ${ART_HEIGHT} L0 ${ART_HEIGHT}Z`)
  }
  return paths
}
