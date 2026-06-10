import React from 'react'
import { useLocale } from '../../../store/locate.store'
import type { Media } from '../../../lib/api/types'

interface QuickStatsBarProps {
  movie: Media
}

export default function QuickStatsBar({ movie }: QuickStatsBarProps) {
  const locale = useLocale()
  const isEnglish = locale === 'en'

  return (
    <div className="stats-bar">
      <div className="stats-bar__container">
        {/* Valoración */}
        {movie.editorial_rating && (
          <div className="stats-bar__stat">
            <span className="stats-bar__label">Valoración</span>
            <span className="stats-bar__value stats-bar__value--gold">
              {movie.editorial_rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Fecha estreno */}
        {movie.release_date && (
          <div className="stats-bar__stat">
            <span className="stats-bar__label">Estreno</span>
            <span className="stats-bar__value">
              {new Date(movie.release_date).toLocaleDateString(isEnglish ? 'en-US' : 'es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
