import styles from './Footer.module.css'

const navLinks = [
  {
    href: '/hakkimda',
    label: 'Hakkımda',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.314 0-6 2.239-6 5v1h12v-1c0-2.761-2.686-5-6-5Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: '/projeler',
    label: 'Projeler',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M2 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm2 0v8h12V6H4Zm3 2h2v4H7V8Zm4 0h2v4h-2V8Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: '/blog',
    label: 'Blog',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4Zm0 2h12v10H4V5Zm2 2v2h8V7H6Zm0 4v2h5v-2H6Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: '/iletisim',
    label: 'İletişim',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2 0v.217l6 4.286 6-4.286V4H4Zm12 2.383-5.445 3.887a1 1 0 0 1-1.11 0L4 6.383V16h12V6.383Z" fill="currentColor" />
      </svg>
    ),
  },
]

const socialLinks = [
  {
    href: 'https://github.com/yasinatesim',
    label: 'GitHub',
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" />
      </svg>
    ),
  },
  {
    href: 'https://linkedin.com/in/yasinatesim',
    label: 'LinkedIn',
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.966 0-1.75-.79-1.75-1.76 0-.97.784-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.784 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z" />
      </svg>
    ),
  },
  {
    href: 'https://instagram.com/yasinatesim',
    label: 'Instagram',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="17" cy="7" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: 'https://x.com/yasinatesim',
    label: 'X',
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M19.48 13.4 28.06 4h-2.13l-7.2 7.89L12.1 4H4.5l9.02 13.01L4.5 28h2.13l7.61-8.34 6.01 8.34h7.6l-9.36-14.6Zm-2.7 2.97-.88-1.25L7.1 5.5h3.85l5.13 7.32.88 1.25 8.04 11.47h-3.85l-5.37-7.17Z" />
      </svg>
    ),
  },
  {
    href: 'https://medium.com/@yasinatesim',
    label: 'Medium',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="5.5" cy="12" rx="4.5" ry="7" fill="currentColor" />
        <ellipse cx="18" cy="12" rx="2" ry="7" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="2.5" ry="7" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: 'https://dev.to/yasinatesim',
    label: 'DEV.to',
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.826 10.083a.784.784 0 0 0-.468-.175h-.701v4.198h.701a.786.786 0 0 0 .469-.175c.155-.117.233-.292.233-.525v-2.798c.001-.233-.079-.408-.234-.525zM19.236 3H4.764C3.791 3 3.002 3.787 3 4.76v14.48c.002.973.791 1.76 1.764 1.76h14.473c.973 0 1.762-.787 1.764-1.76V4.76A1.765 1.765 0 0 0 19.236 3zM9.195 13.414c0 .755-.466 1.901-1.942 1.898H5.389V8.665h1.903c1.424 0 1.902 1.144 1.903 1.899v2.85zm4.045-3.562H11.1v1.544h1.309v1.188H11.1v1.543h2.142v1.188h-2.498a.813.813 0 0 1-.833-.792V9.497a.813.813 0 0 1 .792-.832h2.539l-.002 1.187zm4.165 4.632c-.531 1.235-1.481.99-1.906 0l-1.548-5.818h1.309l1.193 4.569 1.188-4.569h1.31l-1.546 5.818z" />
      </svg>
    ),
  },
]

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Sol: Hakkında ve Konum */}
          <div className={styles.col}>
            <div className={styles.brand}>
              <p className={styles.brandName}>Yasin Ateş</p>
              <p className={styles.bio}>
                Merhaba! Ben Yasin, kullanıcı odaklı arayüzler geliştiren, yeni teknolojileri ve müziği seven bir frontend developer'ım.
              </p>
            </div>
            <div className={styles.location}>
              <svg width="18" height="18" fill="none" aria-hidden="true">
                <path d="M9 2.25A5.25 5.25 0 0 0 3.75 7c0 4.125 5.25 8.75 5.25 8.75S14.25 11.125 14.25 7A5.25 5.25 0 0 0 9 2.25Zm0 7.25A2 2 0 1 1 9 5.5a2 2 0 0 1 0 4Z" fill="currentColor" />
              </svg>
              <span>İstanbul, Türkiye</span>
            </div>
          </div>

          {/* Orta: Hızlı Erişim */}
          <div className={styles.col}>
            <h3 className={styles.sectionTitle}>Hızlı Erişim</h3>
            <nav>
              <ul className={styles.navList}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={styles.navLink}>
                      <span className={styles.navIcon}>{link.icon}</span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Sağ: Sosyal Medya */}
          <div className={styles.col}>
            <h3 className={styles.sectionTitle}>Sosyal Medya</h3>
            <div className={styles.socialList}>
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={styles.socialLink}
                >
                  <span className={styles.socialIcon}>{link.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Yasin Ateş. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
