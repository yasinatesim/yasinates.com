const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const esc = (value: string): string => value.replace(/[&<>"']/g, (c) => ESCAPES[c] ?? c)

function hash(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function rng(start: number): () => number {
  let seed = start
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function signalArt(seedText: string, label: string): string {
  const rand = rng(hash(seedText))
  const W = 480
  const H = 300
  const rows = 15
  const step = 8
  const bumps = Array.from({ length: rows }, () =>
    Array.from({ length: 3 }, () => ({ x: 120 + rand() * 240, w: 14 + rand() * 34, a: 0.25 + rand() * 0.9 })),
  )
  const phase = Array.from({ length: rows }, () => rand() * Math.PI * 2)
  let paths = ''
  for (let r = 0; r < rows; r++) {
    const base = 70 + r * 14
    let d = `M0 ${base}`
    for (let x = 0; x <= W; x += step) {
      const env = Math.exp(-((x - W / 2) ** 2) / (2 * 95 ** 2))
      let y = Math.sin(x * 0.05 + phase[r]) * 0.18
      for (const b of bumps[r]) y += b.a * Math.exp(-((x - b.x) ** 2) / (2 * b.w ** 2))
      d += ` L${x} ${(base - y * env * 52).toFixed(1)}`
    }
    paths += `<path d="${d} L${W} ${H} L0 ${H}Z" class="art__ridge"/>`
  }
  const tag = label ? `<text x="24" y="${H - 22}" class="art__label">${esc(label)}</text>` : ''
  return `<svg class="art" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(
    label || seedText,
  )} için üretilmiş sinyal görseli">${paths}${tag}</svg>`
}
