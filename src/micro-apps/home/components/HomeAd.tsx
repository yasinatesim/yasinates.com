import { AdSlot } from '~/micro-apps/_shared/ads/AdSlot'

// Sits between two `.section`s, whose padding spaces it from both neighbours.
export default function HomeAd() {
  return (
    <div className="wrap">
      <AdSlot kind="inline" />
    </div>
  )
}
