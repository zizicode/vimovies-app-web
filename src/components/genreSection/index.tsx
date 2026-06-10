import React, { useRef, useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import './GenreSection.scss'
import type { Genre } from '../../types';
import { useI18n } from '../../store/locate.store';
import { useLocalizedContent } from '../../lib/i18n/content';

// ── Colores por género (CSS custom property --genre-color) ─────────────────
const GENRE_COLORS: Record<string, { color: string; dim: string }> = {
  'Acción':           { color: '#f97316', dim: 'rgba(249,115,22,0.15)' },
  'Aventura':         { color: '#eab308', dim: 'rgba(234,179,8,0.15)' },
  'Animación':        { color: '#22d3ee', dim: 'rgba(34,211,238,0.15)' },
  'Ciencia ficción':  { color: '#60a5fa', dim: 'rgba(96,165,250,0.15)' },
  'Comedia':          { color: '#facc15', dim: 'rgba(250,204,21,0.15)' },
  'Crimen':           { color: '#f43f5e', dim: 'rgba(244,63,94,0.15)' },
  'Documental':       { color: '#a3e635', dim: 'rgba(163,230,53,0.15)' },
  'Drama':            { color: '#c084fc', dim: 'rgba(192,132,252,0.15)' },
  'Fantasía':         { color: '#818cf8', dim: 'rgba(129,140,248,0.15)' },
  'Historia':         { color: '#d97706', dim: 'rgba(217,119,6,0.15)' },
  'Horror':           { color: '#ef4444', dim: 'rgba(239,68,68,0.15)' },
  'Musical':          { color: '#e879f9', dim: 'rgba(232,121,249,0.15)' },
  'Misterio':         { color: '#38bdf8', dim: 'rgba(56,189,248,0.15)' },
  'Romance':          { color: '#fb7185', dim: 'rgba(251,113,133,0.15)' },
  'Suspense':         { color: '#94a3b8', dim: 'rgba(148,163,184,0.15)' },
  'Terror':           { color: '#dc2626', dim: 'rgba(220,38,38,0.15)' },
  'Western':          { color: '#ca8a04', dim: 'rgba(202,138,4,0.15)' },
}

const FALLBACK_COLOR = { color: 'rgba(255,255,255,0.4)', dim: 'rgba(255,255,255,0.1)' }

// ── Props ajustadas para usar la interfaz Genre ─────────────────────────────
export interface GenreSectionProps {
  title?: string
  genres: Genre[]
  scrollStep?: number
}

// ── Iconos inline mínimos ─────────────────────────────────────────────────
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

// ── Componente ────────────────────────────────────────────────────────────
const GenreSection: React.FC<GenreSectionProps> = ({
  title = 'Géneros',
  genres,
  scrollStep = 260,
}) => {
  const {locale} = useI18n();
  const { getPath } = useLocalizedContent();
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd]     = useState(false)

  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return

    const sync = () => {
      const { scrollLeft, clientWidth, scrollWidth } = el
      setAtStart(scrollLeft <= 4)
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 4)
    }

    sync()
    el.addEventListener('scroll', sync, { passive: true })
    const ro = new ResizeObserver(sync)
    ro.observe(el)

    return () => {
      el.removeEventListener('scroll', sync)
      ro.disconnect()
    }
  }, [genres, locale])

  const scrollBy = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({ left: dir === 'right' ? scrollStep : -scrollStep, behavior: 'smooth' })
  }


  const sliderClass = [
    'genre-section__slider',
    atStart ? 'genre-section__slider--at-start' : '',
    atEnd   ? 'genre-section__slider--at-end'   : '',
  ].filter(Boolean).join(' ')

  return (
    <section className="genre-section" aria-labelledby="genre-section-title">
      <div className="genre-section__container">

        {/* Encabezado */}
        <div className="genre-section__header">
          <h2 className="genre-section__title" id="genre-section-title">
            {title}
          </h2>
          <span className="genre-section__count" aria-label={`${genres.length} géneros disponibles`}>
            {genres.length} géneros
          </span>
        </div>

        {/* Slider */}
        <div className={sliderClass}>

          {/* Nav: anterior */}
          <button
            className="genre-section__nav genre-section__nav--prev"
            onClick={() => scrollBy('left')}
            disabled={atStart}
            aria-label="Géneros anteriores"
          >
            <ChevronLeft />
          </button>

          {/* Track con pills */}
          <div
            className="genre-section__track"
            ref={trackRef}
            role="group"
            aria-label="Lista de géneros"
          >
            {genres.map((genre) => {
              const palette = GENRE_COLORS[genre.name_es] ?? FALLBACK_COLOR
              const genrePath = getPath(`/genero/${genre.slug}`, `/genre/${genre.slug}`)

              return (
                <Link
                  key={genre.id}
                  to={genrePath}
                  className="genre-section__genre"
                  style={{
                    '--genre-color':     palette.color,
                    '--genre-color-dim': palette.dim,
                  } as React.CSSProperties}
                  aria-label={genre.name_es}
                >
                  {locale === 'en' ? genre.name_en : genre.name_es}
                </Link>
              )
            })}
          </div>

          {/* Nav: siguiente */}
          <button
            className="genre-section__nav genre-section__nav--next"
            onClick={() => scrollBy('right')}
            disabled={atEnd}
            aria-label="Géneros siguientes"
          >
            <ChevronRight />
          </button>

        </div>
      </div>
    </section>
  )
}

export default GenreSection