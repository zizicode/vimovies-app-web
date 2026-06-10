import React, { useRef, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useI18n, useT } from '../../store/locate.store';
import { getPosterUrl, getPosterSrcSet } from '../../utils/image.utils';

import './movieTendencies.scss';
import { useMoviesStore } from '../../store/api/media.store';

const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
);

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
);

const MovieTendencies: React.FC = () => {
  const { locale } = useI18n();
  const t = useT();
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const {movies} = useMoviesStore()

  const getMovieUrl = (slug: string) => {
    return locale === 'en' ? `/movie/${slug}` : `/pelicula/${slug}`;
  };

  // Sincronizar flechas según la posición del scroll con useLayoutEffect para evitar reflows
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const sync = () => {
      const { scrollLeft, clientWidth, scrollWidth } = el;
      setAtStart(scrollLeft <= 10);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
    };

    sync();
    el.addEventListener('scroll', sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', sync);
      ro.disconnect();
    };
  }, [movies]); // Re-sincronizar si cambian las películas

  const scroll = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    // Desplaza el equivalente al 80% del ancho visible para un efecto natural
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <div className='tendencies'>
      <div className="conteiner_tendencies">
        <p>{t('components.movieTendencies.thisWeek')}</p>
        <div className="tendencies__header">
          <h1>{t('components.movieTendencies.trends')}</h1>
        </div>

        <div className={`tendencies__slider ${atStart ? 'is-start' : ''} ${atEnd ? 'is-end' : ''}`}>
          {/* Botón Prev */}
          <button
            className="tendencies__nav tendencies__nav--prev"
            onClick={() => scroll('left')}
            disabled={atStart}
            aria-label={t('components.movieTendencies.previous')}
          >
            <ChevronLeft />
          </button>

          {/* Track del Slider */}
          <ul className='container_movie' ref={trackRef}>
            {movies.length === 0 ? (
              <li className="tendencies__empty">
                <p>{locale === 'en' ? 'No trending movies available' : 'No hay películas en tendencia'}</p>
              </li>
            ) : (
              movies.map((movie, index) => {
                const title = locale === 'en' ? movie.title_en : movie.title_es;
                const synopsis = locale === 'en' ? movie.synopsis_en : movie.synopsis_es;
                const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
                const rating = movie.editorial_rating ?? 0;

                // Render de estrellas básico (máximo 5)
                const stars = '⭐'.repeat(Math.min(5, Math.max(1, Math.round(rating / 2))));

                return (
                  <Link to={getMovieUrl(movie.slug)} className='item_movies' key={movie.id}>
                    <div className="poster">
                      <img
                        src={getPosterUrl(movie.poster_path, 'w185')}
                        srcSet={getPosterSrcSet(movie.poster_path)}
                        sizes="(max-width: 600px) 185px, 240px"
                        alt={title ?? movie.original_title}
                        width="240"
                        height="360"
                        className="poster__img"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="populary">#{index + 1}</div>
                      <button className="save-button" aria-label={t('components.movieTendencies.saveMovie')} onClick={(e) => e.preventDefault()}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                      </button>
                    </div>
                    <div className="detail">
                      <h2>{title ?? movie.original_title}</h2>
                      <p className="detail__synopsis">{synopsis || t('components.movieTendencies.noDescription')}</p>
                      <div className="detail__meta">
                        <span>{year}</span>
                        <span>•</span>
                        <span>{movie.runtime_minutes ? `${movie.runtime_minutes} min` : 'N/A'}</span>
                      </div>
                      <div className="detail__stars">{stars || t('components.movieTendencies.noRating')}</div>
                    </div>
                  </Link>
                );
              })
            )}
          </ul>

          {/* Botón Next */}
          <button
            className="tendencies__nav tendencies__nav--next"
            onClick={() => scroll('right')}
            disabled={atEnd}
            aria-label={t('components.movieTendencies.next')}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieTendencies;