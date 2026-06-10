import { useLocale } from '../../../store/locate.store'
import type { Media } from '../../../lib/api/types'

interface TechnicalDetailsAsideProps {
  movie: Media
}

export default function TechnicalDetailsAside({ movie }: TechnicalDetailsAsideProps) {
  const locale = useLocale()
  const isEnglish = locale === 'en'

  const details = [
    { label: 'Estado', value: movie.status },
    { label: 'Fecha estreno', value: movie.release_date ? new Date(movie.release_date).toLocaleDateString(isEnglish ? 'en-US' : 'es-ES') : null },
    { label: 'Duración', value: movie.runtime ? `${movie.runtime} min` : null },
    { label: 'Presupuesto', value: movie.budget ? `$${(movie.budget / 1000000).toFixed(1)}M` : null },
    { label: 'Revenue', value: movie.revenue ? `$${(movie.revenue / 1000000).toFixed(1)}M` : null },
  ].filter(d => d.value !== null)

  if (details.length === 0) {
    return null
  }

  return (
    <aside className="technical-details">
      <h3 className="technical-details__title">Detalles Técnicos</h3>
      <div className="technical-details__rows">
        {details.map((detail, index) => (
          <div key={index} className="technical-details__row">
            <span className="technical-details__key">{detail.label}</span>
            <span className="technical-details__value">{detail.value}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}
