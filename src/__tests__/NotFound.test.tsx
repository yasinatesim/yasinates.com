import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { NotFound } from '~/components/NotFound'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => (
    <a href={to} className={className}>{children}</a>
  ),
}))

describe('NotFound', () => {
  it('renders default message when no children provided', () => {
    render(<NotFound />)
    expect(screen.getByText('Bağlantı değişmiş ya da sayfa kaldırılmış olabilir.')).toBeTruthy()
  })

  it('renders custom children when provided', () => {
    render(<NotFound><span>Özel mesaj</span></NotFound>)
    expect(screen.getByText('Özel mesaj')).toBeTruthy()
    expect(screen.queryByText('Bağlantı değişmiş ya da sayfa kaldırılmış olabilir.')).toBeNull()
  })

  it('renders Geri git button', () => {
    render(<NotFound />)
    expect(screen.getByRole('button', { name: /geri git/i })).toBeTruthy()
  })

  it('renders Anasayfaya dön link pointing to /', () => {
    render(<NotFound />)
    const link = screen.getByRole('link', { name: /anasayfaya dön/i })
    expect(link.getAttribute('href')).toBe('/')
  })

  it('calls window.history.back on Geri git click', () => {
    const backSpy = vi.spyOn(window.history, 'back').mockImplementation(() => {})
    render(<NotFound />)
    fireEvent.click(screen.getByRole('button', { name: /geri git/i }))
    expect(backSpy).toHaveBeenCalled()
    backSpy.mockRestore()
  })
})
