type MetaTag =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string }

export const seo = ({
  title,
  description,
  keywords,
  image,
}: {
  title: string
  description?: string
  image?: string
  keywords?: string
}): MetaTag[] => {
  const tags: MetaTag[] = [
    { title },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { name: 'twitter:title', content: title },
    { name: 'twitter:creator', content: '@yasinatesim' },
    { name: 'twitter:site', content: '@yasinatesim' },
  ]

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
      { name: 'twitter:image', content: image },
      { name: 'twitter:card', content: 'summary_large_image' },
    )
  }

  return tags
}
