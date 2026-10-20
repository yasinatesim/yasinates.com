<script setup lang="ts">
import { computed } from 'vue'
import styles from './Blogs.module.scss'
import ArrowRightIcon from '../../../assets/icons/vue/arrow-right.vue'
import type { MediumPostListItem, DevToPostListItem } from '~/utils/fetchBlogPosts'
import { toHomePosts, sourceLabel } from '../posts'
import { ART_HEIGHT, ART_WIDTH, signalArtPaths } from '../art'

const props = defineProps<{
  mediumPosts: MediumPostListItem[]
  devtoPosts: DevToPostListItem[]
}>()

const posts = computed(() => toHomePosts(props.mediumPosts.slice(0, 3), props.devtoPosts.slice(0, 3)))
</script>

<template>
  <section class="section" aria-labelledby="blog-title">
    <div class="wrap">
      <header class="sec-head" data-reveal>
        <h2 id="blog-title" data-rv>Blog Yazılarım</h2>
      </header>
      <ul :class="styles['prows']">
        <li v-for="p in posts" :key="p.id" :class="styles['prow']">
          <a :class="styles['prow__link']" :href="`/${p.id}`" data-spot>
            <span class="spot" aria-hidden="true" />
            <span :class="styles['prow__thumb']">
              <img v-if="p.cover" :src="p.cover" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" />
              <svg
                v-else
                class="art"
                :viewBox="`0 0 ${ART_WIDTH} ${ART_HEIGHT}`"
                preserveAspectRatio="xMidYMid slice"
                role="img"
                :aria-label="`${sourceLabel(p.source)} için üretilmiş sinyal görseli`"
              >
                <path v-for="(d, i) in signalArtPaths(p.id + p.title)" :key="i" :d="d" class="art__ridge" />
              </svg>
            </span>
            <span :class="styles['prow__title']"><span :class="styles['prow__title-text']">{{ p.title }}</span></span>
            <span :class="[styles['prow__src'], 'micro']">
              <span :class="[styles['src'], styles[`src--${p.source}`]]">{{ sourceLabel(p.source, p.publication) }}</span> · {{ p.reading }}
            </span>
            <span :class="styles['prow__go']"><ArrowRightIcon /></span>
          </a>
        </li>
      </ul>
      <div class="sec-cta">
        <a class="btn btn--ghost" href="/blog" data-magnetic><span class="btn__label" data-magnetic-label>Tüm Yazılar</span></a>
      </div>
    </div>
  </section>
</template>
