import { useLocale, useT } from '../../../store/locate.store'
import { getPosterUrl, getBackdropUrl } from '../../../utils/image.utils'
import type { Media } from '../../../lib/api/types'

interface HeroSectionProps {
  movie: Media
}

export default function HeroSection({ movie }: HeroSectionProps) {
  const locale = useLocale()
  const t = useT()
  const isEnglish = locale === 'en'

  const title = isEnglish ? movie.title_en : movie.title_es
  const synopsis = isEnglish ? movie.synopsis_en : movie.synopsis_es

  const handleTrailerClick = () => {
    // Scroll to trailers section or open modal
    const trailersSection = document.getElementById('trailers-section')
    if (trailersSection) {
      trailersSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="hero-section">
      {/* Backdrop con imagen */}
      <div className="hero-section__backdrop">
        <div
          className="hero-section__backdrop-img"
          style={{ backgroundImage: `url(${getBackdropUrl(movie.backdrop_path, 'w1280')})` }}
        />
        <div className="hero-section__backdrop-blur" />
      </div>

      {/* Gradiente lateral */}
      <div className="hero-section__gradient" />

      {/* Contenido */}
      <div className="hero-section__content">
        {/* Poster */}
        <div className="hero-section__poster-wrap">
          {movie.poster_path ? (
            <img
              src={getPosterUrl(movie.poster_path, 'w500')}
              alt={title}
              className="hero-section__poster"
            />
          ) : (
            <div className="hero-section__poster-placeholder">
              <span>{title}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="hero-section__info">
          {/* Badges */}
          <div className="hero-section__badges">
            {movie.genres && movie.genres.length > 0 && (
              movie.genres.slice(0, 3).map((genre) => (
                <span key={genre.id} className="hero-section__badge hero-section__badge--genre">
                  {isEnglish ? genre.name_en : genre.name_es}
                </span>
              ))
            )}
            {movie.release_date && (
              <span className="hero-section__badge hero-section__badge--year">
                {new Date(movie.release_date).getFullYear()}
              </span>
            )}
            {movie.editorial_rating && (
              <span className="hero-section__badge hero-section__badge--rating">
                ⭐ {movie.editorial_rating.toFixed(1)}
              </span>
            )}
          </div>

          {/* Título */}
          <h1 className="hero-section__title">{title}</h1>
          {movie.original_title && movie.original_title !== title && (
            <p className="hero-section__original-title">{movie.original_title}</p>
          )}

          {/* Metadatos */}
          <div className="hero-section__meta">
            {movie.runtime_minutes && (
              <span className="hero-section__meta-item">
                {Math.floor(movie.runtime_minutes / 60)}h {movie.runtime_minutes % 60}min
              </span>
            )}
            {movie.genres && movie.genres.length > 0 && (
              <>
                <span className="hero-section__meta-separator" />
                <span className="hero-section__meta-item">
                  {movie.genres.slice(0, 2).map((g, i) => (
                    <span key={g.id}>
                      {i > 0 && ', '}
                      {isEnglish ? g.name_en : g.name_es}
                    </span>
                  ))}
                </span>
              </>
            )}
            {movie.status && (
              <>
                <span className="hero-section__meta-separator" />
                <span className="hero-section__meta-item">{movie.status}</span>
              </>
            )}
          </div>

          {/* Sinopsis recortada */}
          <p className="hero-section__synopsis">{synopsis}</p>

          {/* Botones */}
          <div className="hero-section__actions">
            <button
              className="hero-section__btn-primary"
              onClick={handleTrailerClick}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              {t('components.heroSection.watchTrailer')}
            </button>
            <button className="hero-section__btn-ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              {t('components.heroSection.save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
