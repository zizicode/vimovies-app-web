import { useEffect, useMemo, useState } from 'react'
import { SEO } from '../../hooks/useSEO'
import HeaderMovie from '../../components/headerMovie'
import Store from '../../store'
import { useLocale } from '../../store/locate.store'
import {
  getPosterUrl,
  getBackdropUrl,
} from '../../utils/image.utils'
import { formatNumberWithPlus } from '../../utils/formatNumber'
import { statsApi } from '../../lib/api/stats'
import type { StatsResponse } from '../../lib/api/stats'
import './home.scss'
import GenreSection from '../../components/genreSection'
import MovieTendencies from '../../components/movieTendencies'
import MovieGrid from '../../components/movieGrid'
import RecentArticles from '../../components/recentArticles'
import type { Genre } from '../../types'

function Home() {
  const locale = useLocale()
  const movies = Store.useMoviesStore((state) => state.movies)
  const genres = Store.useGenresStore((state) => state.genres)
  const loading = Store.useMoviesStore((state) => state.loading)
  const isMoviesFetched = Store.useMoviesStore((state) => state.isFetched)
  const isGenresFetched = Store.useGenresStore((state) => state.isFetched)
  const error = Store.useMoviesStore((state) => state.error)
  const fetchMovies = Store.useMoviesStore((state) => state.fetchMovies)
  const fetchGenres = Store.useGenresStore((state) => state.fetchGenres)

  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  // 1. Memoizamos los géneros para búsquedas rápidas O(1)
  const genresMap = useMemo(() => {
    const map = new Map<number, Genre>()
    genres.forEach(g => map.set(g.id, g))
    return map
  }, [genres])

  // 2. Primer useEffect: Solo se encarga de pedir los datos al Store si no se han cargado
  useEffect(() => {
    if (!isMoviesFetched && !loading) {
      fetchMovies()
    }
    if (!isGenresFetched) {
      fetchGenres()
    }
  }, [fetchMovies, fetchGenres, isMoviesFetched, isGenresFetched, loading])

  // 2.5. Cargar estadísticas del home
  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await statsApi.getStats()
        if (response.success && response.data) {
          setStats(response.data)
        }
      } catch (err) {
        console.error('Error fetching stats:', err)
      } finally {
        setStatsLoading(false)
      }
    }
    fetchStats()
  }, [])

  // 3. Memoizamos las películas destacadas para evitar re-procesar en cada render
  // y eliminar el par useEffect/useState que causaba un render extra.
  const featuredMovies = useMemo(() => {
    if (movies.length === 0) return []

    // Ordenar por popularidad y fecha de lanzamiento descendente
    const sortedMovies = [...movies].sort((a, b) => {
      const popularityA = a.tmdb_popularity ?? 0;
      const popularityB = b.tmdb_popularity ?? 0;
      const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
      const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;

      // Primero por popularidad descendente
      if (popularityA !== popularityB) {
        return popularityB - popularityA;
      }
      // Luego por fecha de lanzamiento descendente (más recientes primero)
      return dateB - dateA;
    });

    return sortedMovies.slice(0, 5).map((movie) => {
      const title = locale === 'en' ? movie.title_en : movie.title_es
      const synopsis = locale === 'en' ? movie.synopsis_en : movie.synopsis_es
      const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 2024
      const runtime = movie.runtime_minutes
        ? `${Math.floor(movie.runtime_minutes / 60)}h ${movie.runtime_minutes % 60}min`
        : 'N/A'

      // Búsqueda eficiente de géneros
      const movieGenres = (movie.genre_ids ?? [])
        .map(id => {
          const g = genresMap.get(id)
          return g ? (locale === 'en' ? g.name_en : g.name_es) : null
        })
        .filter(Boolean) as string[]

      return {
        id: movie.id,
        slug: movie.slug,
        title: title ?? movie.original_title,
        synopsis: synopsis ?? '',
        year: year,
        runtime,
        rating: movie.editorial_rating ?? 0,
        backdrop: getBackdropUrl(movie.backdrop_path),
        backdropSmall: getBackdropUrl(movie.backdrop_path, 'w300'),
        poster: getPosterUrl(movie.poster_path),
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        director: "Director no disponible",
        genres: movieGenres,
        cast: [],
        score: 0,
        mpaa: "",
        platforms: []
      }
    })
  }, [movies, locale, genresMap])

  const renderLoadingState = () => {
    return (
      <div className="Home__loading" style={{ minHeight: '520px' }}>
        <div className="Home__skeleton">
          <div className="Home__skeleton-backdrop" />
          <div className="Home__skeleton-content">
            <div className="Home__skeleton-poster" />
            <div className="Home__skeleton-info">
              <div className="Home__skeleton-title" />
              <div className="Home__skeleton-meta" />
              <div className="Home__skeleton-synopsis" />
              <div className="Home__skeleton-actions" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderError = () => {
    return (
      <div className="Home__error">
        <div className="Home__error-content">
          <h3>Error al cargar las películas</h3>
          <p>{error}</p>
          <button onClick={fetchMovies} className="Home__retry-btn">
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  if (error) return renderError()
  if (loading && !movies.length) return renderLoadingState()

  return (
    <div className="Home">
      <SEO
        title={locale === 'en' ? 'Vimovies | Movies & Series for Streaming' : 'Vimovies | Películas y Series para Streamings'}
        description={locale === 'en' ? 'Discover the best movies and series on Netflix, Disney+, HBO and more streaming platforms.' : 'Descubre las mejores películas y series disponibles en Netflix, Disney+, HBO y más plataformas de streaming.'}
        canonical="https://vimovies.com/"
        type="website"
        locale={locale === 'en' ? 'en_US' : 'es_ES'}
        image="https://vimovies.com/web-app-manifest-512x512.png"
        alternates={{
          es: 'https://vimovies.com/',
          en: 'https://vimovies.com/'
        }}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ViMovies',
            url: 'https://vimovies.com',
            logo: 'https://vimovies.com/logos/vimovies_logo_512.png',
            sameAs: []
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'ViMovies',
            url: 'https://vimovies.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://vimovies.com/busqueda?q={search_term_string}'
              },
              'query-input': 'required name=search_term_string'
            }
          }
        ]}
      />

      {/* 4. Sintaxis corregida: validamos que tengamos películas en el estado local */}
      {featuredMovies.length > 0 && (
        <HeaderMovie
          movies={featuredMovies.map(movie => ({
            ...movie,
            posterPath: movie.posterPath ?? undefined,
            backdropPath: movie.backdropPath ?? undefined
          }))}
          autoPlay={true}
          interval={10000}
        />
      )}
      {/* Description Home */}
      <ul className='description_home'>
        <li>
          <p className="count">
            {statsLoading ? (
              <span>...</span>
            ) : (
              <span>{formatNumberWithPlus(stats?.movies?.published || 0)}</span>
            )}
          </p>
          <p className="description">{locale === 'en' ? 'Movies' : 'Películas'}</p>
        </li>
        <li>
          <p className="count">
            {statsLoading ? (
              <span>...</span>
            ) : (
              <span>{formatNumberWithPlus(stats?.articles?.published || 0)}</span>
            )}
          </p>
          <p className="description">{locale === 'en' ? 'Articles' : 'Artículos'}</p>
        </li>
        <li>
          <p className="count">
            {statsLoading ? (
              <span>...</span>
            ) : (
              <span>{formatNumberWithPlus(stats?.people || 0)}</span>
            )}
          </p>
          <p className="description">{locale === 'en' ? 'Actors' : 'Actores'}</p>
        </li>
        <li>
          <p className="count">
            {statsLoading ? (
              <span>...</span>
            ) : (
              <span>{formatNumberWithPlus(stats?.platforms || 0)}</span>
            )}
          </p>
          <p className="description">{locale === 'en' ? 'Platforms' : 'Plataformas'}</p>
        </li>
      </ul>

      <MovieTendencies />

      <GenreSection genres={genres} />
      <MovieGrid movies={movies}/>

      <RecentArticles />


      {/* Aquí irán otras secciones de la Home como "Tendencias", "Novedades", etc. */}
    </div>
  )
}

export default Home