import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import FooterApp from '~/micro-apps/footer/App'

vi.mock('~/micro-apps/footer/Footer.svelte', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: vi.fn().mockImplementation(function (this: any) {
    this.$destroy = vi.fn()
  }),
}))

describe('FooterApp (Svelte bridge)', () => {
  it('renders a container div for Svelte to mount into', () => {
    const { container } = render(<FooterApp />)
    expect(container.querySelector('div')).toBeTruthy()
  })

  it('mounts without throwing', () => {
    expect(() => render(<FooterApp />)).not.toThrow()
  })

  it('unmounts without throwing', () => {
    const { unmount } = render(<FooterApp />)
    expect(() => unmount()).not.toThrow()
  })
})
