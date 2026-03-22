<script setup lang="ts">
import { computed } from 'vue'
import styles from './post-detail.module.scss'
import type { MediumPostListItem, DevToPostListItem } from '~/utils/fetchBlogPosts'
import { slugify } from '../../utils/slugify'

type MediumItem = MediumPostListItem & { source: 'medium'; id: string }
type DevToItem  = DevToPostListItem  & { source: 'devto';  id: string }
type Post = MediumItem | DevToItem

const props = defineProps<{
  postId: string
  mediumPosts: MediumPostListItem[]
  devtoPosts:  DevToPostListItem[]
  /** Pre-highlighted HTML content for the active post (computed server-side) */
  content: string
}>()

const allPosts = computed<Post[]>(() => [
  ...props.mediumPosts.map(p => {
    const hash = p.guid.split('/').pop() ?? p.guid
    return { ...p, source: 'medium' as const, id: slugify(p.title) + '-' + hash }
  }),
  ...props.devtoPosts.map(p => ({ ...p, source: 'devto' as const, id: p.slug })),
])

const post = computed(() => allPosts.value.find(p => p.id === props.postId))

const otherPosts = computed(() =>
  allPosts.value.filter(p => p.id !== props.postId).slice(0, 6)
)

const image = computed(() => {
  if (!post.value) return ''
  const p = post.value
  if (p.source === 'medium') {
    return p.thumbnail
      || p.description?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)?.[1]
      || ''
  }
  return p.cover_image || ''
})

const reading = computed(() => {
  if (!post.value) return ''
  return post.value.source === 'medium'
    ? post.value.readingTime ?? '5 dk'
    : `${post.value.reading_time_minutes ?? 5} dk`
})

function otherImage(p: Post): string {
  if (p.source === 'medium') {
    return p.thumbnail
      || p.description?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)?.[1]
      || ''
  }
  return p.cover_image || ''
}

</script>

<template>
  <div v-if="!post" :class="styles.status">Yazı bulunamadı.</div>

  <section v-else :class="styles.section">
    <div :class="styles.container">
      <div :class="styles.main">
        <div :class="styles.mainCard">
          <div :class="styles.postMeta">
            <span :class="styles.metaItem">
              <i class="ri-time-line" aria-hidden="true" /> {{ reading }}
            </span>
            <span :class="styles.metaItem">
              <i :class="post.source === 'medium' ? 'ri-medium-fill' : 'ri-code-box-fill'" aria-hidden="true" />
              {{ post.source === 'medium' ? 'Medium' : 'Dev.to' }}
            </span>
          </div>

          <h1 :class="styles.postTitle">{{ post.title }}</h1>

          <img
            v-if="image"
            :src="image"
            :alt="post.title"
            :class="styles.postCover"
            referrerpolicy="no-referrer"
          />

          <!-- content is pre-highlighted HTML from the route loader -->
          <article :class="styles.prose" v-html="content" />
        </div>
      </div>

      <aside :class="styles.sidebar">
        <div :class="styles.sidebarCard">
          <h2 :class="styles.sidebarTitle">Diğer Yazılar</h2>
          <div :class="styles.otherList">
            <a
              v-for="p in otherPosts"
              :key="p.id"
              :href="`/${p.id}`"
              :class="styles.otherLink"
            >
              <img
                v-if="otherImage(p)"
                :src="otherImage(p)"
                :alt="p.title"
                :class="styles.otherImg"
                referrerpolicy="no-referrer"
              />
              <div>
                <div :class="styles.otherTitle">{{ p.title }}</div>
                <div :class="styles.otherSource">
                  <i :class="p.source === 'medium' ? 'ri-medium-fill' : 'ri-code-box-fill'" aria-hidden="true" />
                  {{ p.source === 'medium' ? 'Medium' : 'Dev.to' }}
                </div>
              </div>
            </a>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>
