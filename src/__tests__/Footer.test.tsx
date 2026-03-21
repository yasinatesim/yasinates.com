import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '~/components/Footer'

describe('Footer', () => {
  it('renders the footer element', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('footer')).toBeTruthy()
  })

  it('renders the author name', () => {
    render(<Footer />)
    expect(screen.getByText('Yasin Ateş')).toBeTruthy()
  })

  it('renders navigation links', () => {
    render(<Footer />)
    expect(screen.getByText('Hakkımda')).toBeTruthy()
    expect(screen.getByText('Projeler')).toBeTruthy()
    expect(screen.getByText('Blog')).toBeTruthy()
    expect(screen.getByText('İletişim')).toBeTruthy()
  })

  it('renders navigation links with correct hrefs', () => {
    const { container } = render(<Footer />)
    const links = container.querySelectorAll('nav a')
    const hrefs = Array.from(links).map((a) => a.getAttribute('href'))
    expect(hrefs).toContain('/hakkimda')
    expect(hrefs).toContain('/projeler')
    expect(hrefs).toContain('/blog')
    expect(hrefs).toContain('/iletisim')
  })

  it('renders social media section heading', () => {
    render(<Footer />)
    expect(screen.getByText('Sosyal Medya')).toBeTruthy()
  })

  it('renders social links with target="_blank" and rel="noopener noreferrer"', () => {
    const { container } = render(<Footer />)
    const socialLinks = container.querySelectorAll('a[target="_blank"]')
    socialLinks.forEach((link) => {
      expect(link.getAttribute('rel')).toBe('noopener noreferrer')
    })
  })

  it('renders copyright notice with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText((content) => content.includes(year))).toBeTruthy()
  })

  it('renders location text', () => {
    render(<Footer />)
    expect(screen.getByText('İstanbul, Türkiye')).toBeTruthy()
  })
})
