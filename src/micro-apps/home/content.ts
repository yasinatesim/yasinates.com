export const CONTACT_EMAIL = 'yasinatesim@gmail.com'

export type SocialLink = { name: string; url: string; icon: 'github' | 'linkedin' | 'x' | 'instagram' | 'medium' | 'devto' | 'youtube' }

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/yasinatesim', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yasinatesim', icon: 'linkedin' },
  { name: 'X', url: 'https://x.com/yasinatesim', icon: 'x' },
  { name: 'Instagram', url: 'https://instagram.com/yasinatesim', icon: 'instagram' },
  { name: 'Medium', url: 'https://medium.com/@yasinatesim', icon: 'medium' },
  { name: 'Dev.to', url: 'https://dev.to/yasinatesim', icon: 'devto' },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCMBBlJsFiUYu2akYvmdi99g', icon: 'youtube' },
]

export type Tech = { name: string; color: string }

export const STACK: readonly Tech[] = [
  { name: 'HTML5', color: '#f97316' },
  { name: 'CSS3', color: '#3b82f6' },
  { name: 'SASS', color: '#ec4899' },
  { name: 'JavaScript', color: '#eab308' },
  { name: 'ES6', color: '#ca8a04' },
  { name: 'Babel', color: '#eab308' },
  { name: 'React', color: '#60a5fa' },
  { name: 'Redux', color: '#a855f7' },
  { name: 'Vue.js', color: '#10b981' },
  { name: 'Next.js', color: '#9ca3af' },
  { name: 'Remix', color: '#c026d3' },
  { name: 'TanStack', color: '#e11d48' },
  { name: 'Storybook', color: '#f472b6' },
  { name: 'TypeScript', color: '#1d4ed8' },
  { name: 'Yarn', color: '#60a5fa' },
  { name: 'Pnpm', color: '#d97706' },
  { name: 'Tailwind', color: '#0ea5e9' },
  { name: 'BEM', color: '#6b7280' },
  { name: 'Webpack', color: '#2563eb' },
  { name: 'Gulp', color: '#dc2626' },
  { name: 'GraphQL', color: '#db2777' },
  { name: 'PWA', color: '#4338ca' },
  { name: 'React Native', color: '#3b82f6' },
  { name: 'Node.js', color: '#16a34a' },
]

export const HOME_STACK: readonly string[] = ['HTML5', 'CSS3', 'SASS', 'JavaScript', 'ES6', 'React', 'Redux', 'Next.js', 'Storybook', 'TypeScript']

export const LANG_COLOR: Readonly<Record<string, string>> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#663399',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Python: '#3572a5',
  Shell: '#89e051',
  Svelte: '#ff3e00',
  Dart: '#00b4ab',
  Swift: '#f05138',
  Kotlin: '#a97bff',
  'Jupyter Notebook': '#da5b0b',
}

const shortDate = new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })

export function formatShort(iso: string): string {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : shortDate.format(d)
}
