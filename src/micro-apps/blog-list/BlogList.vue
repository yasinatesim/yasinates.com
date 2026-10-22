<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import styles from './blog.module.scss'
import type { MediumPostListItem, DevToPostListItem } from '~/utils/fetchBlogPosts'
import BlogCard from './components/BlogCard.vue'
import TabFilter from './components/TabFilter.vue'
import { toBlogPosts } from './posts'
import type { Tab } from './types'

const PANEL_ID = 'posts-panel'
const SOURCE_PARAM = 'kaynak'

const props = defineProps<{
  mediumPosts: MediumPostListItem[]
  devtoPosts:  DevToPostListItem[]
}>()

const tab = ref<Tab>('all')

const allPosts = computed(() => toBlogPosts(props.mediumPosts, props.devtoPosts))

const counts = computed<Record<Tab, number>>(() => ({
  all: allPosts.value.length,
  medium: allPosts.value.filter((p) => p.source === 'medium').length,
  devto: allPosts.value.filter((p) => p.source === 'devto').length,
}))

const posts = computed(() =>
  tab.value === 'all' ? allPosts.value : allPosts.value.filter((p) => p.source === tab.value),
)

function selectTab(next: Tab) {
  tab.value = next
  const url = new URL(window.location.href)
  if (next === 'all') url.searchParams.delete(SOURCE_PARAM)
  else url.searchParams.set(SOURCE_PARAM, next)
  history.replaceState(history.state, '', url)
}

onMounted(() => {
  const source = new URLSearchParams(window.location.search).get(SOURCE_PARAM)
  if (source === 'medium' || source === 'devto') tab.value = source
})
</script>

<template>
  <main id="main" class="page-top">
    <div class="wrap">
      <header :class="styles['page-head']" data-reveal>
        <nav :class="['micro', styles['crumbs']]" aria-label="Sayfa konumu" data-rv>
          <a href="/">Anasayfa</a><span aria-hidden="true">/</span><span aria-current="page">Blog</span>
        </nav>
        <h1 data-rv>Blog Yazılarım</h1>
      </header>

      <div :class="styles['blog-bar']" data-reveal>
        <TabFilter :model-value="tab" :counts="counts" :panel-id="PANEL_ID" @update:model-value="selectTab" />
        <p class="micro" data-rv>
          <span :class="['live-badge', allPosts.length ? 'is-live' : '']">
            <span class="status-dot" />{{ allPosts.length ? 'Canlı · Medium + Dev.to' : 'Önbellek · son anlık görüntü' }}
          </span>
        </p>
      </div>

      <div
        :id="PANEL_ID"
        :key="tab"
        :class="styles['bgrid']"
        role="tabpanel"
        :aria-labelledby="`tab-${tab}`"
        aria-live="polite"
      >
        <p v-if="posts.length === 0" :class="['micro', styles['loading']]">Yükleniyor...</p>
        <div v-for="(post, i) in posts" :key="post.id" :class="styles['bgrid__cell']" data-reveal data-rv-self>
          <BlogCard :post="post" :eager="i < 3" />
        </div>
      </div>
    </div>
  </main>
</template>
