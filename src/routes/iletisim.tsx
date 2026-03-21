import { createFileRoute } from '@tanstack/react-router'
import { seo } from '~/utils/seo'
import styles from './iletisim.module.css'

export const Route = createFileRoute('/iletisim')({
  component: () => <div data-tuvix-app="contact-app" />,
  head: () => ({
    title: 'İletişim | Yasin Ateş',
    meta: [
      ...seo({
        title: 'İletişim | Yasin Ateş',
        description: 'Yasin Ateş ile iletişime geçmek için e-posta ve sosyal medya hesapları.',
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'iletişim, e-posta, sosyal medya, yasin ateş, frontend, developer'
      }),
      { name: 'canonical', content: 'https://yasinates.com/iletisim' },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'İletişim',
          url: 'https://yasinates.com/iletisim',
          description: 'Yasin Ateş ile iletişime geçmek için e-posta ve sosyal medya hesapları.'
        })
      }
    ]
  }),
})

export function Iletisim() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.badge}>Bana Ulaşın</span>
          <h2 className={styles.title}>İletişim</h2>
          <p className={styles.subtitle}>Yeni projeler, işbirlikleri ve fikirleriniz için iletişime geçmekten çekinmeyin!</p>
        </div>

        <div className={styles.inner}>
          <div className={styles.grid}>
            {/* Left card — contact info + socials */}
            <div className={styles.card}>
              <div className={styles.infoSection}>
                <h3 className={styles.infoTitle}>İletişim Bilgileri</h3>
                <div className={styles.infoList}>
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <i className="ri-mail-line ri-lg" aria-hidden="true" />
                    </div>
                    <div>
                      <p className={styles.contactLabel}>E-posta</p>
                      <a href="mailto:yasinatesim@gmail.com" className={styles.contactValue}>
                        yasinatesim@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <i className="ri-map-pin-line ri-lg" aria-hidden="true" />
                    </div>
                    <div>
                      <p className={styles.contactLabel}>Konum</p>
                      <p className={styles.contactValue}>İstanbul, Türkiye</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className={styles.socialTitle}>Sosyal Medya</h3>
                <div className={styles.socialRow}>
                  <a href="https://github.com/yasinatesim" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={`${styles.socialIcon} ${styles.socialGithub}`}>
                    <i className="ri-github-fill" style={{ fontSize: '1.25rem' }} aria-hidden="true" />
                  </a>
                  <a href="https://linkedin.com/in/yasinatesim" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`${styles.socialIcon} ${styles.socialLinkedin}`}>
                    <i className="ri-linkedin-fill" style={{ fontSize: '1.25rem' }} aria-hidden="true" />
                  </a>
                  <a href="https://twitter.com/yasinatesim" target="_blank" rel="noopener noreferrer" aria-label="X" className={`${styles.socialIcon} ${styles.socialX}`}>
                    <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor" aria-hidden="true">
                      <path d="M19.615 13.184 27.36 4.5h-2.09l-6.77 7.89-5.38-7.89H4.5l8.07 11.83-8.07 9.37h2.09l7.45-8.67 5.91 8.67h8.62l-8.95-12.52Zm-2.64 3.07-.86-1.23-6.87-9.7h2.47l5.53 7.8.86 1.23 7.13 10.06h-2.47l-5.75-8.16Z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com/yasinatesim" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={`${styles.socialIcon} ${styles.socialInstagram}`}>
                    <i className="ri-instagram-fill" style={{ fontSize: '1.25rem' }} aria-hidden="true" />
                  </a>
                  <a href="https://medium.com/@yasinatesim" target="_blank" rel="noopener noreferrer" aria-label="Medium" className={`${styles.socialIcon} ${styles.socialMedium}`}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <ellipse cx="5.5" cy="12" rx="4.5" ry="7" fill="currentColor" />
                      <ellipse cx="18" cy="12" rx="2" ry="7" fill="currentColor" />
                      <ellipse cx="12" cy="12" rx="2.5" ry="7" fill="currentColor" />
                    </svg>
                  </a>
                  <a href="https://dev.to/yasinatesim" target="_blank" rel="noopener noreferrer" aria-label="Dev.to" className={`${styles.socialIcon} ${styles.socialDevto}`}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M7.826 10.083a.784.784 0 0 0-.468-.175h-.701v4.198h.701a.786.786 0 0 0 .469-.175c.155-.117.233-.292.233-.525v-2.798c.001-.233-.079-.408-.234-.525zM19.236 3H4.764C3.791 3 3.002 3.787 3 4.76v14.48c.002.973.791 1.76 1.764 1.76h14.473c.973 0 1.762-.787 1.764-1.76V4.76A1.765 1.765 0 0 0 19.236 3zM9.195 13.414c0 .755-.466 1.901-1.942 1.898H5.389V8.665h1.903c1.424 0 1.902 1.144 1.903 1.899v2.85zm4.045-3.562H11.1v1.544h1.309v1.188H11.1v1.543h2.142v1.188h-2.498a.813.813 0 0 1-.833-.792V9.497a.813.813 0 0 1 .792-.832h2.539l-.002 1.187zm4.165 4.632c-.531 1.235-1.481.99-1.906 0l-1.548-5.818h1.309l1.193 4.569 1.188-4.569h1.31l-1.546 5.818z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right card — CTA */}
            <div className={`${styles.card} ${styles.ctaCard}`}>
              <div className={styles.ctaIconWrapper}>
                <i className="ri-chat-3-line" style={{ fontSize: '1.5rem', color: 'var(--color-white)' }} aria-hidden="true" />
              </div>
              <h3 className={styles.ctaHeading}>İletişime geç</h3>
              <p className={styles.ctaDesc}>
                Projeleriniz, işbirliği teklifleriniz veya sorularınız için bana ulaşabilirsiniz.
              </p>
              <div className={styles.ctaButtons}>
                <a href="mailto:yasinatesim@gmail.com" className={`${styles.ctaBtn} ${styles.ctaEmail}`}>
                  <div className={styles.ctaBtnIcon}>
                    <i className="ri-mail-line" style={{ fontSize: '1.25rem' }} aria-hidden="true" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className={styles.ctaBtnLabel}>E-posta</span>
                    <span className={styles.ctaBtnSub}>yasinatesim@gmail.com</span>
                  </div>
                </a>
                <a href="https://linkedin.com/in/yasinatesim" target="_blank" rel="noopener noreferrer" className={`${styles.ctaBtn} ${styles.ctaLinkedin}`}>
                  <div className={styles.ctaBtnIcon}>
                    <i className="ri-linkedin-fill" style={{ fontSize: '1.25rem' }} aria-hidden="true" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className={styles.ctaBtnLabel}>LinkedIn</span>
                    <span className={styles.ctaBtnSub}>linkedin.com/in/yasinatesim</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
