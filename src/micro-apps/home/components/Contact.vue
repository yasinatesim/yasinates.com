<template>
  <section id="contact" :class="$style.section">
    <div :class="$style.container">
      <div :class="$style.heading">
        <h2 :class="$style.title">İletişim</h2>
        <p :class="$style.subtitle">
          Yeni projeler, işbirlikleri ve fikirleriniz için iletişime geçmekten çekinmeyin!
        </p>
      </div>

      <div :class="$style.cardWrapper">
        <div :class="$style.card">
          <div :class="$style.mailSection">
            <div :class="$style.mailIcon">
              <i class="ri-mail-line" aria-hidden="true" />
            </div>
            <p :class="$style.mailText">
              Projeleriniz, işbirliği teklifleriniz veya sorularınız için bana ulaşabilirsiniz.
            </p>
            <a href="mailto:yasinatesim@gmail.com" :class="$style.mailLink">
              yasinatesim@gmail.com
            </a>
          </div>

          <div :class="$style.socialSection">
            <h3 :class="$style.socialTitle">Sosyal Medya</h3>
            <div :class="$style.socialList">
              <a
                v-for="link in socialLinks"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="link.label"
                :class="[$style.socialLink, $style[link.styleKey]]"
              >
                <i :class="link.icon" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const socialLinks = [
  { href: 'https://github.com/yasinatesim',   label: 'GitHub',    icon: 'ri-github-fill',    styleKey: 'socialGithub' },
  { href: 'https://linkedin.com/in/yasinatesim', label: 'LinkedIn', icon: 'ri-linkedin-fill', styleKey: 'socialLinkedin' },
  { href: 'https://instagram.com/yasinatesim', label: 'Instagram', icon: 'ri-instagram-fill', styleKey: 'socialInstagram' },
  { href: 'https://twitter.com/yasinatesim',  label: 'X',         icon: 'ri-twitter-x-fill', styleKey: 'socialX' },
  { href: 'https://medium.com/@yasinatesim',  label: 'Medium',    icon: 'ri-medium-fill',    styleKey: 'socialMedium' },
  { href: 'https://dev.to/yasinatesim',       label: 'DEV.to',    icon: 'ri-code-box-fill',  styleKey: 'socialDevto' },
]
</script>

<style module>
.section {
  padding: var(--space-20) 0;
  background-color: var(--color-indigo-50);
}
.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-4);
}
.heading { text-align: center; margin-bottom: var(--space-16); }
.title {
  font-size: var(--font-size-4xl);
  font-weight: 800;
  margin-bottom: var(--space-4);
  color: var(--color-primary);
}
.subtitle {
  color: var(--color-gray-600);
  max-width: 42rem;
  margin: 0 auto;
  font-size: var(--font-size-lg);
}
.cardWrapper { max-width: 36rem; margin: 0 auto; }
.card {
  background-color: rgba(255,255,255,0.8);
  backdrop-filter: blur(16px);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  padding: var(--space-8);
  border: 1px solid rgba(59,130,246,0.1);
}
.mailSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-10);
}
.mailIcon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--radius-full);
  background-color: rgba(59,130,246,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-4);
  color: var(--color-white);
  font-size: var(--font-size-2xl);
}
.mailText { font-size: var(--font-size-base); color: var(--color-gray-700); margin-bottom: var(--space-2); text-align: center; }
.mailLink { font-size: var(--font-size-lg); font-weight: var(--font-weight-medium); color: var(--color-primary); }
.mailLink:hover { text-decoration: underline; }
.socialSection { display: flex; flex-direction: column; align-items: center; }
.socialTitle { font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); margin-bottom: var(--space-5); color: #000; }
.socialList { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-3); }
.socialLink {
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background-color: var(--color-white);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  font-size: var(--font-size-xl);
  transition: background-color 0.2s, color 0.2s;
}
.socialGithub    { border: 1px solid #e5e7eb; color: #374151; }
.socialGithub:hover    { background-color: #111827; color: var(--color-white); }
.socialLinkedin  { border: 1px solid #dbeafe; color: #1d4ed8; }
.socialLinkedin:hover  { background-color: #1d4ed8; color: var(--color-white); }
.socialInstagram { border: 1px solid #fce7f3; color: #db2777; }
.socialInstagram:hover { background-color: #db2777; color: var(--color-white); }
.socialX         { border: 1px solid #e5e7eb; color: #111827; }
.socialX:hover         { background-color: #000; color: var(--color-white); }
.socialMedium    { border: 1px solid #e5e7eb; color: #374151; }
.socialMedium:hover    { background-color: #1f2937; color: var(--color-white); }
.socialDevto     { border: 1px solid #e5e7eb; color: #000; }
.socialDevto:hover     { background-color: #000; color: var(--color-white); }
</style>
