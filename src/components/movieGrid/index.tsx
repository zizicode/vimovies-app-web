import React from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../../store/locate.store';
import { getPosterUrl, getPosterSrcSet } from '../../utils/image.utils';
import { useGTM } from '../../hooks/useGTM';
import { useT } from '../../store/locate.store';
import './MovieGrid.scss';

interface MediaCard {
  id: string | number;
  slug: string;
  title_es?: string | null;
  title_en?: string | null;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string | null;
  tmdb_popularity?: number | null;
  editorial_rating?: number | null;
  status?: string;
  noindex?: boolean;
}

interface MovieGridProps {
  movies: MediaCard[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  const locale = useLocale();
  const t = useT();
  const { trackMovieClick, trackNavigation } = useGTM();

  const getMovieUrl = (slug: string) => {
    return locale === 'en' ? `/movie/${slug}` : `/pelicula/${slug}`;
  };

  const getMoviesPageUrl = () => {
    return locale === 'en' ? '/movies' : '/peliculas';
  };

  const handleMovieClick = (movie: MediaCard) => {
    const title = movie.title_es || movie.title_en || '';
    trackMovieClick(title, movie.slug);
  };

  const handleViewMoreClick = () => {
    trackNavigation('movies_list', 'Ver Más');
  };

  return (
    <div className="movie-grid-section">
      <div className="movie-grid-container">

        {/* El contenedor principal de la Grid */}
        <div className="movie-grid">
          {movies.length === 0 ? (
            <div className="movie-grid__empty">
              <p>{locale === 'en' ? 'No movies available' : 'No hay películas disponibles'}</p>
            </div>
          ) : (
            movies.map((movie) => {
              const title = movie.title_es || movie.title_en || '';
              // const posterUrl = getPosterUrl(movie.poster_path, 'w185');
              const posterSrcSet = getPosterSrcSet(movie.poster_path);

              return (
                <Link
                  to={getMovieUrl(movie.slug)}
                  className="movie-grid__item"
                  key={movie.id}
                  onClick={() => handleMovieClick(movie)}
                >
                  <div className="movie-grid__poster">
                    <img
                      src={getPosterUrl(movie.poster_path, 'w185')}
                      srcSet={posterSrcSet}
                      sizes="(max-width: 600px) 50vw, 185px"
                      alt={title}
                      width="180"
                      height="270"
                      className="movie-grid__img"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Capa de texto sobre el póster con gradiente */}
                    <div className="movie-grid__overlay">
                      <span className="movie-grid__title">{title}</span>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Botón Ver Más Centrado fuera de la Grid */}
        <Link to={getMoviesPageUrl()} className="movie-grid__actions" onClick={handleViewMoreClick}>
          <button className="movie-grid__btn-more">
            {locale === 'en' ? 'View More' : 'Ver Más'}
          </button>
        </Link>

      </div>
    </div>
  );
};

export default MovieGrid;