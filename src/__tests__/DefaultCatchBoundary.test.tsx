import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'

const mockInvalidate = vi.fn()
const reset = vi.fn()
let mockIsRoot = true

vi.mock('@tanstack/react-router', () => ({
  Link: ({ to, children, className, onClick }: { to: string; children: React.ReactNode; className?: string; onClick?: (e: React.MouseEvent) => void }) => (
    <a href={to} className={className} onClick={onClick}>{children}</a>
  ),
  rootRouteId: 'root',
  useRouter: () => ({ invalidate: mockInvalidate }),
  useMatch: () => (mockIsRoot ? { id: 'root' } : null),
}))

describe('DefaultCatchBoundary', () => {
  const error = new Error('Test error')

  it('renders the error message', () => {
    render(<DefaultCatchBoundary error={error} reset={reset} />)
    expect(screen.getByRole('alert')).toBeTruthy()
    expect(screen.getByText('Test error')).toBeTruthy()
  })

  it('renders Tekrar dene button', () => {
    render(<DefaultCatchBoundary error={error} reset={reset} />)
    expect(screen.getByRole('button', { name: /tekrar dene/i })).toBeTruthy()
  })

  it('calls router.invalidate on Tekrar dene click', () => {
    render(<DefaultCatchBoundary error={error} reset={reset} />)
    fireEvent.click(screen.getByRole('button', { name: /tekrar dene/i }))
    expect(mockInvalidate).toHaveBeenCalled()
  })

  it('renders Anasayfa link when at root', () => {
    mockIsRoot = true
    render(<DefaultCatchBoundary error={error} reset={reset} />)
    expect(screen.getByRole('link', { name: /anasayfa/i })).toBeTruthy()
  })

  it('renders Geri git link when not at root', () => {
    mockIsRoot = false
    render(<DefaultCatchBoundary error={error} reset={reset} />)
    expect(screen.getByRole('link', { name: /geri git/i })).toBeTruthy()
  })

  it('does not call console.error', () => {
    const consoleSpy = vi.spyOn(console, 'error')
    render(<DefaultCatchBoundary error={error} reset={reset} />)
    expect(consoleSpy).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})
