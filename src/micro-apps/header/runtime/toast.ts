export const EMAIL = 'yasinatesim@gmail.com'

let toastTimer = 0

export function toast(message: string): void {
  let el = document.querySelector<HTMLElement>('body > .toast')
  if (!el) {
    el = document.createElement('p')
    el.className = 'toast'
    el.setAttribute('role', 'status')
    el.setAttribute('aria-live', 'polite')
    document.body.append(el)
  }
  el.textContent = message
  el.classList.add('is-on')
  clearTimeout(toastTimer)
  const node = el
  toastTimer = window.setTimeout(() => node.classList.remove('is-on'), 2200)
}

export async function copyEmail(): Promise<void> {
  try {
    await navigator.clipboard.writeText(EMAIL)
    toast('E-posta adresi kopyalandı')
  } catch (e: unknown) {
    toast(EMAIL)
  }
}

export function removeToast(): void {
  clearTimeout(toastTimer)
  document.querySelector('body > .toast')?.remove()
}
