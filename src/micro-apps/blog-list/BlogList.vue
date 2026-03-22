<script setup lang="ts">
import { ref, computed } from 'vue'
import styles from './blog.module.scss'
import type { MediumPostListItem, DevToPostListItem } from '~/utils/fetchBlogPosts'
import { slugify } from '../../utils/slugify'

type Tab = 'all' | 'medium' | 'devto'

type MediumItem = MediumPostListItem & { id: string; image: string; reading: string }
type DevToItem  = DevToPostListItem  & { id: string; image: string; reading: string }
type Post = (MediumItem & { source: 'medium' }) | (DevToItem & { source: 'devto' })

const props = defineProps<{
  mediumPosts: MediumPostListItem[]
  devtoPosts:  DevToPostListItem[]
}>()

const tab = ref<Tab>('all')

const mediumItems = computed<Post[]>(() =>
  props.mediumPosts.map(p => {
    const hash = p.guid.split('/').pop() ?? p.guid
    const id = slugify(p.title) + '-' + hash
    const image =
      p.thumbnail
      || p.description?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)?.[1]
      || ''
    return { ...p, source: 'medium' as const, id, image, reading: p.readingTime ?? '5 dk' }
  })
)

const devtoItems = computed<Post[]>(() =>
  props.devtoPosts.map(p => ({
    ...p,
    source: 'devto' as const,
    id: p.slug,
    image: p.cover_image ?? '',
    reading: `${p.reading_time_minutes ?? 5} dk`,
  }))
)

const posts = computed<Post[]>(() => {
  if (tab.value === 'medium') return mediumItems.value
  if (tab.value === 'devto')  return devtoItems.value
  return [...mediumItems.value, ...devtoItems.value]
})

function desc(raw: string | undefined, isMedium: boolean): string {
  const text = isMedium ? raw?.replace(/<[^>]+>/g, '') : raw
  return (text?.slice(0, 120) ?? '') + '...'
}

</script>

<template>
  <section :class="styles.section">
    <div :class="styles.container">
      <div :class="styles.heading">
        <h2 :class="styles.title">Blog Yazılarım</h2>
        <p :class="styles.subtitle">Frontend geliştirme, web teknolojileri ve müzik üzerine paylaştığım yazılar.</p>
      </div>

      <div :class="styles.inner">
        <div :class="styles.tabRow">
          <div :class="styles.tabGroup">
            <button
              v-for="t in (['all', 'medium', 'devto'] as Tab[])"
              :key="t"
              :class="[styles.tab, tab === t ? styles.tabActive : '']"
              @click="tab = t"
            >
              {{ t === 'all' ? 'Tüm Yazılar' : t === 'medium' ? 'Medium' : 'Dev.to' }}
            </button>
          </div>
        </div>

        <div :class="styles.postList">
          <template v-if="posts.length === 0">
            <div :class="styles.status">Yükleniyor...</div>
          </template>

          <article v-for="post in posts" :key="post.id" :class="styles.article">
            <div :class="styles.articleImg">
              <img v-if="post.image" :src="post.image" :alt="post.title" referrerpolicy="no-referrer" />
            </div>
            <div :class="styles.articleBody">
              <div :class="styles.articleMeta">
                <span :class="styles.metaItem">
                  <i class="ri-time-line" aria-hidden="true" /> {{ post.reading }}
                </span>
                <span :class="styles.metaItem">
                  <i :class="post.source === 'medium' ? 'ri-medium-fill' : 'ri-code-box-fill'" aria-hidden="true" />
                  {{ post.source === 'medium' ? 'Medium' : 'Dev.to' }}
                </span>
              </div>
              <h3 :class="styles.articleTitle">
                <a :href="`/${post.id}`">{{ post.title }}</a>
              </h3>
              <p :class="styles.articleDesc">{{ desc(post.description, post.source === 'medium') }}</p>
              <a :href="`/${post.id}`" :class="styles.readMore">
                Devamını oku <i class="ri-arrow-right-line" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
