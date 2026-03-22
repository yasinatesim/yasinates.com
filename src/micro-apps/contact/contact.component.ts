// @angular/compiler must be imported before any Angular code (JIT mode)
import '@angular/compiler'
import 'reflect-metadata'
import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'

interface SocialLink {
  href: string
  label: string
  icon: string
  classes: string
}

@Component({
  selector: 'app-iletisim',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="container">
        <div class="heading">
          <span class="badge">Bana Ulaşın</span>
          <h2 class="title">İletişim</h2>
          <p class="subtitle">
            Yeni projeler, işbirlikleri ve fikirleriniz için iletişime geçmekten çekinmeyin!
          </p>
        </div>

        <div class="inner">
          <div class="grid">
            <div class="card">
              <div class="infoSection">
                <h3 class="infoTitle">İletişim Bilgileri</h3>
                <div class="infoList">
                  <div class="contactItem">
                    <div class="contactIcon"><i class="ri-mail-line ri-lg"></i></div>
                    <div>
                      <p class="contactLabel">E-posta</p>
                      <a href="mailto:yasinatesim@gmail.com" class="contactValue">
                        yasinatesim@gmail.com
                      </a>
                    </div>
                  </div>
                  <div class="contactItem">
                    <div class="contactIcon"><i class="ri-map-pin-line ri-lg"></i></div>
                    <div>
                      <p class="contactLabel">Konum</p>
                      <p class="contactValue">İstanbul, Türkiye</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="socialTitle">Sosyal Medya</h3>
                <div class="socialRow">
                  <a
                    *ngFor="let link of socialLinks()"
                    [href]="link.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    [attr.aria-label]="link.label"
                    [class]="'socialIcon ' + link.classes"
                  >
                    <i [class]="link.icon" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>

            <div class="card ctaCard">
              <div class="ctaIconWrapper">
                <i class="ri-chat-3-line ctaIcon"></i>
              </div>
              <h3 class="ctaHeading">İletişime geç</h3>
              <p class="ctaDesc">
                Projeleriniz, işbirliği teklifleriniz veya sorularınız için bana ulaşabilirsiniz.
              </p>
              <div class="ctaButtons">
                <a href="mailto:yasinatesim@gmail.com" class="ctaBtn ctaEmail">
                  <div class="ctaBtnIcon"><i class="ri-mail-line ctaBtnIco"></i></div>
                  <div class="ctaBtnText">
                    <span class="ctaBtnLabel">E-posta</span>
                    <span class="ctaBtnSub">yasinatesim&#64;gmail.com</span>
                  </div>
                </a>
                <a
                  href="https://linkedin.com/in/yasinatesim"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="ctaBtn ctaLinkedin"
                >
                  <div class="ctaBtnIcon"><i class="ri-linkedin-fill ctaBtnIco"></i></div>
                  <div class="ctaBtnText">
                    <span class="ctaBtnLabel">LinkedIn</span>
                    <span class="ctaBtnSub">linkedin.com/in/yasinatesim</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section{padding:var(--space-20) 0;background:linear-gradient(135deg,color-mix(in srgb,var(--color-primary) 5%,transparent),var(--color-white),color-mix(in srgb,var(--color-secondary) 5%,transparent));position:relative;overflow:hidden}
    .container{max-width:var(--container-max);margin:0 auto;padding:0 var(--space-4);position:relative;z-index:1}
    .heading{text-align:center;margin-bottom:var(--space-16)}
    .badge{display:inline-block;padding:var(--space-2) var(--space-4);background-color:color-mix(in srgb,var(--color-primary) 10%,transparent);color:var(--color-primary);border-radius:var(--radius-full);font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);margin-bottom:var(--space-4)}
    .title{font-size:var(--font-size-3xl);font-weight:var(--font-weight-bold);margin-bottom:var(--space-4)}
    @media(min-width:768px){.title{font-size:var(--font-size-4xl)}}
    .subtitle{color:var(--color-gray-600);max-width:42rem;margin:0 auto}
    .inner{max-width:72rem;margin:0 auto}
    .grid{display:grid;grid-template-columns:1fr;gap:var(--space-8);align-items:center}
    @media(min-width:768px){.grid{grid-template-columns:repeat(2,1fr)}}
    .card{background:linear-gradient(135deg,color-mix(in srgb,var(--color-primary) 10%,white),var(--color-white),color-mix(in srgb,var(--color-secondary) 10%,white));border-radius:1rem;box-shadow:var(--shadow-lg);padding:var(--space-8);border:2px solid color-mix(in srgb,var(--color-primary) 20%,transparent);transition:transform 0.3s}
    .card:hover{transform:scale(1.02)}
    @media(min-width:768px){.card{padding:var(--space-10)}}
    .infoSection{margin-bottom:var(--space-8)}
    .infoTitle{font-size:var(--font-size-2xl);font-weight:var(--font-weight-semibold);margin-bottom:var(--space-6)}
    .infoList{display:flex;flex-direction:column;gap:var(--space-6)}
    .contactItem{display:flex;align-items:center;gap:var(--space-4)}
    .contactIcon{width:3rem;height:3rem;display:flex;align-items:center;justify-content:center;background-color:color-mix(in srgb,var(--color-primary) 10%,transparent);color:var(--color-primary);border-radius:var(--radius-lg);flex-shrink:0;transition:background-color var(--transition-base),color var(--transition-base)}
    .contactItem:hover .contactIcon{background-color:var(--color-primary);color:var(--color-white)}
    .contactLabel{font-size:var(--font-size-sm);color:var(--color-gray-500);margin-bottom:var(--space-1)}
    .contactValue{font-size:var(--font-size-lg);font-weight:var(--font-weight-medium);color:var(--color-gray-900);text-decoration:none;transition:color var(--transition-base)}
    .contactValue:hover{color:var(--color-primary)}
    .socialTitle{font-size:var(--font-size-2xl);font-weight:var(--font-weight-semibold);margin-bottom:var(--space-6)}
    .socialRow{display:flex;flex-direction:row;gap:var(--space-3);margin-top:var(--space-2)}
    .socialIcon{width:2.5rem;height:2.5rem;display:flex;align-items:center;justify-content:center;border-radius:var(--radius-full);background-color:var(--color-white);border:1px solid var(--color-gray-200);box-shadow:var(--shadow-sm);transition:background-color var(--transition-base),color var(--transition-base);text-decoration:none}
    .socialGithub{color:#374151}.socialGithub:hover{background-color:#111827;color:var(--color-white)}
    .socialLinkedin{color:#1d4ed8}.socialLinkedin:hover{background-color:#1d4ed8;color:var(--color-white)}
    .socialX{color:#111827}.socialX:hover{background-color:#000;color:var(--color-white)}
    .socialInstagram{color:#db2777}.socialInstagram:hover{background-color:#db2777;color:var(--color-white)}
    .socialMedium{color:#1f2937}.socialMedium:hover{background-color:#1f2937;color:var(--color-white)}
    .socialDevto{color:#000}.socialDevto:hover{background-color:#000;color:var(--color-white)}
    .ctaCard{display:flex;flex-direction:column;align-items:center}
    .ctaIconWrapper{width:3.5rem;height:3.5rem;border-radius:var(--radius-full);background-color:var(--color-primary);display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-md);margin-bottom:var(--space-3)}
    .ctaIcon{font-size:1.5rem;color:var(--color-white)}
    .ctaHeading{font-size:var(--font-size-2xl);font-weight:var(--font-weight-bold);color:var(--color-primary);margin-bottom:var(--space-2)}
    .ctaDesc{color:var(--color-gray-700);text-align:center;max-width:28rem}
    .ctaButtons{display:flex;flex-direction:column;gap:var(--space-4);width:100%;margin-top:var(--space-4)}
    .ctaBtn{display:flex;align-items:center;gap:var(--space-4);border-radius:var(--radius-lg);padding:var(--space-4) var(--space-6);box-shadow:var(--shadow-md);text-decoration:none;transition:background-color var(--transition-base),color var(--transition-base)}
    .ctaBtnIcon{width:2.5rem;height:2.5rem;display:flex;align-items:center;justify-content:center;border-radius:var(--radius-full);border:2px solid var(--color-white);box-shadow:var(--shadow-sm);flex-shrink:0;transition:background-color var(--transition-base),color var(--transition-base)}
    .ctaBtnIco{font-size:1.25rem}
    .ctaBtnText{display:flex;flex-direction:column}
    .ctaBtnLabel{font-weight:var(--font-weight-semibold);font-size:var(--font-size-base)}
    .ctaBtnSub{font-size:var(--font-size-sm);transition:color var(--transition-base)}
    .ctaEmail{background-color:color-mix(in srgb,var(--color-primary) 10%,transparent);border:1px solid color-mix(in srgb,var(--color-primary) 20%,transparent);color:inherit}
    .ctaEmail:hover{background-color:var(--color-primary);color:var(--color-white)}
    .ctaEmail .ctaBtnIcon{background-color:var(--color-primary);color:var(--color-white)}
    .ctaEmail:hover .ctaBtnIcon{background-color:var(--color-white);color:var(--color-primary)}
    .ctaEmail .ctaBtnSub{color:var(--color-gray-700)}.ctaEmail:hover .ctaBtnSub{color:var(--color-white)}
    .ctaLinkedin{background-color:#eff6ff;border:1px solid #bfdbfe;color:inherit}
    .ctaLinkedin:hover{background-color:#1d4ed8;color:var(--color-white)}
    .ctaLinkedin .ctaBtnIcon{background-color:#1d4ed8;color:var(--color-white)}
    .ctaLinkedin:hover .ctaBtnIcon{background-color:var(--color-white);color:#1d4ed8}
    .ctaLinkedin .ctaBtnSub{color:var(--color-gray-700)}.ctaLinkedin:hover .ctaBtnSub{color:#bfdbfe}
  `],
})
export class ContactComponent {
  readonly socialLinks = signal<SocialLink[]>([
    { href: 'https://github.com/yasinatesim',       label: 'GitHub',    icon: 'ri-github-fill',    classes: 'socialGithub' },
    { href: 'https://linkedin.com/in/yasinatesim',  label: 'LinkedIn',  icon: 'ri-linkedin-fill',  classes: 'socialLinkedin' },
    { href: 'https://twitter.com/yasinatesim',      label: 'X',         icon: 'ri-twitter-x-fill', classes: 'socialX' },
    { href: 'https://instagram.com/yasinatesim',    label: 'Instagram', icon: 'ri-instagram-fill', classes: 'socialInstagram' },
    { href: 'https://medium.com/@yasinatesim',      label: 'Medium',    icon: 'ri-medium-fill',    classes: 'socialMedium' },
    { href: 'https://dev.to/yasinatesim',           label: 'Dev.to',    icon: 'ri-code-box-fill',  classes: 'socialDevto' },
  ])
}
