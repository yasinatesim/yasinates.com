import { OTHER_PROJECTS } from '~/constants/projects'
import styles from './cmdk.module.scss'
import { EMAIL, copyEmail } from './toast'
import type { Cleanup } from './util'

const ArrowRightIcon =
  '<svg class="i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path></svg>'
const ArrowUpRightIcon =
  '<svg class="i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path></svg>'
const ArticleIcon =
  '<svg class="i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM7 6H11V10H7V6ZM7 12H17V14H7V12ZM7 16H17V18H7V16ZM13 7H17V9H13V7Z"></path></svg>'
const CopyIcon =
  '<svg class="i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>'
const DevtoIcon =
  '<svg class="i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM20 12L16.4645 15.5355L15.0503 14.1213L17.1716 12L15.0503 9.87868L16.4645 8.46447L20 12ZM6.82843 12L8.94975 14.1213L7.53553 15.5355L4 12L7.53553 8.46447L8.94975 9.87868L6.82843 12ZM11.2443 17H9.11597L12.7557 7H14.884L11.2443 17Z"></path></svg>'
const EnterIcon =
  '<svg class="i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M19.0001 13.9999L19.0002 5L17.0002 4.99997L17.0001 11.9999L6.8283 12L10.778 8.05024L9.36382 6.63603L2.99986 13L9.36382 19.364L10.778 17.9497L6.82826 14L19.0001 13.9999Z"></path></svg>'
const FolderIcon =
  '<svg class="i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM4 7V19H20V7H4Z"></path></svg>'
const GithubIcon =
  '<svg class="i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M5.88401 18.6533C5.58404 18.4526 5.32587 18.1975 5.0239 17.8369C4.91473 17.7065 4.47283 17.1524 4.55811 17.2583C4.09533 16.6833 3.80296 16.417 3.50156 16.3089C2.9817 16.1225 2.7114 15.5499 2.89784 15.0301C3.08428 14.5102 3.65685 14.2399 4.17672 14.4263C4.92936 14.6963 5.43847 15.1611 6.12425 16.0143C6.03025 15.8974 6.46364 16.441 6.55731 16.5529C6.74784 16.7804 6.88732 16.9182 6.99629 16.9911C7.20118 17.1283 7.58451 17.1874 8.14709 17.1311C8.17065 16.7489 8.24136 16.3783 8.34919 16.0358C5.38097 15.3104 3.70116 13.3952 3.70116 9.63971C3.70116 8.40085 4.0704 7.28393 4.75917 6.3478C4.5415 5.45392 4.57433 4.37284 5.06092 3.15636C5.1725 2.87739 5.40361 2.66338 5.69031 2.57352C5.77242 2.54973 5.81791 2.53915 5.89878 2.52673C6.70167 2.40343 7.83573 2.69705 9.31449 3.62336C10.181 3.41879 11.0885 3.315 12.0012 3.315C12.9129 3.315 13.8196 3.4186 14.6854 3.62277C16.1619 2.69 17.2986 2.39649 18.1072 2.52651C18.1919 2.54013 18.2645 2.55783 18.3249 2.57766C18.6059 2.66991 18.8316 2.88179 18.9414 3.15636C19.4279 4.37256 19.4608 5.45344 19.2433 6.3472C19.9342 7.28337 20.3012 8.39208 20.3012 9.63971C20.3012 13.3968 18.627 15.3048 15.6588 16.032C15.7837 16.447 15.8496 16.9105 15.8496 17.4121C15.8496 18.0765 15.8471 18.711 15.8424 19.4225C15.8412 19.6127 15.8397 19.8159 15.8375 20.1281C16.2129 20.2109 16.5229 20.5077 16.6031 20.9089C16.7114 21.4504 16.3602 21.9773 15.8186 22.0856C14.6794 22.3134 13.8353 21.5538 13.8353 20.5611C13.8353 20.4708 13.836 20.3417 13.8375 20.1145C13.8398 19.8015 13.8412 19.599 13.8425 19.4094C13.8471 18.7019 13.8496 18.0716 13.8496 17.4121C13.8496 16.7148 13.6664 16.2602 13.4237 16.051C12.7627 15.4812 13.0977 14.3973 13.965 14.2999C16.9314 13.9666 18.3012 12.8177 18.3012 9.63971C18.3012 8.68508 17.9893 7.89571 17.3881 7.23559C17.1301 6.95233 17.0567 6.54659 17.199 6.19087C17.3647 5.77663 17.4354 5.23384 17.2941 4.57702L17.2847 4.57968C16.7928 4.71886 16.1744 5.0198 15.4261 5.5285C15.182 5.69438 14.8772 5.74401 14.5932 5.66413C13.7729 5.43343 12.8913 5.315 12.0012 5.315C11.111 5.315 10.2294 5.43343 9.40916 5.66413C9.12662 5.74359 8.82344 5.69492 8.57997 5.53101C7.8274 5.02439 7.2056 4.72379 6.71079 4.58376C6.56735 5.23696 6.63814 5.77782 6.80336 6.19087C6.94565 6.54659 6.87219 6.95233 6.61423 7.23559C6.01715 7.8912 5.70116 8.69376 5.70116 9.63971C5.70116 12.8116 7.07225 13.9683 10.023 14.2999C10.8883 14.3971 11.2246 15.4769 10.5675 16.0482C10.3751 16.2156 10.1384 16.7802 10.1384 17.4121V20.5611C10.1384 21.5474 9.30356 22.2869 8.17878 22.09C7.63476 21.9948 7.27093 21.4766 7.36613 20.9326C7.43827 20.5204 7.75331 20.2116 8.13841 20.1276V19.1381C7.22829 19.1994 6.47656 19.0498 5.88401 18.6533Z"></path></svg>'
const InstagramIcon =
  '<svg class="i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z"></path></svg>'
const LinkedinIcon =
  '<svg class="i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12.001 9.55005C12.9181 8.61327 14.1121 8 15.501 8C18.5385 8 21.001 10.4624 21.001 13.5V21H19.001V13.5C19.001 11.567 17.434 10 15.501 10C13.568 10 12.001 11.567 12.001 13.5V21H10.001V8.5H12.001V9.55005ZM5.00098 6.5C4.17255 6.5 3.50098 5.82843 3.50098 5C3.50098 4.17157 4.17255 3.5 5.00098 3.5C5.8294 3.5 6.50098 4.17157 6.50098 5C6.50098 5.82843 5.8294 6.5 5.00098 6.5ZM4.00098 8.5H6.00098V21H4.00098V8.5Z"></path></svg>'
const MediumIcon =
  '<svg class="i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M6.15791 4H17.8422C19.034 4 20.0001 4.96612 20.0001 6.15789V9.61314C19.8226 9.65789 19.653 9.71748 19.5077 9.79063C19.1077 9.97583 18.7549 10.2528 18.4614 10.6162C17.9888 11.2018 17.7026 11.9931 17.633 12.8824C17.6181 13.059 17.6132 13.2366 17.6164 13.4138C17.6574 15.1766 18.4959 16.6295 20.0001 16.9647V17.8421C20.0001 19.0339 19.034 20 17.8422 20H6.15791C4.96613 20 4.00001 19.0339 4.00001 17.8421V6.15789C4.00001 4.96612 4.96613 4 6.15791 4ZM21.0001 6.15789C21.0001 4.41384 19.5863 3 17.8422 3H6.15791C4.41385 3 3 4.41384 3 6.15789V17.8421C3 19.5862 4.41385 21 6.15791 21H17.8422C19.5863 21 21.0001 19.5862 21.0001 17.8421V6.15789ZM20.0001 10.298V12.2813H19.3839C19.4227 11.4139 19.6365 10.7014 20.0001 10.298ZM20.0001 12.6621V14.7252C19.5588 14.2117 19.3013 13.4758 19.3474 12.6621H20.0001ZM17.6974 7.30004L17.7116 7.29693V7.18701H14.8128L12.1212 13.5132L9.42956 7.18701H6.30575V7.29693L6.31977 7.30004C6.84888 7.41946 7.11751 7.59757 7.11751 8.23987V15.7595C7.11751 16.4018 6.84784 16.5799 6.31874 16.6993L6.30471 16.7024V16.8127H8.42412V16.7028L8.41011 16.6996C7.88098 16.5802 7.61235 16.4021 7.61235 15.7598V8.67605L11.07 16.8127H11.2661L14.8246 8.44914V15.9455C14.7792 16.4528 14.513 16.6095 14.0339 16.7176L14.0197 16.7209V16.83H17.7116V16.7209L17.6974 16.7176C17.2178 16.6095 16.9452 16.4528 16.8999 15.9455L16.8974 8.23987H16.8999C16.8999 7.59757 17.1685 7.41946 17.6974 7.30004Z"></path></svg>'
const SearchIcon =
  '<svg class="i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>'
const SunIcon =
  '<svg class="i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"></path></svg>'
const XIcon =
  '<svg class="i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M10.4883 14.651L15.25 21H22.25L14.3917 10.5223L20.9308 3H18.2808L13.1643 8.88578L8.75 3H1.75L9.26086 13.0145L2.31915 21H4.96917L10.4883 14.651ZM16.25 19L5.75 5H7.75L18.25 19H16.25Z"></path></svg>'
const YoutubeIcon =
  '<svg class="i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M19.6069 6.99482C19.5307 6.69695 19.3152 6.47221 19.0684 6.40288C18.6299 6.28062 16.501 6 12.001 6C7.50098 6 5.37252 6.28073 4.93225 6.40323C4.68776 6.47123 4.4723 6.69593 4.3951 6.99482C4.2863 7.41923 4.00098 9.19595 4.00098 12C4.00098 14.804 4.2863 16.5808 4.3954 17.0064C4.47126 17.3031 4.68676 17.5278 4.93251 17.5968C5.37252 17.7193 7.50098 18 12.001 18C16.501 18 18.6299 17.7194 19.0697 17.5968C19.3142 17.5288 19.5297 17.3041 19.6069 17.0052C19.7157 16.5808 20.001 14.8 20.001 12C20.001 9.2 19.7157 7.41923 19.6069 6.99482ZM21.5442 6.49818C22.001 8.28 22.001 12 22.001 12C22.001 12 22.001 15.72 21.5442 17.5018C21.2897 18.4873 20.547 19.2618 19.6056 19.5236C17.8971 20 12.001 20 12.001 20C12.001 20 6.10837 20 4.39637 19.5236C3.45146 19.2582 2.70879 18.4836 2.45774 17.5018C2.00098 15.72 2.00098 12 2.00098 12C2.00098 12 2.00098 8.28 2.45774 6.49818C2.71227 5.51273 3.45495 4.73818 4.39637 4.47636C6.10837 4 12.001 4 12.001 4C12.001 4 17.8971 4 19.6056 4.47636C20.5505 4.74182 21.2932 5.51636 21.5442 6.49818ZM10.001 15.5V8.5L16.001 12L10.001 15.5Z"></path></svg>'

type Item = {
  group: string
  label: string
  icon: string
  hint?: string
  keywords?: string
} & ({ href: string; external?: boolean } | { run: () => void })

export type PaletteLink = { label: string; href: string; hint: string }

export type CommandPaletteOptions = {
  navigate: (href: string) => void
  toggleTheme: () => void
  setScrollLocked: (locked: boolean) => void
  getRecentPosts: () => PaletteLink[]
}

export type CommandPalette = {
  open: () => void
  destroy: Cleanup
}

const PAGES: ReadonlyArray<[label: string, href: string, keywords: string]> = [
  ['Anasayfa', '/', 'home anasayfa'],
  ['Hakkımda', '/hakkimda', 'about bio teknolojiler'],
  ['Projeler', '/projeler', 'projects work'],
  ['Blog Yazıları', '/blog', 'blog yazilar medium devto'],
  ['İletişim', '/iletisim', 'contact mail e-posta'],
  ['GitHub Projeleri', '/github', 'github repo acik kaynak'],
  ['YouTube İçerikleri', '/youtube', 'youtube muzik video cover'],
]

const SOCIALS: ReadonlyArray<[label: string, href: string, icon: string]> = [
  ['GitHub', 'https://github.com/yasinatesim', GithubIcon],
  ['LinkedIn', 'https://linkedin.com/in/yasinatesim', LinkedinIcon],
  ['X', 'https://x.com/yasinatesim', XIcon],
  ['Instagram', 'https://instagram.com/yasinatesim', InstagramIcon],
  ['Medium', 'https://medium.com/@yasinatesim', MediumIcon],
  ['Dev.to', 'https://dev.to/yasinatesim', DevtoIcon],
  ['YouTube', 'https://www.youtube.com/channel/UCMBBlJsFiUYu2akYvmdi99g', YoutubeIcon],
]

const fold = (s: string): string =>
  s
    .toLocaleLowerCase('tr')
    .replace(/[ıİ]/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

function buildItems(toggleTheme: () => void, posts: PaletteLink[]): Item[] {
  const pages: Item[] = PAGES.map(([label, href, keywords]) => ({
    group: 'Sayfalar',
    label,
    href,
    keywords,
    icon: ArrowRightIcon,
  }))
  const work: Item[] = OTHER_PROJECTS.map((p) => {
    const [label, ...subtitle] = p.title.split(' - ')
    return {
      group: 'Projeler',
      label,
      hint: subtitle.join(' - ') || p.link.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
      href: p.link,
      external: true,
      keywords: p.tags.map((t) => t.text).join(' '),
      icon: FolderIcon,
    }
  })
  const recent: Item[] = posts.slice(0, 8).map((p) => ({ group: 'Son Yazılar', ...p, icon: ArticleIcon }))
  const socials: Item[] = SOCIALS.map(([label, href, icon]) => ({
    group: 'Bağlantılar',
    label,
    hint: href.replace(/^https?:\/\/(www\.)?/, ''),
    href,
    external: true,
    keywords: 'sosyal social',
    icon,
  }))
  const actions: Item[] = [
    {
      group: 'Eylemler',
      label: 'Temayı değiştir',
      hint: 'Açık / Koyu',
      run: toggleTheme,
      keywords: 'tema dark light karanlik aydinlik',
      icon: SunIcon,
    },
    {
      group: 'Eylemler',
      label: 'E-posta adresini kopyala',
      hint: EMAIL,
      run: () => void copyEmail(),
      keywords: 'mail email kopyala',
      icon: CopyIcon,
    },
  ]
  return [...pages, ...work, ...recent, ...socials, ...actions]
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

export function createCommandPalette(options: CommandPaletteOptions): CommandPalette {
  let items: Item[] = []
  let filtered: Item[] = []
  let active = 0

  const dialog = el('dialog', styles['cmdk'])
  dialog.setAttribute('aria-label', 'Hızlı geçiş')
  dialog.setAttribute('data-lenis-prevent', '')
  const panel = el('div', styles['cmdk__panel'])
  const search = el('div', styles['cmdk__search'])
  search.innerHTML = SearchIcon
  const input = el('input', styles['cmdk__input'])
  Object.assign(input, {
    type: 'text',
    placeholder: 'Sayfa, proje veya yazı ara…',
    autocomplete: 'off',
    spellcheck: false,
  })
  input.setAttribute('role', 'combobox')
  input.setAttribute('aria-expanded', 'true')
  input.setAttribute('aria-controls', 'cmdk-list')
  input.setAttribute('aria-autocomplete', 'list')
  search.append(input, el('kbd', styles['cmdk__esc'], 'Esc'))
  const list = el('ul', styles['cmdk__list'])
  list.id = 'cmdk-list'
  list.setAttribute('role', 'listbox')
  list.setAttribute('aria-label', 'Sonuçlar')
  const empty = el('p', styles['cmdk__empty'], 'Eşleşen sonuç yok.')
  empty.hidden = true
  const foot = el('div', `${styles['cmdk__foot']} micro`)
  foot.setAttribute('aria-hidden', 'true')
  foot.append(el('span', '', '↑↓ gez'), el('span', '', '↵ aç'), el('span', '', 'Esc kapat'))
  panel.append(search, list, empty, foot)
  dialog.append(panel)
  document.body.append(dialog)

  const render = (): void => {
    const frag = document.createDocumentFragment()
    let group = ''
    filtered.forEach((it, i) => {
      if (it.group !== group) {
        group = it.group
        const g = el('li', styles['cmdk__group'], group)
        g.setAttribute('role', 'presentation')
        frag.append(g)
      }
      const li = el('li', styles['cmdk__item'])
      li.id = `cmdk-opt-${i}`
      li.dataset.index = String(i)
      li.setAttribute('role', 'option')
      li.setAttribute('aria-selected', String(i === active))
      const ico = el('span', styles['cmdk__ico'])
      ico.innerHTML = it.icon
      li.append(ico, el('span', styles['cmdk__label'], it.label))
      if (it.hint) li.append(el('span', styles['cmdk__hint'], it.hint))
      const enter = el('span', styles['cmdk__enter'])
      enter.innerHTML = 'href' in it && it.external ? ArrowUpRightIcon : EnterIcon
      li.append(enter)
      frag.append(li)
    })
    list.replaceChildren(frag)
    empty.hidden = filtered.length > 0
    input.setAttribute('aria-activedescendant', filtered.length ? `cmdk-opt-${active}` : '')
  }

  const setActive = (i: number, reveal = true): void => {
    if (!filtered.length) return
    active = (i + filtered.length) % filtered.length
    list.querySelectorAll<HTMLElement>('[role="option"]').forEach((node) => {
      node.setAttribute('aria-selected', String(Number(node.dataset.index) === active))
    })
    input.setAttribute('aria-activedescendant', `cmdk-opt-${active}`)
    if (!reveal) return
    if (active === 0) list.scrollTop = 0
    else list.querySelector(`#cmdk-opt-${active}`)?.scrollIntoView({ block: 'nearest' })
  }

  const filter = (): void => {
    const terms = fold(input.value.trim()).split(/\s+/).filter(Boolean)
    filtered = terms.length
      ? items.filter((it) => {
          const hay = fold(`${it.label} ${it.hint ?? ''} ${it.keywords ?? ''} ${it.group}`)
          return terms.every((t) => hay.includes(t))
        })
      : items
    active = 0
    render()
  }

  let returnFocus: HTMLElement | null = null
  const open = (): void => {
    if (dialog.open) return
    returnFocus = document.activeElement instanceof HTMLElement && document.activeElement !== document.body
      ? document.activeElement
      : document.querySelector<HTMLElement>('[data-cmdk-trigger]')
    items = buildItems(options.toggleTheme, options.getRecentPosts())
    input.value = ''
    filter()
    options.setScrollLocked(true)
    dialog.showModal()
    input.focus()
    list.scrollTop = 0
  }
  const close = (): void => {
    if (dialog.open) dialog.close()
  }

  const choose = (it: Item | undefined): void => {
    if (!it) return
    close()
    if ('run' in it) it.run()
    else if (it.external) window.open(it.href, '_blank', 'noopener')
    else options.navigate(it.href)
  }

  const optionIndex = (target: EventTarget | null): number | null => {
    const li = target instanceof Element ? target.closest<HTMLElement>('[role="option"]') : null
    return li ? Number(li.dataset.index) : null
  }

  const listeners = new AbortController()
  const { signal } = listeners
  dialog.addEventListener(
    'close',
    () => {
      options.setScrollLocked(false)
      returnFocus?.focus({ preventScroll: true })
      returnFocus = null
    },
    { signal },
  )
  dialog.addEventListener(
    'click',
    (e) => {
      if (e.target === dialog) close()
    },
    { signal },
  )
  input.addEventListener('input', filter, { signal })
  input.addEventListener(
    'keydown',
    (e) => {
      const moves: Record<string, number> = {
        ArrowDown: active + 1,
        ArrowUp: active - 1,
        Home: 0,
        End: filtered.length - 1,
      }
      if (e.key in moves) {
        e.preventDefault()
        setActive(moves[e.key])
      } else if (e.key === 'Enter') {
        e.preventDefault()
        choose(filtered[active])
      }
    },
    { signal },
  )
  list.addEventListener(
    'click',
    (e) => {
      const i = optionIndex(e.target)
      if (i !== null) choose(filtered[i])
    },
    { signal },
  )
  list.addEventListener(
    'pointermove',
    (e) => {
      const i = optionIndex(e.target)
      if (i !== null && i !== active) setActive(i, false)
    },
    { signal },
  )
  window.addEventListener(
    'keydown',
    (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (dialog.open) close()
        else open()
      }
    },
    { signal },
  )

  return {
    open,
    destroy() {
      listeners.abort()
      close()
      dialog.remove()
    },
  }
}
