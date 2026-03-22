import { Link, useLocation } from '@tanstack/react-router'
import { useState } from 'react'
import styles from './header.module.scss'

const navLinks = [
  { to: '/', label: 'Anasayfa' },
  { to: '/hakkimda', label: 'Hakkımda' },
  { to: '/projeler', label: 'Projeler' },
  { to: '/blog', label: 'Blog Yazıları' },
  { to: '/iletisim', label: 'İletişim' },
]

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          Yasin Ateş
        </Link>

        <nav className={styles.desktopNav}>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`${styles.navLink} ${isActive(to) ? styles.navLinkActive : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          className={styles.menuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={isMobileMenuOpen}
        >
          <i className={`ri-lg ${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`} aria-hidden="true" />
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileNav}>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`${styles.mobileNavLink} ${isActive(to) ? styles.mobileNavLinkActive : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
