import styles from './Contact.module.css'

const socialLinks = [
  {
    href: 'https://github.com/yasinatesim',
    label: 'GitHub',
    colorClass: styles.socialGithub,
    icon: <i className="ri-github-fill" aria-hidden="true" />,
  },
  {
    href: 'https://linkedin.com/in/yasinatesim',
    label: 'LinkedIn',
    colorClass: styles.socialLinkedin,
    icon: <i className="ri-linkedin-fill" aria-hidden="true" />,
  },
  {
    href: 'https://instagram.com/yasinatesim',
    label: 'Instagram',
    colorClass: styles.socialInstagram,
    icon: <i className="ri-instagram-fill" aria-hidden="true" />,
  },
  {
    href: 'https://twitter.com/yasinatesim',
    label: 'X',
    colorClass: styles.socialX,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M19.615 13.295 28.045 4h-2.13l-7.36 8.255L12.01 4H4.5l8.77 12.515L4.5 28h2.13l7.77-8.715L19.99 28h7.51l-7.885-14.705ZM6.97 5.522h4.18l13.09 20.956h-4.18L6.97 5.522Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: 'https://medium.com/@yasinatesim',
    label: 'Medium',
    colorClass: styles.socialMedium,
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
    colorClass: styles.socialDevto,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M7.826 10.083a.784.784 0 0 0-.468-.175h-.701v4.198h.701a.786.786 0 0 0 .469-.175c.155-.117.233-.292.233-.525v-2.798c.001-.233-.079-.408-.234-.525zM19.236 3H4.764C3.791 3 3.002 3.787 3 4.76v14.48c.002.973.791 1.76 1.764 1.76h14.473c.973 0 1.762-.787 1.764-1.76V4.76A1.765 1.765 0 0 0 19.236 3zM9.195 13.414c0 .755-.466 1.901-1.942 1.898H5.389V8.665h1.903c1.424 0 1.902 1.144 1.903 1.899v2.85zm4.045-3.562H11.1v1.544h1.309v1.188H11.1v1.543h2.142v1.188h-2.498a.813.813 0 0 1-.833-.792V9.497a.813.813 0 0 1 .792-.832h2.539l-.002 1.187zm4.165 4.632c-.531 1.235-1.481.99-1.906 0l-1.548-5.818h1.309l1.193 4.569 1.188-4.569h1.31l-1.546 5.818z" />
      </svg>
    ),
  },
]

const Contact = () => {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 className={styles.title}>İletişim</h2>
          <p className={styles.subtitle}>Yeni projeler, işbirlikleri ve fikirleriniz için iletişime geçmekten çekinmeyin!</p>
        </div>
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.mailSection}>
              <div className={styles.mailIcon}>
                <i className="ri-mail-line" aria-hidden="true" />
              </div>
              <p className={styles.mailText}>
                Projeleriniz, işbirliği teklifleriniz veya sorularınız için bana ulaşabilirsiniz.
              </p>
              <a href="mailto:yasinatesim@gmail.com" className={styles.mailLink}>
                yasinatesim@gmail.com
              </a>
            </div>
            <div className={styles.socialSection}>
              <h3 className={styles.socialTitle}>Sosyal Medya</h3>
              <div className={styles.socialList}>
                {socialLinks.map(({ href, label, colorClass, icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`${styles.socialLink} ${colorClass}`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
