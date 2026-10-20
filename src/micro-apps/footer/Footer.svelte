<script>
  import styles from './Footer.module.scss'

  const year = new Date().getFullYear()
  const email = 'yasinatesim@gmail.com'

  const navLinks = [
    { href: '/hakkimda', label: 'Hakkımda' },
    { href: '/projeler', label: 'Projeler' },
    { href: '/blog', label: 'Blog' },
    { href: '/iletisim', label: 'İletişim' },
    { href: '/github', label: 'GitHub Projeleri' },
    { href: '/youtube', label: 'YouTube İçerikleri' },
  ]

  const socialLinks = [
    { href: 'https://github.com/yasinatesim', label: 'GitHub' },
    { href: 'https://linkedin.com/in/yasinatesim', label: 'LinkedIn' },
    { href: 'https://x.com/yasinatesim', label: 'X' },
    { href: 'https://instagram.com/yasinatesim', label: 'Instagram' },
    { href: 'https://medium.com/@yasinatesim', label: 'Medium' },
    { href: 'https://dev.to/yasinatesim', label: 'DEV.to' },
    { href: 'https://www.youtube.com/channel/UCMBBlJsFiUYu2akYvmdi99g', label: 'YouTube' },
  ]

  const W = 1200
  const N = 120

  function signalLine(panel) {
    const svg = panel.querySelector('svg')
    const path = svg && svg.querySelector('path')
    if (!svg || !path) return {}
    let t = 0
    let px = -1
    let amp = 0
    let ampTarget = 0
    let raf = 0
    let inView = false
    const draw = () => {
      let d = ''
      for (let i = 0; i <= N; i++) {
        const x = (i / N) * W
        const near = px < 0 ? 0 : Math.exp(-(((x - px) / 140) ** 2))
        const base = Math.sin(i * 0.18 + t * 2.2) * 3 + Math.sin(i * 0.05 - t) * 4
        const burst = Math.sin(i * 0.9 + t * 9) * 26 * near * amp
        d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${(40 + base + burst).toFixed(1)}`
      }
      path.setAttribute('d', d)
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw()
      return {}
    }
    const loop = () => {
      t += 0.016
      amp += (ampTarget - amp) * 0.08
      draw()
      raf = inView ? requestAnimationFrame(loop) : 0
    }
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView && !raf) raf = requestAnimationFrame(loop)
    })
    io.observe(svg)
    const onMove = (e) => {
      const r = svg.getBoundingClientRect()
      px = ((e.clientX - r.left) / r.width) * W
      ampTarget = 1
    }
    const onLeave = () => {
      ampTarget = 0
    }
    panel.addEventListener('pointermove', onMove)
    panel.addEventListener('pointerleave', onLeave)
    return {
      destroy() {
        io.disconnect()
        cancelAnimationFrame(raf)
        panel.removeEventListener('pointermove', onMove)
        panel.removeEventListener('pointerleave', onLeave)
      },
    }
  }
</script>

<footer class={styles['site-footer']}>
  <div class="wrap">
    <div class={styles['footer-panel']} use:signalLine data-reveal>
      <svg class={styles['signal-line']} viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40 H1200" fill="none" stroke="currentColor" stroke-width="1.5" />
      </svg>
      <div class={styles['footer-grid']}>
        <div class={styles['footer-intro']}>
          <a class={styles['brand']} href="/" aria-label="Yasin Ateş, Anasayfa">
            <svg class={styles['brand__mark']} viewBox="0 0 28 20" aria-hidden="true">
              <path d="M1 10h4l2.5-7 4 14 4-17 4 17 3-7H27" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class={styles['brand__name']}>Yasin Ateş</span>
          </a>
          <p class={styles['footer-intro__bio']}>
            Merhaba! Ben Yasin, kullanıcı odaklı arayüzler geliştiren, yeni teknolojileri ve müziği seven bir frontend developer'ım.
          </p>
          <a class={styles['footer-mail']} href={`mailto:${email}`}>{email}</a>
        </div>
        <nav class={styles['footer-col']} aria-labelledby="ft-quick">
          <h2 class="micro" id="ft-quick">Hızlı Erişim</h2>
          <ul>
            {#each navLinks as link}
              <li><a href={link.href}>{link.label}</a></li>
            {/each}
          </ul>
        </nav>
        <div class={styles['footer-col']}>
          <h2 class="micro" id="ft-social">Sosyal Medya</h2>
          <ul aria-labelledby="ft-social">
            {#each socialLinks as link}
              <li><a href={link.href} target="_blank" rel="noopener">{link.label}</a></li>
            {/each}
          </ul>
        </div>
        <div class={styles['footer-col']}>
          <h2 class="micro">Konum</h2>
          <p>İstanbul, Türkiye</p>
        </div>
      </div>
      <div class={styles['footer-bottom']}>
        <p class="micro">© {year} Yasin Ateş</p>
        <ul class={styles['footer-legal']}>
          <li><a href="/gizlilik-politikasi">Gizlilik Politikası</a></li>
          <li><a href="/kullanim-kosullari">Kullanım Koşulları</a></li>
        </ul>
        <button class={`${styles['footer-top']} micro`} type="button" data-to-top>Başa dön ↑</button>
      </div>
    </div>
  </div>
</footer>
