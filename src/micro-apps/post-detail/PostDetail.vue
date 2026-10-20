<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import styles from './post-detail.module.scss'
import type { MediumPostListItem, DevToPostListItem } from '~/utils/fetchBlogPosts'
import ArrowLeftIcon from '../../assets/icons/vue/arrow-left.vue'
import ArrowUpRightIcon from '../../assets/icons/vue/arrow-up-right.vue'
import DevtoIcon from '../../assets/icons/vue/devto.vue'
import MediumIcon from '../../assets/icons/vue/medium.vue'
import TimeIcon from '../../assets/icons/vue/time.vue'
import { formatDate, formatShort, normaliseArticle, toPostSummaries } from './posts'
import { signalArt } from './art'

const props = defineProps<{
  postId: string
  mediumPosts: MediumPostListItem[]
  devtoPosts:  DevToPostListItem[]
  content: string
}>()

const SOURCE_ICONS = { medium: MediumIcon, devto: DevtoIcon }

const allPosts = computed(() => toPostSummaries(props.mediumPosts, props.devtoPosts))
const post = computed(() => allPosts.value.find((p) => p.id === props.postId))
const others = computed(() => allPosts.value.filter((p) => p.id !== props.postId).slice(0, 6))
const articleHtml = computed(() => normaliseArticle(props.content))

const sourceLabel = (source: 'medium' | 'devto') => (source === 'medium' ? 'Medium' : 'Dev.to')
const fullSourceLabel = (p: { source: 'medium' | 'devto'; publication?: string }) =>
  p.publication ? `${sourceLabel(p.source)} · ${p.publication}` : sourceLabel(p.source)

const article = ref<HTMLElement | null>(null)
const bar = ref<HTMLElement | null>(null)
let frame = 0

function updateProgress() {
  frame = 0
  const el = article.value
  if (!el || !bar.value) return
  const rect = el.getBoundingClientRect()
  const total = Math.max(1, el.offsetHeight - window.innerHeight * 0.6)
  const progress = Math.min(1, Math.max(0, -rect.top / total))
  bar.value.style.transform = `scaleX(${progress.toFixed(4)})`
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(updateProgress)
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <div :class="styles['read-progress']" aria-hidden="true"><span ref="bar" /></div>
  <main id="main" class="page-top" data-field-dim>
    <div :class="['wrap', styles['post-layout']]">
      <article ref="article" :class="styles['post']">
        <nav :class="['micro', styles['crumbs']]" aria-label="Sayfa konumu">
          <a href="/">Anasayfa</a><span aria-hidden="true">/</span><a href="/blog">Blog</a>
          <template v-if="post">
            <span aria-hidden="true">/</span><span aria-current="page">{{ post.title }}</span>
          </template>
        </nav>

        <header v-if="!post" :class="styles['post__head']">
          <h1>Yazı bulunamadı.</h1>
          <p :class="styles['post__lead']">Bağlantı hatalı olabilir. Tüm yazılara blog sayfasından ulaşabilirsiniz.</p>
          <a class="btn btn--ghost" href="/blog"><ArrowLeftIcon /> Blog Yazılarım</a>
        </header>

        <template v-else>
          <header :class="styles['post__head']" data-reveal>
            <p :class="['micro', styles['post__meta']]" data-rv>
              <span :class="[styles['src'], styles[`src--${post.source}`]]"><component :is="SOURCE_ICONS[post.source]" />{{ fullSourceLabel(post) }}</span>
              <span><TimeIcon />{{ post.reading }}</span>
              <time v-if="post.time" :datetime="new Date(post.time).toISOString()">{{ formatDate(post.time) }}</time>
            </p>
            <h1 :class="styles['post__title']" data-rv>{{ post.title }}</h1>
            <ul v-if="post.tags.length" class="tags" data-rv>
              <li v-for="tag in post.tags.slice(0, 5)" :key="tag" class="chip">#{{ tag }}</li>
            </ul>
          </header>

          <figure v-if="post.cover" :class="styles['post__cover']">
            <img :src="post.cover" alt="" referrerpolicy="no-referrer" />
          </figure>

          <section :class="styles['prose']" v-html="articleHtml" />

          <footer :class="styles['post__foot']">
            <a class="btn btn--ghost btn--sm" href="/blog"><ArrowLeftIcon /> Blog Yazılarım</a>
            <a class="link-arrow" :href="post.url" target="_blank" rel="noopener">
              {{ sourceLabel(post.source) }}'da oku <ArrowUpRightIcon />
            </a>
          </footer>
        </template>
      </article>

      <aside :class="styles['post-aside']" aria-labelledby="others-title">
        <div :class="['glass', styles['post-aside__inner']]">
          <h2 id="others-title" class="micro">Diğer Yazılar</h2>
          <ul :class="styles['others']">
            <li v-for="p in others" :key="p.id">
              <a :class="styles['other']" :href="`/${p.id}`">
                <span v-if="p.cover" :class="['media', styles['other__thumb']]">
                  <img :src="p.cover" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" />
                </span>
                <span
                  v-else
                  :class="['media', 'media--art', styles['other__thumb']]"
                  v-html="signalArt(p.id + p.title, sourceLabel(p.source))"
                />
                <span :class="styles['other__text']">
                  <span class="micro">{{ fullSourceLabel(p) }} · {{ formatShort(p.time) }}</span>
                  <span :class="styles['other__title']">{{ p.title }}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </main>
</template>
