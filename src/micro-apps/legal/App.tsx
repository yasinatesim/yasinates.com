import { PrivacyPolicy } from './components/PrivacyPolicy'
import { TermsOfUse } from './components/TermsOfUse'

export type LegalPage = 'privacy' | 'terms'

export default function LegalApp({ page }: { page: LegalPage }) {
  return page === 'privacy' ? <PrivacyPolicy /> : <TermsOfUse />
}
