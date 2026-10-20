export type Tab = 'all' | 'medium' | 'devto'

export type BlogPost = {
  id: string
  title: string
  excerpt: string
  cover: string
  time: number
  reading: string
  source: 'medium' | 'devto'
  publication?: string
}
