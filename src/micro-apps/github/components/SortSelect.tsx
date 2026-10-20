import { type KeyboardEvent, useEffect, useId, useRef, useState } from 'react'
import { CheckIcon, ChevronDownIcon } from '~/assets/icons/react'
import styles from '../github.module.scss'

export type SelectOption<T extends string> = { value: T; label: string }

export function SortSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: SelectOption<T>[]
  onChange: (value: T) => void
}) {
  const id = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [open, setOpen] = useState(false)
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  )
  const [activeIndex, setActiveIndex] = useState(selectedIndex)

  useEffect(() => {
    if (!open) return
    listRef.current?.focus()
    const onPointerDown = (e: PointerEvent) => {
      if (e.target instanceof Node && !rootRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  const openList = () => {
    setActiveIndex(selectedIndex)
    setOpen(true)
  }
  const close = (refocus: boolean) => {
    setOpen(false)
    if (refocus) buttonRef.current?.focus()
  }
  const pick = (index: number) => {
    onChange(options[index].value)
    close(true)
  }

  const onButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      openList()
    }
  }

  const onListKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % options.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex((i) => (i - 1 + options.length) % options.length)
        break
      case 'Home':
        e.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        e.preventDefault()
        setActiveIndex(options.length - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        pick(activeIndex)
        break
      case 'Escape':
        e.preventDefault()
        close(true)
        break
      case 'Tab':
        close(false)
        break
    }
  }

  return (
    <div className={styles.sort} ref={rootRef}>
      <span className="micro" id={`${id}-label`}>
        {label}
      </span>
      <div className={styles.select} data-open={open || undefined}>
        <button
          ref={buttonRef}
          type="button"
          className={styles['select__btn']}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-labelledby={`${id}-label ${id}-value`}
          onClick={() => (open ? close(false) : openList())}
          onKeyDown={onButtonKeyDown}
        >
          <span id={`${id}-value`}>{options[selectedIndex].label}</span>
          <ChevronDownIcon className={`i ${styles['select__chev']}`} />
        </button>
        <ul
          ref={listRef}
          id={`${id}-list`}
          className={`${styles['select__list']} glass`}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={`${id}-label`}
          aria-activedescendant={open ? `${id}-opt-${activeIndex}` : undefined}
          onKeyDown={onListKeyDown}
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={i === selectedIndex}
              className={styles['select__opt']}
              data-active={(open && i === activeIndex) || undefined}
              onPointerEnter={() => setActiveIndex(i)}
              onClick={() => pick(i)}
            >
              <span>{o.label}</span>
              <CheckIcon className={`i ${styles['select__check']}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
