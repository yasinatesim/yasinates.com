import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'

const mockInvalidate = vi.fn()
const reset = vi.fn()
let mockIsRoot = true

vi.mock('@tanstack/react-router', () => ({
  ErrorComponent: ({ error }: { error: Error }) => <div data-testid="error-component">{error.message}</div>,
  Link: ({ to, children, className, onClick }: { to: string; children: React.ReactNode; className?: string; onClick?: (e: React.MouseEvent) => void }) => (
    <a href={to} className={className} onClick={onClick}>{children}</a>
  ),
  rootRouteId: 'root',
  useRouter: () => ({ invalidate: mockInvalidate }),
  useMatch: () => (mockIsRoot ? { id: 'root' } : null),
}))

describe('DefaultCatchBoundary', () => {
  const error = new Error('Test error')

  it('renders ErrorComponent with the error', () => {
    render(<DefaultCatchBoundary error={error} reset={reset} />)
    expect(screen.getByTestId('error-component')).toBeTruthy()
    expect(screen.getByText('Test error')).toBeTruthy()
  })

  it('renders Try Again button', () => {
    render(<DefaultCatchBoundary error={error} reset={reset} />)
    expect(screen.getByRole('button', { name: /try again/i })).toBeTruthy()
  })

  it('calls router.invalidate on Try Again click', () => {
    render(<DefaultCatchBoundary error={error} reset={reset} />)
    fireEvent.click(screen.getByRole('button', { name: /try again/i }))
    expect(mockInvalidate).toHaveBeenCalled()
  })

  it('renders Home link when at root', () => {
    mockIsRoot = true
    render(<DefaultCatchBoundary error={error} reset={reset} />)
    expect(screen.getByRole('link', { name: /home/i })).toBeTruthy()
  })

  it('renders Go Back link when not at root', () => {
    mockIsRoot = false
    render(<DefaultCatchBoundary error={error} reset={reset} />)
    expect(screen.getByRole('link', { name: /go back/i })).toBeTruthy()
  })

  it('does not call console.error', () => {
    const consoleSpy = vi.spyOn(console, 'error')
    render(<DefaultCatchBoundary error={error} reset={reset} />)
    expect(consoleSpy).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})
