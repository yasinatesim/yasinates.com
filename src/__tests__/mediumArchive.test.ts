import { describe, expect, it } from 'vitest'
import { mergeMediumPosts, parseMediumFeed, updateArchive, type ArchivedMediumPost } from '~/utils/mediumArchive'
import type { MediumPost } from '~/utils/fetchBlogPosts'

const feedPost = (hash: string, title: string, pubDate: string, content = `<p>${title}</p>`): MediumPost => ({
  guid: `https://medium.com/p/${hash}`, title, description: '', thumbnail: null, pubDate, content, readingMinutes: 1,
})

const archived = (post: MediumPost, extra: Partial<ArchivedMediumPost> = {}): ArchivedMediumPost => {
  const { content: _, ...meta } = post
  const { archive } = updateArchive([post], [])
  return { ...meta, contentHash: archive[0].contentHash, ...extra }
}

describe('mergeMediumPosts', () => {
  it('lists feed and archive-only posts newest first, the feed winning duplicates', () => {
    const live = feedPost('aaaa', 'Live title', '2026-06-15 16:07:28')
    const archive = [
      archived(feedPost('aaaa', 'Stale title', '2026-06-15 16:07:28')),
      archived(feedPost('bbbb', 'Archived newer', '2026-05-01 10:00:00')),
      archived(feedPost('cccc', 'Archived old', '2020-03-06 10:35:57')),
    ]

    const posts = mergeMediumPosts([live], archive)

    expect(posts.map((p) => p.title)).toEqual(['Live title', 'Archived newer', 'Archived old'])
    expect(posts.map((p) => p.content)).toEqual(['<p>Live title</p>', '', ''])
    expect(posts.every((p) => !('contentHash' in p))).toBe(true)
  })

  it('keeps archive-only fields on posts that are still in the feed', () => {
    const live = feedPost('aaaa', 'Live', '2021-04-28 10:00:00')
    const [post] = mergeMediumPosts([live], [archived(live, { publication: 'Hepsiburada Tech' })])
    expect(post.publication).toBe('Hepsiburada Tech')
  })
})

describe('updateArchive', () => {
  it('reports no change when the archive already matches the feed', () => {
    const live = feedPost('aaaa', 'Same', '2026-06-15 16:07:28')
    expect(updateArchive([live], [archived(live)])).toMatchObject({ changed: false, changedContent: [] })
  })

  it('adds new posts with their body and keeps posts that left the feed', () => {
    const old = archived(feedPost('bbbb', 'Old', '2020-03-06 10:35:57'))
    const update = updateArchive([feedPost('aaaa', 'New', '2026-06-15 16:07:28')], [old])

    expect(update.changed).toBe(true)
    expect(update.changedContent).toEqual(['aaaa'])
    expect(update.archive.map((p) => p.title)).toEqual(['New', 'Old'])
  })

  it('rewrites only the body of an edited post and keeps its archive-only fields', () => {
    const before = feedPost('aaaa', 'Post', '2021-04-28 10:00:00', '<p>v1</p>')
    const edited = feedPost('aaaa', 'Post', '2021-04-28 10:00:00', '<p>v2</p>')
    const update = updateArchive([edited], [archived(before, { publication: 'Hepsiburada Tech' })])

    expect(update.changedContent).toEqual(['aaaa'])
    expect(update.archive[0].publication).toBe('Hepsiburada Tech')
  })

  it('updates metadata edits without rewriting an unchanged body', () => {
    const before = feedPost('aaaa', 'Old title', '2026-06-15 16:07:28', '<p>same</p>')
    const update = updateArchive([feedPost('aaaa', 'New title', '2026-06-15 16:07:28', '<p>same</p>')], [archived(before)])

    expect(update).toMatchObject({ changed: true, changedContent: [] })
    expect(update.archive[0].title).toBe('New title')
  })
})

describe('parseMediumFeed', () => {
  const rss = `<?xml version="1.0"?><rss><channel><title>Stories</title>
    <item>
      <title><![CDATA[Git & React: <Bölüm 1>]]></title>
      <link>https://medium.com/@yasinatesim/git-react-3cafd5b53f9a?source=rss</link>
      <guid isPermaLink="false">https://medium.com/p/3cafd5b53f9a</guid>
      <category><![CDATA[git]]></category>
      <category><![CDATA[türkçe]]></category>
      <pubDate>Mon, 15 Jun 2026 16:07:28 GMT</pubDate>
      <content:encoded><![CDATA[<h3>Başlık</h3><p>a &amp; b</p>]]></content:encoded>
    </item>
    <item><title>No body</title><guid>https://medium.com/p/deadbeef00</guid></item>
  </channel></rss>`

  it('reads CDATA fields verbatim and stores the date as UTC "YYYY-MM-DD HH:MM:SS"', () => {
    const [post] = parseMediumFeed(rss)
    expect(post).toMatchObject({
      guid: 'https://medium.com/p/3cafd5b53f9a',
      title: 'Git & React: <Bölüm 1>',
      pubDate: '2026-06-15 16:07:28',
      categories: ['git', 'türkçe'],
      content: '<h3>Başlık</h3><p>a &amp; b</p>',
      description: '<h3>Başlık</h3><p>a &amp; b</p>',
      readingMinutes: 1,
    })
  })

  it('skips items without a body and returns nothing for a non-RSS page', () => {
    expect(parseMediumFeed(rss)).toHaveLength(1)
    expect(parseMediumFeed('<!DOCTYPE html><html><title>Just a moment...</title></html>')).toEqual([])
  })
})
