import { createHash } from 'node:crypto'
import { getStore, type Store } from '@netlify/blobs'
import { countReadingMinutes, type MediumPost, type MediumPostListItem } from '~/utils/fetchBlogPosts'

const MEDIUM_FEED_URL = 'https://medium.com/feed/@yasinatesim'
const STORE_NAME = 'medium-archive'
const INDEX_KEY = 'index'
const INDEX_TTL_MS = 10 * 60 * 1000
const META_KEYS = ['guid', 'title', 'pubDate', 'link', 'thumbnail', 'description', 'categories'] as const

export type ArchivedMediumPost = MediumPostListItem & { contentHash: string }

export const mediumHash = (post: Pick<MediumPostListItem, 'guid'>): string => post.guid.split('/').pop() ?? post.guid

const byNewest = (a: MediumPostListItem, b: MediumPostListItem): number =>
  (Date.parse((b.pubDate ?? '').replace(' ', 'T') + 'Z') || 0) - (Date.parse((a.pubDate ?? '').replace(' ', 'T') + 'Z') || 0)

export function mergeMediumPosts(feed: MediumPost[], archive: ArchivedMediumPost[]): MediumPost[] {
  const archived = new Map(archive.map(({ contentHash: _, ...post }) => [mediumHash(post), post]))
  const live = feed.map((post): MediumPost => ({ ...archived.get(mediumHash(post)), ...post }))
  for (const post of live) archived.delete(mediumHash(post))
  return [...live, ...[...archived.values()].map((post): MediumPost => ({ ...post, content: '' }))].sort(byNewest)
}

export function updateArchive(
  feed: MediumPost[],
  archive: ArchivedMediumPost[],
): { archive: ArchivedMediumPost[]; changedContent: string[]; changed: boolean } {
  const byHash = new Map(archive.map((post) => [mediumHash(post), post]))
  const changedContent: string[] = []
  let changed = false
  for (const post of feed) {
    const hash = mediumHash(post)
    const previous = byHash.get(hash)
    const meta = Object.fromEntries(META_KEYS.filter((key) => post[key] !== undefined).map((key) => [key, post[key]]))
    const next: ArchivedMediumPost = {
      ...previous,
      ...meta,
      guid: post.guid,
      title: post.title,
      description: post.description,
      thumbnail: post.thumbnail,
      readingMinutes: post.readingMinutes,
      contentHash: createHash('sha1').update(post.content).digest('hex'),
    }
    if (previous?.contentHash !== next.contentHash) changedContent.push(hash)
    if (JSON.stringify(previous) !== JSON.stringify(next)) {
      byHash.set(hash, next)
      changed = true
    }
  }
  return { archive: [...byHash.values()].sort(byNewest), changedContent, changed }
}

function isArchivedPost(value: unknown): value is ArchivedMediumPost {
  if (typeof value !== 'object' || value === null) return false
  const post = value as Record<string, unknown>
  return (
    typeof post.guid === 'string' &&
    typeof post.title === 'string' &&
    typeof post.contentHash === 'string' &&
    typeof post.readingMinutes === 'number'
  )
}

function openStore(): Store {
  const siteID = process.env.NETLIFY_SITE_ID
  const token = process.env.NETLIFY_AUTH_TOKEN
  return siteID && token ? getStore({ name: STORE_NAME, siteID, token }) : getStore(STORE_NAME)
}

let cachedIndex: { at: number; archive: ArchivedMediumPost[] } | null = null

async function readArchive(): Promise<ArchivedMediumPost[]> {
  if (cachedIndex && Date.now() - cachedIndex.at < INDEX_TTL_MS) return cachedIndex.archive
  const raw: unknown = await openStore().get(INDEX_KEY, { type: 'json' })
  const archive = Array.isArray(raw) ? raw.filter(isArchivedPost) : []
  cachedIndex = { at: Date.now(), archive }
  return archive
}

async function writeArchive(feed: MediumPost[], archive: ArchivedMediumPost[]): Promise<ArchivedMediumPost[]> {
  const update = updateArchive(feed, archive)
  if (!update.changed) return archive
  const store = openStore()
  const bodies = new Map(feed.map((post) => [mediumHash(post), post.content]))
  await Promise.all(update.changedContent.map((hash) => store.set(`content/${hash}`, bodies.get(hash) ?? '')))
  await store.setJSON(INDEX_KEY, update.archive)
  cachedIndex = { at: Date.now(), archive: update.archive }
  return update.archive
}

const CDATA_RE = /^<!\[CDATA\[([\s\S]*)\]\]>$/
const XML_ENTITIES: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" }

function tagText(xml: string, tag: string): string | undefined {
  const raw = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`))?.[1]?.trim()
  if (raw === undefined) return undefined
  return raw.match(CDATA_RE)?.[1] ?? raw.replace(/&(amp|lt|gt|quot|#39);/g, (m) => XML_ENTITIES[m] ?? m)
}

// RFC 822 date → "YYYY-MM-DD HH:MM:SS" in UTC, the format the archive and the UI already use.
function toFeedDate(rfc822: string | undefined): string | undefined {
  const time = rfc822 ? Date.parse(rfc822) : Number.NaN
  return Number.isNaN(time) ? undefined : new Date(time).toISOString().slice(0, 19).replace('T', ' ')
}

export function parseMediumFeed(xml: string): MediumPost[] {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].flatMap(([, item]): MediumPost[] => {
    const guid = tagText(item, 'guid')
    const title = tagText(item, 'title')
    const content = tagText(item, 'content:encoded')
    if (!guid || !title || content === undefined) return []
    return [{
      guid,
      title,
      link: tagText(item, 'link'),
      pubDate: toFeedDate(tagText(item, 'pubDate')),
      categories: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map(([, c]) => c.trim().match(CDATA_RE)?.[1] ?? c.trim()),
      thumbnail: '',
      description: content,
      content,
      readingMinutes: countReadingMinutes(content),
    }]
  })
}

async function fetchFeed(): Promise<MediumPost[]> {
  const res = await fetch(MEDIUM_FEED_URL)
  if (!res.ok) throw new Error(`Medium feed request failed: ${res.status}`)
  const posts = parseMediumFeed(await res.text())
  if (posts.length === 0) throw new Error('Medium feed has no items')
  return posts
}

export async function fetchMediumPosts(): Promise<{ posts: MediumPost[]; complete: boolean }> {
  const [feedResult, archiveResult] = await Promise.allSettled([fetchFeed(), readArchive()])
  const feed = feedResult.status === 'fulfilled' ? feedResult.value : []
  const complete = feedResult.status === 'fulfilled' && archiveResult.status === 'fulfilled'

  if (archiveResult.status === 'rejected') return { posts: mergeMediumPosts(feed, []), complete }
  const archive = await writeArchive(feed, archiveResult.value).catch((e: unknown) => {
    if (e instanceof Error) return archiveResult.value
    throw e
  })
  return { posts: mergeMediumPosts(feed, archive), complete }
}

export async function readArchivedMediumContent(hash: string): Promise<string> {
  try {
    return (await openStore().get(`content/${hash}`, { type: 'text' })) ?? ''
  } catch (e: unknown) {
    if (e instanceof Error) return ''
    throw e
  }
}
