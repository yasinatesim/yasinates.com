/**
 * Footer micro-app is a Svelte component mounted by a React bridge (FooterApp).
 * In jsdom, the dynamic Svelte import won't execute, so we test the bridge contract:
 * it renders a container div and handles cleanup correctly.
 */
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import FooterApp from '~/micro-apps/footer/App'

// FooterApp uses `new (FooterSvelte as SvelteClass)(...)` — mock must be a constructor function
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
