<script setup lang="ts">
import { computed } from 'vue'
import styles from './Blogs.module.scss'
import type { MediumPostListItem, DevToPostListItem } from '~/utils/fetchBlogPosts'

const props = defineProps<{
  mediumPosts: MediumPostListItem[]
  devtoPosts:  DevToPostListItem[]
}>()

type BlogCard = {
  id: string
  title: string
  description: string
  image: string
  reading: string
  source: 'medium' | 'devto'
}

const cards = computed<BlogCard[]>(() => [
  ...props.mediumPosts.map(p => {
    const hash = p.guid.split('/').pop() ?? p.guid
    const image =
      p.thumbnail
      || p.description?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)?.[1]
      || ''
    return {
      id: slugify(p.title) + '-' + hash,
      title: p.title,
      description: (p.description?.replace(/<[^>]+>/g, '').slice(0, 120) ?? '') + '...',
      image,
      reading: p.readingTime ?? '5 dk',
      source: 'medium' as const,
    }
  }),
  ...props.devtoPosts.map(p => ({
    id: p.slug,
    title: p.title,
    description: (p.description?.slice(0, 120) ?? '') + '...',
    image: p.cover_image ?? '',
    reading: `${p.reading_time_minutes ?? 5} dk`,
    source: 'devto' as const,
  })),
])

function slugify(text: string): string {
  const map: Record<string, string> = {
    ı: 'i', İ: 'i', ğ: 'g', Ğ: 'g', ş: 's', Ş: 's',
    ç: 'c', Ç: 'c', ö: 'o', Ö: 'o', ü: 'u', Ü: 'u',
  }
  return text.split('').map(c => map[c] ?? c).join('')
    .toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-').replace(/^-+|-+$/g, '')
}
</script>

<template>
  <section id="blog" :class="styles.section">
    <div :class="styles.container">
      <div :class="styles.heading">
        <h2 :class="styles.title">Blog Yazılarım</h2>
        <p :class="styles.subtitle">Frontend geliştirme, web teknolojileri ve müzik üzerine paylaştığım yazılar.</p>
      </div>

      <div :class="styles.grid">
        <article v-for="card in cards" :key="card.id" :class="styles.card">
          <div :class="styles.imageWrapper">
            <img
              v-if="card.image"
              :src="card.image"
              :alt="card.title"
              :class="[styles.image, card.source === 'devto' ? styles.imageCover : '']"
              referrerpolicy="no-referrer"
            />
          </div>
          <div :class="styles.cardBody">
            <div :class="styles.meta">
              <span :class="styles.metaItem">
                <i class="ri-time-line" aria-hidden="true" /> {{ card.reading }}
              </span>
              <span :class="styles.metaItem">
                <i :class="card.source === 'medium' ? 'ri-medium-fill' : 'ri-code-box-fill'" aria-hidden="true" />
                {{ card.source === 'medium' ? 'Medium' : 'Dev.to' }}
              </span>
            </div>
            <h3 :class="styles.cardTitle">{{ card.title }}</h3>
            <p :class="styles.cardDesc">{{ card.description }}</p>
            <a :href="`/${card.id}`" :class="styles.readLink">
              Devamını Oku <i class="ri-arrow-right-line" aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>
    </div>

    <div :class="styles.wave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" :class="styles.wavesvg">
        <path fill="currentColor" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      </svg>
    </div>
  </section>
</template>
