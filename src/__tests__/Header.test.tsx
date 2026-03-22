import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '~/micro-apps/header/App'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ to, children, className, onClick }: { to: string; children: React.ReactNode; className?: string; onClick?: () => void }) => (
    <a href={to} className={className} onClick={onClick}>
      {children}
    </a>
  ),
  useLocation: () => ({ pathname: '/' }),
}))

describe('Header', () => {
  it('renders the header element', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('header')).toBeTruthy()
  })

  it('renders the brand name', () => {
    render(<Header />)
    expect(screen.getAllByText('Yasin Ateş').length).toBeGreaterThan(0)
  })

  it('renders all desktop navigation links', () => {
    render(<Header />)
    expect(screen.getAllByText('Anasayfa').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Hakkımda').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Projeler').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Blog Yazıları').length).toBeGreaterThan(0)
    expect(screen.getAllByText('İletişim').length).toBeGreaterThan(0)
  })

  it('renders navigation links with correct hrefs', () => {
    const { container } = render(<Header />)
    const links = container.querySelectorAll('a')
    const hrefs = Array.from(links).map((a) => a.getAttribute('href'))
    expect(hrefs).toContain('/')
    expect(hrefs).toContain('/hakkimda')
    expect(hrefs).toContain('/projeler')
    expect(hrefs).toContain('/blog')
    expect(hrefs).toContain('/iletisim')
  })

  it('renders a mobile menu toggle button', () => {
    render(<Header />)
    const button = screen.getByRole('button', { name: /menüyü/i })
    expect(button).toBeTruthy()
  })

  it('mobile menu is hidden by default', () => {
    const { container } = render(<Header />)
    const mobileMenu = container.querySelector('[aria-expanded]')
    expect(mobileMenu?.getAttribute('aria-expanded')).toBe('false')
  })

  it('toggles mobile menu on button click', () => {
    render(<Header />)
    const button = screen.getByRole('button', { name: /menüyü aç/i })
    fireEvent.click(button)
    expect(screen.getByRole('button', { name: /menüyü kapat/i })).toBeTruthy()
  })

  it('closes mobile menu when a nav link is clicked', () => {
    render(<Header />)
    const button = screen.getByRole('button', { name: /menüyü aç/i })
    fireEvent.click(button)
    const mobileLinks = screen.getAllByText('Hakkımda')
    fireEvent.click(mobileLinks[mobileLinks.length - 1])
    expect(screen.getByRole('button', { name: /menüyü aç/i })).toBeTruthy()
  })
})
