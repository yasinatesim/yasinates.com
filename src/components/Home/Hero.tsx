import styles from './Hero.module.css'

const techIcons = [
  { icon: 'ri-html5-line',       color: '#f97316', label: 'HTML5' },
  { icon: 'ri-css3-line',        color: '#60a5fa', label: 'CSS3' },
  { icon: 'ri-javascript-line',  color: '#facc15', label: 'JavaScript' },
  { icon: 'ri-reactjs-line',     color: '#06b6d4', label: 'React' },
  { icon: 'ri-tailwind-css-line',color: '#38bdf8', label: 'TailwindCSS' },
  { icon: 'ri-nodejs-line',      color: '#16a34a', label: 'Node.js' },
  { icon: 'ri-github-line',      color: '#1f2937', label: 'GitHub' },
  { icon: 'ri-vuejs-line',       color: '#4ade80', label: 'Vue.js' },
]

const iconPositions = [
  { top: '10px',  left: '20px',  rotate: '-8deg',  scale: 1.1,  size: '4.8rem' },
  { top: '30px',  left: '120px', rotate: '12deg',  scale: 1.05, size: '4.6rem' },
  { top: '20px',  left: '240px', rotate: '7deg',   scale: 1.15, size: '5.1rem' },
  { top: '60px',  left: '340px', rotate: '-15deg', scale: 1.08, size: '4.7rem' },
  { top: '120px', left: '60px',  rotate: '-18deg', scale: 1.13, size: '4.9rem' },
  { top: '140px', left: '200px', rotate: '11deg',  scale: 1.17, size: '5.2rem' },
  { top: '200px', left: '80px',  rotate: '-13deg', scale: 1.09, size: '4.8rem' },
  { top: '210px', left: '300px', rotate: '19deg',  scale: 1.12, size: '5.0rem' },
]

const socialLinks = [
  { href: 'https://github.com/yasinatesim',       label: 'GitHub',    icon: 'ri-github-line',    colorClass: styles.socialGithub },
  { href: 'https://www.linkedin.com/in/yasinatesim/', label: 'LinkedIn', icon: 'ri-linkedin-line',  colorClass: styles.socialLinkedin },
  { href: 'https://www.instagram.com/yasinatesim/', label: 'Instagram', icon: 'instagram',          colorClass: styles.socialInstagram },
  { href: 'https://twitter.com/yasinatesim',      label: 'X',         icon: 'ri-twitter-x-line', colorClass: styles.socialX },
  { href: 'https://medium.com/@yasinatesim',      label: 'Medium',    icon: 'medium',             colorClass: styles.socialMedium },
  { href: 'https://dev.to/yasinatesim',           label: 'Dev.to',    icon: 'dev-to',             colorClass: styles.socialDevto },
]

function SocialIcon({ icon }: { icon: string }) {
  if (icon === 'instagram') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="none" stroke="#E1306C" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke="#E1306C" strokeWidth="1.5" fill="none" />
        <circle cx="17" cy="7" r="1.2" fill="#E1306C" />
      </svg>
    )
  }
  if (icon === 'dev-to') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#171717" />
        <text x="12" y="16" fontSize="8" fontWeight="bold" fill="white" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" dominantBaseline="middle">DEV</text>
      </svg>
    )
  }
  if (icon === 'medium') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="5.5" cy="12" rx="4.5" ry="7" fill="#222" />
        <ellipse cx="18" cy="12" rx="2" ry="7" fill="#222" />
        <ellipse cx="12" cy="12" rx="2.5" ry="7" fill="#222" />
      </svg>
    )
  }
  return <i className={icon} style={{ color: '#374151', fontSize: '1.125rem' }} aria-hidden="true" />
}

const Hero = () => {
  return (
    <section id="home" className={styles.section}>
      <div className={styles.blobBg} aria-hidden="true">
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <div>
              <h1 className={styles.h1}>
                <span className={styles.nameBlock}>Yasin Ateş</span>
                <span className={styles.roleBlock}>Frontend Developer</span>
              </h1>
              <p className={styles.desc}>
                Modern web uygulamaları ve müzikle ilgilenen bir geliştiriciyim. Yaratıcı, hızlı ve kullanıcı odaklı çözümler üretiyorum.
              </p>
              <div className={styles.socialRow}>
                {socialLinks.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`${styles.socialLink} ${s.colorClass}`}
                  >
                    <SocialIcon icon={s.icon} />
                  </a>
                ))}
              </div>
              <div className={styles.buttons}>
                <a href="#projects" className={styles.btnPrimary}>
                  Projelerim
                  <svg className={styles.btnIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="#contact" className={styles.btnSecondary}>
                  İletişim
                  <svg className={styles.btnIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-1M16 3v4M8 3v4m-4 4h16" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.right} aria-hidden="true">
            <div className={styles.techCanvas}>
              <div className={styles.techBg}>
                {iconPositions.map((pos, idx) => {
                  const tech = techIcons[idx]
                  if (!tech) return null
                  return (
                    <div
                      key={tech.icon}
                      className={styles.techIcon}
                      style={{
                        top: pos.top,
                        left: pos.left,
                        color: tech.color,
                        fontSize: pos.size,
                        opacity: idx % 2 === 0 ? 0.8 : 0.6,
                        animation: `float${idx % 3} 7s ease-in-out infinite`,
                      }}
                    >
                      <i className={tech.icon} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.wave} aria-hidden="true">
        <svg viewBox="0 0 1440 120" className={styles.waveSvg}>
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,64L60,58.7C120,53,240,43,360,53.3C480,64,600,96,720,106.7C840,117,960,107,1080,90.7C1200,75,1320,53,1380,42.7L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
