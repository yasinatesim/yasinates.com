type MetaTag =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string }

export const SITE_URL = 'https://yasinates.com'
export const SITE_NAME = 'Yasin Ateş'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`

export const PERSON_LD = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: SITE_NAME,
  url: `${SITE_URL}/hakkimda`,
  image: `${SITE_URL}/yasin-ates-hakkimda.jpg`,
  jobTitle: 'Frontend Developer',
  description: 'Frontend geliştirici, web teknolojileri ve müzik ile ilgilenen yazılımcı.',
  sameAs: [
    'https://github.com/yasinatesim',
    'https://linkedin.com/in/yasinatesim',
    'https://x.com/yasinatesim',
    'https://instagram.com/yasinatesim',
    'https://medium.com/@yasinatesim',
    'https://dev.to/yasinatesim',
    'https://www.youtube.com/channel/UCMBBlJsFiUYu2akYvmdi99g',
  ],
}

export const PERSON_REF = { '@id': PERSON_LD['@id'], '@type': 'Person', name: SITE_NAME, url: PERSON_LD.url }

export const seo = ({
  title,
  description,
  keywords,
  image,
  url,
  article,
}: {
  title: string
  description?: string
  image?: string
  keywords?: string
  url?: string
  article?: { publishedTime?: string }
}): MetaTag[] => {
  const tags: MetaTag[] = [
    { title },
    { name: 'author', content: SITE_NAME },
    { property: 'og:type', content: article ? 'article' : 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:locale', content: 'tr_TR' },
    { property: 'og:title', content: title },
    { name: 'twitter:title', content: title },
    { name: 'twitter:creator', content: '@yasinatesim' },
    { name: 'twitter:site', content: '@yasinatesim' },
  ]

  if (url) {
    tags.push({ property: 'og:url', content: url })
  }

  if (description) {
    tags.push(
      { name: 'description', content: description },
      { property: 'og:description', content: description },
      { name: 'twitter:description', content: description },
    )
  }

  if (keywords) {
    tags.push({ name: 'keywords', content: keywords })
  }

  if (image) {
    tags.push(
      { property: 'og:image', content: image },
      { property: 'og:image:alt', content: title },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: title },
      { name: 'twitter:card', content: 'summary_large_image' },
    )
  }

  if (article) {
    tags.push({ property: 'article:author', content: `${SITE_URL}/hakkimda` })
    if (article.publishedTime) tags.push({ property: 'article:published_time', content: article.publishedTime })
  }

  return tags
}
