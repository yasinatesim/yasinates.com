<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AD_LABEL, adInsAttrs, type AdKind } from './config'
import { markAdReady } from './runtime'

// Vue twin of AdSlot.tsx; filled by startAds() (runtime.ts) once mounted.
const props = defineProps<{ kind: AdKind }>()
const attrs = adInsAttrs(props.kind)
const ins = ref<HTMLElement | null>(null)

onMounted(() => {
  if (ins.value) markAdReady(ins.value)
})
</script>

<template>
  <div :class="['ad-slot', `ad-slot--${kind}`]">
    <span class="ad-slot__label micro">{{ AD_LABEL }}</span>
    <div class="ad-slot__box">
      <div class="ad-slot__unit">
        <ins ref="ins" class="adsbygoogle" v-bind="attrs" />
      </div>
    </div>
  </div>
</template>
