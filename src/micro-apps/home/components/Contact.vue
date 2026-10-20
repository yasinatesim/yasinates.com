<script setup lang="ts">
import styles from './Contact.module.scss'
import DevtoIcon from '../../../assets/icons/vue/devto.vue'
import GithubIcon from '../../../assets/icons/vue/github.vue'
import InstagramIcon from '../../../assets/icons/vue/instagram.vue'
import LinkedinIcon from '../../../assets/icons/vue/linkedin.vue'
import MediumIcon from '../../../assets/icons/vue/medium.vue'
import XIcon from '../../../assets/icons/vue/x.vue'
import YoutubeIcon from '../../../assets/icons/vue/youtube.vue'
import { CONTACT_EMAIL, SOCIAL_LINKS } from '../content'

const SOCIAL_ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  instagram: InstagramIcon,
  medium: MediumIcon,
  devto: DevtoIcon,
  youtube: YoutubeIcon,
}
</script>

<template>
  <section class="section" id="contact" aria-labelledby="contact-title">
    <div class="wrap">
      <div :class="styles['cta-panel']" data-reveal data-spot>
        <span class="spot" aria-hidden="true" />
        <div :class="styles['cta-panel__copy']">
          <h2 id="contact-title" data-rv>İletişim</h2>
          <p :class="styles['cta-panel__sub']" data-rv>Yeni projeler, işbirlikleri ve fikirleriniz için iletişime geçmekten çekinmeyin!</p>
          <p :class="styles['cta-panel__text']" data-rv>Projeleriniz, işbirliği teklifleriniz veya sorularınız için bana ulaşabilirsiniz.</p>
        </div>
        <div :class="styles['cta-panel__action']" data-rv>
          <a :class="styles['cta-panel__mail']" :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>
          <p :class="['micro', styles['cta-panel__label']]">Sosyal Medya</p>
          <div>
            <ul class="socials">
              <li v-for="s in SOCIAL_LINKS" :key="s.url">
                <a class="social" :href="s.url" target="_blank" rel="noopener" :aria-label="s.name"><component :is="SOCIAL_ICONS[s.icon]" /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
