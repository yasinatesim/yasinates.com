<script setup lang="ts">
import { computed } from 'vue'
import styles from './BlogCard.module.scss'
import ArrowRightIcon from '../../../assets/icons/vue/arrow-right.vue'
import DevtoIcon from '../../../assets/icons/vue/devto.vue'
import MediumIcon from '../../../assets/icons/vue/medium.vue'
import { formatShort } from '../posts'
import { signalArt } from '../art'
import type { BlogPost } from '../types'

// eager: card is in the first row (above the fold), so its cover is the page's LCP candidate.
const props = defineProps<{ post: BlogPost; eager?: boolean }>()

const SOURCE_ICONS = { medium: MediumIcon, devto: DevtoIcon }

const sourceLabel = computed(() => {
  if (props.post.source === 'devto') return 'Dev.to'
  return props.post.publication ? `Medium · ${props.post.publication}` : 'Medium'
})
const art = computed(() => (props.post.cover ? '' : signalArt(props.post.id + props.post.title, sourceLabel.value)))
</script>

<template>
  <article :class="styles['bcard']" data-spot>
    <span class="spot" aria-hidden="true" />
    <a :class="styles['bcard__link']" :href="`/${post.id}`">
      <div v-if="post.cover" class="media">
        <img
          :src="post.cover"
          alt=""
          :loading="eager ? 'eager' : 'lazy'"
          :fetchpriority="eager ? 'high' : undefined"
          decoding="async"
          referrerpolicy="no-referrer"
        />
      </div>
      <div v-else class="media media--art" v-html="art" />
      <div :class="styles['bcard__body']">
        <p :class="['micro', styles['bcard__meta']]">
          <span :class="[styles['src'], styles[`src--${post.source}`]]"><component :is="SOURCE_ICONS[post.source]" />{{ sourceLabel }}</span>
          <span v-if="post.time">{{ formatShort(post.time) }}</span>
          <span>{{ post.reading }}</span>
        </p>
        <h2 :class="styles['bcard__title']">{{ post.title }}</h2>
        <p :class="styles['bcard__excerpt']">{{ post.excerpt }}</p>
        <span class="link-arrow">Devamını oku <ArrowRightIcon /></span>
      </div>
    </a>
  </article>
</template>
