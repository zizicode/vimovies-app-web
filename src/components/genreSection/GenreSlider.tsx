import { useI18n } from '../../store/locate.store'
import { useLocalizedContent } from '../../lib/i18n/content'
import { Link } from 'react-router-dom'
import { memo } from 'react'
import type { GenreStats } from '../../lib/api/genres'
import './GenreSlider.scss'

interface GenreSliderProps {
  genres: GenreStats[]
  currentSlug?: string | null
}

function GenreSlider({ genres, currentSlug }: GenreSliderProps) {
  const { locale } = useI18n()
  const { getPath } = useLocalizedContent()

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('genre-slider-container')
    if (container) {
      const scrollAmount = 300
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="genre-slider">
      {/* Botón de scroll izquierdo */}
      <button
        onClick={() => scrollContainer('left')}
        className="genre-slider__scroll-btn genre-slider__scroll-btn--left"
        aria-label="Scroll left"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Contenedor de scroll */}
      <div
        id="genre-slider-container"
        className="genre-slider__container"
      >
        {genres.map((genre) => {
          const genreName = locale === 'es' ? genre.name_es : genre.name_en
          const isSelected = currentSlug === genre.slug
          const genrePath = getPath(`/genero/${genre.slug}`, `/genre/${genre.slug}`)

          return (
            <Link
              key={genre.slug}
              to={genrePath}
              className={`genre-slider__item ${
                isSelected
                  ? 'genre-slider__item--selected'
                  : 'genre-slider__item--unselected'
              }`}
            >
              <span>{genreName}</span>
              <span className={`genre-slider__badge ${
                isSelected ? 'genre-slider__badge--selected' : 'genre-slider__badge--unselected'
              }`}>
                {genre.media_count}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Botón de scroll derecho */}
      <button
        onClick={() => scrollContainer('right')}
        className="genre-slider__scroll-btn genre-slider__scroll-btn--right"
        aria-label="Scroll right"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default memo(GenreSlider)
