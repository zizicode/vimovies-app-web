import { useState } from 'react'
import { useLocale } from '../../../store/locate.store'
import type { Media } from '../../../lib/api/types'

interface EditorialReviewProps {
  movie: Media
}

export default function EditorialReview({ movie }: EditorialReviewProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const locale = useLocale()
  const isEnglish = locale === 'en'

  const review = isEnglish ? movie.editorial_review_en : movie.editorial_review_es
  const verdict = isEnglish ? movie.editorial_verdict_en : movie.editorial_verdict_es
  const rating = movie.editorial_rating
  const director = movie.credits?.find(c => c.role === 'director')
  const directorName = director?.person?.name || director?.name

  if (!review) return null

  return (
    <div className="editorial-review">
      <div className="editorial-review__container">

        <p className="editorial-review__section-label">Crítica</p>
        <h2 className="editorial-review__section-title">Reseña Editorial</h2>

        <div className="editorial-review__card">

          {/* Director */}
          {directorName && (
            <div className="editorial-review__director">
              <span className="editorial-review__director-label">Director</span>
              <span className="editorial-review__director-name">{directorName}</span>
            </div>
          )}

          {/* Rating */}
          {rating && (
            <div className="editorial-review__rating">
              <div className="editorial-review__stars">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`editorial-review__star ${
                      i < Math.round(rating / 2)
                        ? 'editorial-review__star--filled'
                        : ''
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div>
                <div className="editorial-review__score">{rating.toFixed(1)}</div>
                <div className="editorial-review__score-sub">de 10 puntos</div>
              </div>
            </div>
          )}

          {/* Veredicto */}
          {verdict && (
            <p className="editorial-review__verdict">{verdict}</p>
          )}

          {/* Texto + leer más */}
          <div className="editorial-review__text-wrap">
            <p className={`editorial-review__text ${isExpanded ? 'editorial-review__text--expanded' : ''}`}>
              {review}
            </p>
            <div className={`editorial-review__fade ${isExpanded ? 'editorial-review__fade--hidden' : ''}`} />
          </div>

          <button
            className={`editorial-review__read-more ${isExpanded ? 'editorial-review__read-more--expanded' : ''}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <i className={`ti ti-chevron-down`} style={{ fontSize: 14 }} aria-hidden="true" />
            {isExpanded ? 'Leer menos' : 'Leer más'}
          </button>

        </div>
      </div>
    </div>
  )
}