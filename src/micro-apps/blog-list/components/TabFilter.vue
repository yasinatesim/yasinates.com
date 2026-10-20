<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import styles from './TabFilter.module.scss'
import type { Tab } from '../types'

const TABS: ReadonlyArray<{ id: Tab; label: string }> = [
  { id: 'all', label: 'Tüm Yazılar' },
  { id: 'medium', label: 'Medium' },
  { id: 'devto', label: 'Dev.to' },
]

const props = defineProps<{
  modelValue: Tab
  counts: Record<Tab, number>
  panelId: string
}>()

const emit = defineEmits<{ 'update:modelValue': [tab: Tab] }>()

const list = ref<HTMLElement | null>(null)
const ink = ref<HTMLElement | null>(null)
const buttons = new Map<Tab, HTMLButtonElement>()
const measured = ref(false)

function setButton(id: Tab, el: unknown) {
  if (el instanceof HTMLButtonElement) buttons.set(id, el)
  else buttons.delete(id)
}

function moveInk() {
  const active = buttons.get(props.modelValue)
  if (!active || !ink.value) return
  ink.value.style.transform = `translate3d(${active.offsetLeft}px, 0, 0) scaleX(${(active.offsetWidth / 100).toFixed(4)})`
}

function select(id: Tab, focus = false) {
  emit('update:modelValue', id)
  if (focus) buttons.get(id)?.focus()
}

function onKeydown(e: KeyboardEvent, index: number) {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
  e.preventDefault()
  const step = e.key === 'ArrowRight' ? 1 : -1
  select(TABS[(index + step + TABS.length) % TABS.length].id, true)
}

let observer: ResizeObserver | undefined
let frame = 0

onMounted(() => {
  moveInk()
  frame = requestAnimationFrame(() => {
    measured.value = true
  })
  if (list.value) {
    observer = new ResizeObserver(moveInk)
    observer.observe(list.value)
  }
  document.fonts?.ready.then(moveInk).catch((_e: unknown) => undefined)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  observer?.disconnect()
})

watch(() => props.modelValue, () => nextTick(moveInk))
</script>

<template>
  <div ref="list" :class="[styles['tabs'], measured ? styles['is-measured'] : '']" role="tablist" aria-label="Kaynak" data-rv>
    <span ref="ink" :class="styles['tabs__ink']" aria-hidden="true" />
    <button
      v-for="(t, i) in TABS"
      :id="`tab-${t.id}`"
      :key="t.id"
      :ref="(el) => setButton(t.id, el)"
      type="button"
      role="tab"
      :class="styles['tabs__tab']"
      :aria-selected="modelValue === t.id"
      :aria-controls="panelId"
      :tabindex="modelValue === t.id ? 0 : -1"
      @click="select(t.id)"
      @keydown="onKeydown($event, i)"
    >
      {{ t.label }} <span :class="['mono', styles['tabs__n']]">{{ counts[t.id] }}</span>
    </button>
  </div>
</template>
