import { useState } from 'react'
import { useLocale } from '../../../store/locate.store'
import type { Media } from '../../../lib/api/types'
// import WhereToWatchTab from './WhereToWatchTab'
import TrailersTab from './TrailersTab'
import SynopsisTab from './SynopsisTab'
import CastSlider from './CastSlider'

interface TabsSectionProps {
  movie: Media
}

type TabType = 'watch' | 'trailers' | 'synopsis'

export default function TabsSection({ movie }: TabsSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('watch')
  const locale = useLocale()
  const isEnglish = locale === 'en'

  // Calcular cantidades para badges
  const watchCount = movie.credits?.length ?? 0
  const trailersCount = movie.videos?.length ?? 0
  const synopsisCount = (isEnglish ? movie.synopsis_en : movie.synopsis_es) ? 1 : 0

  const tabs = [
    { id: 'watch' as TabType, label: 'Reparto', count: watchCount },
    { id: 'trailers' as TabType, label: 'Tráilers', count: trailersCount },
    { id: 'synopsis' as TabType, label: 'Sinopsis', count: synopsisCount },
  ]

  return (
    <div className="tabs-section">
      <div className="tabs-section__container">
        {/* Tabs navigation */}
        <nav className="tabs-section__nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tabs-section__tab ${
                activeTab === tab.id ? 'tabs-section__tab--active' : ''
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="tabs-section__badge">{tab.count}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Tab content */}
        {activeTab === 'watch' && <CastSlider movie={movie} />}
        {activeTab === 'trailers' && <TrailersTab movie={movie} />}
        {activeTab === 'synopsis' && <SynopsisTab movie={movie} isEnglish={isEnglish} />}
      </div>
    </div>
  )
}
