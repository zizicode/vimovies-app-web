import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../../store/locate.store'
import { getPosterSrcSet, getBackdropSrcSet, getPosterUrl } from '../../utils/image.utils'
import './HeaderMovie.scss'

export interface MovieData {
  id: string | number
  slug: string
  backdrop: string
  backdropSmall?: string
  poster: string
  posterPath?: string
  backdropPath?: string
  title: string
  titleAccent?: string          // parte del título resaltada en violeta
  year: number
  runtime: string
  genres?: string[]
  director: string
  cast?: string[]
  synopsis: string
  rating: number
  score?: number
  mpaa?: string
  platforms?: Array<{ name: string; color: string }>
}

interface HeaderMovieProps {
  movies: MovieData[]
  autoPlay?: boolean
  interval?: number
  onWatchClick?: (movie: MovieData) => void
  onTrailerClick?: (movie: MovieData) => void
  onSaveClick?: (movie: MovieData) => void
  onShareClick?: (movie: MovieData) => void
}

const StarIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)
const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)
const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M5 3l14 9-14 9V3z" />
  </svg>
)
const VideoIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
  </svg>
)
const BookmarkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
)
const ShareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
)
const ChevronLeftIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)
const ChevronRightIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const HeaderMovie: React.FC<HeaderMovieProps> = ({
  movies,
  autoPlay = true,
  interval = 7000,
  onWatchClick,
  onTrailerClick,
  onSaveClick,
  onShareClick,
}) => {
  const locale = useLocale()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const getMovieUrl = (slug: string) => {
    return locale === 'en' ? `/movie/${slug}` : `/pelicula/${slug}`;
  };

  const goTo = useCallback(
    (index: number) => {
      if (transitioning || index === currentSlide || movies.length <= 1) return
      setTransitioning(true)
      setTimeout(() => {
        setCurrentSlide(index)
        setTransitioning(false)
      }, 750)
    },
    [transitioning, currentSlide, movies.length],
  )

  const next = useCallback(() => {
    goTo((currentSlide + 1) % movies.length)
  }, [currentSlide, movies.length, goTo])

  const prev = useCallback(() => {
    goTo((currentSlide - 1 + movies.length) % movies.length)
  }, [currentSlide, movies.length, goTo])

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (autoPlay && movies.length > 1) {
      timerRef.current = setInterval(next, interval)
    }
  }, [autoPlay, movies.length, interval, next])

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [resetTimer])

  // Reiniciar timer al cambiar slide manualmente
  const handleGoTo = (index: number) => { goTo(index); resetTimer() }
  const handleNext = () => { next(); resetTimer() }
  const handlePrev = () => { prev(); resetTimer() }

  if (!movies.length) return null

  return (
    <div className="hms-root" aria-label="Películas destacadas">
      {movies.map((movie, index) => {
        const isActive = index === currentSlide
        const isVisible = isActive || transitioning

        return (
          <Link
            key={movie.id}
            to={getMovieUrl(movie.slug)}
            className={`hm-slide${isActive ? ' hm-slide--active' : ''}`}
            style={{ display: isVisible ? 'flex' : 'none' }}
            aria-hidden={!isActive}
          >
            {/* Backdrop principal (LCP) */}
            <div className="hm-backdrop-container">
              <img
                 src={movie.backdrop}
                 srcSet={getBackdropSrcSet(movie.backdropPath)}
                 sizes="(max-width: 900px) 780px, 1280px"
                 className="hm-backdrop-img"
                 alt=""
                 width="1280"
                 height="720"
                 loading={index === 0 ? "eager" : "lazy"}
                 {...(index === 0 ? { fetchPriority: "high" } : {})}
                 decoding="async"
               />
              <div 
                className="hm-backdrop-blur" 
                style={{ '--hm-backdrop-small': `url(${movie.backdropSmall ?? movie.backdrop})` } as React.CSSProperties}
                aria-hidden="true"
              />
            </div>

            {/* Gradiente cinematográfico */}
            <div className="hm-gradient" aria-hidden="true" />

            {/* Contenido principal */}
            <div className="hm-content">

              {/* Poster */}
              <div className="hm-poster-wrap" aria-hidden="true">
                <img
                  src={getPosterUrl(movie.posterPath, 'w185')}
                  srcSet={getPosterSrcSet(movie.posterPath)}
                  sizes="(max-width: 600px) 150px, 200px"
                  alt={`Póster de ${movie.title}`}
                  width="200"
                  height="300"
                  loading={index === 0 ? "eager" : "lazy"}
                  {...(index === 0 ? { fetchPriority: "high" } : {})}
                  decoding="async"
                />
              </div>

              {/* Info */}
              <div className="hm-info">

                {/* Badges */}
                <div className="hm-badges">
                  {(movie.genres ?? []).slice(0, 2).map((g) => (
                    <span key={g} className="hm-badge hm-badge--genre">{g}</span>
                  ))}
                  <span className="hm-badge hm-badge--year">{movie.year}</span>
                  <span className="hm-badge hm-badge--rating">
                    <StarIcon />
                    {movie.rating.toFixed(1)}
                  </span>
                  {movie.mpaa && (
                    <span className="hm-badge hm-badge--mpaa">{movie.mpaa}</span>
                  )}
                </div>

                {/* Título */}
                <h1 className="hm-title">
                  {movie.title}
                  {movie.titleAccent && (
                    <> <span>{movie.titleAccent}</span></>
                  )}
                </h1>

                {/* Meta */}
                <div className="hm-meta">
                  <span className="hm-meta-item">
                    <ClockIcon />
                    {movie.runtime}
                  </span>
                  <div className="hm-meta-sep" aria-hidden="true" />
                  <span className="hm-meta-item">{movie.director}</span>
                  {(movie.cast ?? []).length > 0 && (
                    <>
                      <div className="hm-meta-sep" aria-hidden="true" />
                      <span className="hm-meta-item">
                        {(movie.cast ?? []).slice(0, 2).join(' · ')}
                      </span>
                    </>
                  )}
                </div>

                {/* Sinopsis */}
                <p className="hm-synopsis">{movie.synopsis}</p>

                {/* Acciones */}
                <div className="hm-actions">
                  <button
                    className="hm-btn-primary"
                    onClick={() => onWatchClick?.(movie)}
                    aria-label={`Dónde ver ${movie.title}`}
                  >
                    <PlayIcon />
                    Dónde ver
                  </button>

                  <button
                    className="hm-btn-ghost"
                    onClick={() => onTrailerClick?.(movie)}
                    aria-label={`Ver tráiler de ${movie.title}`}
                  >
                    <VideoIcon />
                    Ver tráiler
                  </button>

                  <div className="hm-actions-secondary">
                    <button
                      className="hm-btn-icon"
                      aria-label="Guardar en lista"
                      onClick={() => onSaveClick?.(movie)}
                    >
                      <BookmarkIcon />
                    </button>

                    <button
                      className="hm-btn-icon"
                      aria-label="Compartir"
                      onClick={() => onShareClick?.(movie)}
                    >
                      <ShareIcon />
                    </button>

                    {movie.score !== undefined && (
                      <div
                        className="hm-score"
                        aria-label={`Puntuación: ${movie.score}`}
                        role="img"
                      >
                        <span className="hm-score-val">{movie.score}</span>
                        <span className="hm-score-lbl">Score</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Plataformas */}
                {(movie.platforms ?? []).length > 0 && (
                  <div className="hm-platforms">
                    <span className="hm-plat-lbl">Ver en</span>
                    {(movie.platforms ?? []).map((p) => (
                      <div key={p.name} className="hm-plat-chip">
                        <div
                          className="hm-plat-dot"
                          style={{ background: p.color }}
                          aria-hidden="true"
                        />
                        {p.name}
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </Link>
        )
      })}

      {/* Controles del slider */}
      {movies.length > 1 && (
        <div className="hm-controls">
          <button
            className="hm-ctrl-btn hm-ctrl-btn--prev"
            onClick={handlePrev}
            aria-label="Película anterior"
          >
            <ChevronLeftIcon />
          </button>

          <div className="hm-dots" role="tablist" aria-label="Navegación de películas">
            {movies.map((movie, i) => (
              <button
                key={i}
                className={`hm-dot${i === currentSlide ? ' hm-dot--active' : ''}`}
                onClick={() => handleGoTo(i)}
                role="tab"
                aria-selected={i === currentSlide}
                aria-label={movie.title}
              />
            ))}
          </div>

          <button
            className="hm-ctrl-btn hm-ctrl-btn--next"
            onClick={handleNext}
            aria-label="Película siguiente"
          >
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </div>
  )
}

export default HeaderMovie