import { Link } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import Socials from './Socials'
import styles from './Hero.module.scss'

function useHeroTilt() {
  const heroRef = useRef<HTMLElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const screen = screenRef.current
    const content = contentRef.current
    if (!hero || !screen || !content) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const heroMq = window.matchMedia('(min-width: 901px)')
    let frame = 0
    let done = false
    let wasDesktop = heroMq.matches

    const update = () => {
      frame = 0
      const desktop = heroMq.matches
      if (desktop !== wasDesktop) done = false
      wasDesktop = desktop
      const rect = hero.getBoundingClientRect()
      const range = desktop ? Math.max(1, hero.offsetHeight - window.innerHeight) : Math.max(1, rect.height * 0.9)
      const p = Math.min(1, Math.max(0, -rect.top / range))
      if (p >= 1 && done) return
      done = p >= 1
      const e = p * p * (3 - 2 * p)
      const fade = 1 - Math.min(1, Math.max(0, (p - (desktop ? 0.3 : 0.15)) * 1.5))
      screen.style.transform = desktop
        ? `translate3d(0, ${(-e * 3).toFixed(2)}vh, 0) rotateX(${(e * 24).toFixed(2)}deg) scale(${(1 - e * 0.16).toFixed(4)})`
        : `rotateX(${(e * 16).toFixed(2)}deg) scale(${(1 - e * 0.1).toFixed(4)})`
      content.style.opacity = fade.toFixed(3)
      content.style.transform = `translate3d(0, ${(-e * (desktop ? 40 : 28)).toFixed(1)}px, 0)`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return { heroRef, screenRef, contentRef }
}

const Hero = () => {
  const { heroRef, screenRef, contentRef } = useHeroTilt()

  return (
    <section ref={heroRef} className={styles['hero']} aria-labelledby="hero-title">
      <div className={styles['hero__sticky']}>
        <div ref={screenRef} className={styles['hero__screen']}>
          <div ref={contentRef} className={styles['hero__grid']}>
            <div className={styles['hero__copy']}>
              <h1 id="hero-title" className={styles['hero__title']}>Yasin Ateş</h1>
              <p className={styles['hero__role']}>
                <span className={styles['hero__role-line']} aria-hidden="true" />
                Frontend Developer
              </p>
              <p className={styles['hero__lead']}>
                Modern web uygulamaları ve müzikle ilgilenen bir geliştiriciyim. Yaratıcı, hızlı ve kullanıcı odaklı çözümler üretiyorum.
              </p>
              <div className={styles['hero__ctas']}>
                <a className="btn btn--primary" href="#projects" data-magnetic>
                  <span className="btn__label" data-magnetic-label>Projelerim</span>
                </a>
                <Link className="btn btn--ghost" to="/iletisim" data-magnetic>
                  <span className="btn__label" data-magnetic-label>İletişim</span>
                </Link>
              </div>
              <div>
                <Socials className={styles['hero__socials']} />
              </div>
            </div>
            <div className={styles['hero__visual']}>
              <svg className={styles['hero__ring']} viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                  <path id="ring-path" d="M100 100 m-84 0 a84 84 0 1 1 168 0 a84 84 0 1 1 -168 0" />
                </defs>
                <text>
                  <textPath href="#ring-path">Frontend Developer · Müzik · İstanbul · 2015&apos;ten beri · </textPath>
                </text>
              </svg>
              <figure className={styles['portrait']} data-tilt="9">
                <img src="/yasin-ates-hakkimda.jpg" alt="Yasin Ateş Hakkında" width={480} height={480} fetchPriority="high" />
                <span className={styles['portrait__scan']} aria-hidden="true" />
                <span className={styles['portrait__glare']} data-glare aria-hidden="true" />
                <figcaption className={`${styles['portrait__cap']} micro`}>
                  <span>Yasin Ateş</span>
                  <span>Frontend Developer</span>
                </figcaption>
              </figure>
            </div>
          </div>
          <a className={`${styles['hero__cue']} micro`} href="#about" aria-label="Aşağı kaydır">
            <span className={styles['hero__cue-line']} aria-hidden="true" />
            Kaydır
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
