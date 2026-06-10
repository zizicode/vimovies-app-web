import { useLocale } from '../../../store/locate.store'
import type { Media } from '../../../lib/api/types'

interface TechnicalDetailsExtendedProps {
  movie: Media
}

export default function TechnicalDetailsExtended({ movie }: TechnicalDetailsExtendedProps) {
  const locale = useLocale()
  const isEnglish = locale === 'en'

  // Agrupar campos técnicos
  const basicDetails = [
    { label: 'Original Title', value: movie.title_en },
    { label: 'Título Original', value: movie.title_es },
    { label: 'Estado', value: movie.status },
    { label: 'Fecha estreno', value: movie.release_date ? new Date(movie.release_date).toLocaleDateString(isEnglish ? 'en-US' : 'es-ES') : null },
    { label: 'Duración', value: movie.runtime ? `${movie.runtime} min` : null },
  ].filter(d => d.value !== null)

  const financialDetails = [
    { label: 'Presupuesto', value: movie.budget ? `$${(movie.budget / 1000000).toFixed(1)}M` : null },
    { label: 'Revenue', value: movie.revenue ? `$${(movie.revenue / 1000000).toFixed(1)}M` : null },
  ].filter(d => d.value !== null)

  const tmdbDetails = [
    { label: 'TMDB ID', value: movie.tmdb_id?.toString() },
    { label: 'IMDB ID', value: movie.imdb_id },
    { label: 'Popularidad', value: movie.tmdb_popularity?.toFixed(1) },
    { label: 'Votos', value: movie.vote_count?.toString() },
  ].filter(d => d.value !== null)

  if (basicDetails.length === 0 && financialDetails.length === 0 && tmdbDetails.length === 0) {
    return null
  }

  return (
    <section className="technical-details-extended">
      <div className="technical-details-extended__container">
        <h2 className="technical-details-extended__title">Detalles Técnicos</h2>
        <div className="technical-details-extended__grid">
          {basicDetails.length > 0 && (
            <div className="technical-details-extended__card">
              <h4 className="technical-details-extended__card-title">Información Básica</h4>
              <div className="technical-details-extended__rows">
                {basicDetails.map((detail, index) => (
                  <div key={index} className="technical-details-extended__row">
                    <span className="technical-details-extended__key">{detail.label}</span>
                    <span className="technical-details-extended__value">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {financialDetails.length > 0 && (
            <div className="technical-details-extended__card">
              <h4 className="technical-details-extended__card-title">Financiero</h4>
              <div className="technical-details-extended__rows">
                {financialDetails.map((detail, index) => (
                  <div key={index} className="technical-details-extended__row">
                    <span className="technical-details-extended__key">{detail.label}</span>
                    <span className="technical-details-extended__value">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tmdbDetails.length > 0 && (
            <div className="technical-details-extended__card">
              <h4 className="technical-details-extended__card-title">TMDB</h4>
              <div className="technical-details-extended__rows">
                {tmdbDetails.map((detail, index) => (
                  <div key={index} className="technical-details-extended__row">
                    <span className="technical-details-extended__key">{detail.label}</span>
                    <span className="technical-details-extended__value">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
