import type { ComponentType, SVGProps } from 'react'
import { DevtoIcon, GithubIcon, InstagramIcon, LinkedinIcon, MediumIcon, XIcon, YoutubeIcon } from '~/assets/icons/react'
import { SOCIAL_LINKS, type SocialLink } from '../content'

const SOCIAL_ICONS: Record<SocialLink['icon'], ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  instagram: InstagramIcon,
  medium: MediumIcon,
  devto: DevtoIcon,
  youtube: YoutubeIcon,
}

export default function Socials({ className = '', labels = false }: { className?: string; labels?: boolean }) {
  return (
    <ul className={`socials ${className}`}>
      {SOCIAL_LINKS.map((s) => {
        const SocialIcon = SOCIAL_ICONS[s.icon]
        return (
          <li key={s.url}>
            <a className="social" href={s.url} target="_blank" rel="noopener" aria-label={s.name}>
              <SocialIcon />
              {labels && <span>{s.name}</span>}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
