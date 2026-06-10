import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SEO } from '../../hooks/useSEO'
import { useLocale, useT } from '../../store/locate.store'
import { mediaApi } from '../../lib/api/media'
import { genresApi } from '../../lib/api/genres'
import { useGTM } from '../../hooks/useGTM'
import MovieCard from './components/MovieCard'
import type { Media, Genre } from '../../lib/api/types'
import './MoviesPage.scss'

interface Filters {
  search: string
  genre_id: number | null
  genre_slug: string | null
  sort_by: 'tmdb_popularity' | 'release_date' | 'editorial_rating'
  platform: string | null
}

export default function MoviesPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const locale = useLocale()
  const t = useT()
  const { trackSearch, trackFilter } = useGTM()

  const [movies, setMovies] = useState<Media[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  const [filters, setFilters] = useState<Filters>({
    search: '',
    genre_id: null,
    genre_slug: null,
    sort_by: 'tmdb_popularity',
    platform: null
  })

  const loadGenres = useCallback(async () => {
    try {
      const response = await genresApi.list()
      if (response.success && response.data) {
        setGenres(response.data)
      }
    } catch (err) {
      console.error('Error loading genres:', err)
    }
  }, [])

  const loadMovies = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await mediaApi.list({
        page: currentPage,
        per_page: 20,
        media_type: 'movie',
        ...(filters.genre_id && { genre_id: filters.genre_id }),
        ...(filters.search && { search: filters.search }),
        sort_by: filters.sort_by,
        sort_order: 'desc'
      })

      if (response.success && response.data) {
        setMovies(response.data)
        setTotalPages(response.meta?.pages || 1)
        setTotal(response.meta?.total || 0)
      } else {
        setError('Error loading movies')
      }
    } catch (err) {
      console.error('Error loading movies:', err)
      setError('Error loading movies')
    } finally {
      setLoading(false)
    }
  }, [currentPage, filters])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadGenres()
  }, [loadGenres])

  // Leer query param genre y establecer filtro
  useEffect(() => {
    const genreSlug = searchParams.get('genre')
    if (genreSlug && genres.length > 0) {
      const genre = genres.find((g: Genre) => g.slug === genreSlug)
      if (genre) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFilters(prev => ({ ...prev, genre_slug: genreSlug, genre_id: genre.id }))
      }
    } else if (!genreSlug) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilters(prev => ({ ...prev, genre_slug: null, genre_id: null }))
    }
  }, [searchParams, genres])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMovies()
  }, [loadMovies])

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }))
    setCurrentPage(1)
    if (value.length > 0) {
      trackSearch(value, movies.length)
    }
  }

  const handleGenreChange = (genreId: number | null) => {
    const genre = genres.find(g => g.id === genreId)
    const genreSlug = genre?.slug || null
    const genreName = genre ? (locale === 'en' ? genre.name_en : genre.name_es) : ''

    setFilters(prev => ({ ...prev, genre_id: genreId, genre_slug: genreSlug }))
    setCurrentPage(1)

    if (genreName) {
      trackFilter('genre', genreName)
    }

    // Actualizar query param en la URL
    const currentParams = new URLSearchParams(searchParams.toString())
    if (genreSlug) {
      currentParams.set('genre', genreSlug)
    } else {
      currentParams.delete('genre')
    }
    navigate(`${window.location.pathname}?${currentParams.toString()}`, { replace: true })
  }


  const handleSortChange = (sortBy: 'tmdb_popularity' | 'release_date' | 'editorial_rating') => {
    setFilters(prev => ({ ...prev, sort_by: sortBy }))
    setCurrentPage(1)

    const sortLabels = {
      tmdb_popularity: locale === 'en' ? 'Popularity' : 'Popularidad',
      release_date: locale === 'en' ? 'Release Date' : 'Fecha de Estreno',
      editorial_rating: locale === 'en' ? 'Rating' : 'Calificación'
    }
    trackFilter('sort', sortLabels[sortBy])
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getMovieUrl = (slug: string) => {
    return locale === 'en' ? `/movie/${slug}` : `/pelicula/${slug}`
  }

  const hasActiveFilters = filters.search || filters.genre_id || filters.genre_slug || filters.sort_by !== 'tmdb_popularity'

  const getFilterTitle = () => {
    if (!hasActiveFilters) {
      return locale === 'en' ? 'All Movies' : 'Todas las Películas'
    }

    const parts = []
    if (filters.search) {
      parts.push(locale === 'en' ? `Search: "${filters.search}"` : `Búsqueda: "${filters.search}"`)
    }
    if (filters.genre_id || filters.genre_slug) {
      const genre = genres.find(g => g.id === filters.genre_id || g.slug === filters.genre_slug)
      if (genre) {
        parts.push(locale === 'en' ? `Genre: ${genre.name_en}` : `Género: ${genre.name_es}`)
      }
    }
    if (filters.sort_by !== 'tmdb_popularity') {
      const sortLabels = {
        tmdb_popularity: locale === 'en' ? 'Popularity' : 'Popularidad',
        release_date: locale === 'en' ? 'Release Date' : 'Fecha de Estreno',
        editorial_rating: locale === 'en' ? 'Rating' : 'Calificación'
      }
      parts.push(locale === 'en' ? `Sort: ${sortLabels[filters.sort_by]}` : `Ordenar: ${sortLabels[filters.sort_by]}`)
    }

    const prefix = locale === 'en' ? 'Results for' : 'Resultados de'
    return `${prefix} ${parts.join(' • ')}`
  }

  return (
    <div className="movies-page">
      <SEO
        title={t('movies.title')}
        description={locale === 'en' 
          ? 'Discover and explore thousands of movies with ratings, reviews, and streaming availability. Find your next favorite film on ViMovies.' 
          : 'Descubre y explora miles de películas con calificaciones, reseñas y disponibilidad en streaming. Encuentra tu próxima película favorita en ViMovies.'}
        canonical={locale === 'en' ? 'https://vimovies.com/movies' : 'https://vimovies.com/peliculas'}
        type="website"
        locale={locale === 'en' ? 'en_US' : 'es_ES'}
        image="https://vimovies.com/web-app-manifest-512x512.png"
        alternates={{
          es: 'https://vimovies.com/peliculas',
          en: 'https://vimovies.com/movies'
        }}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: locale === 'en' ? 'Movies' : 'Películas',
          description: locale === 'en' ? 'Discover and explore movies' : 'Descubre y explora películas',
          url: locale === 'en' ? 'https://vimovies.com/movies' : 'https://vimovies.com/peliculas'
        }}
      ></SEO>

      {/* Hero Simplificado */}
      <div className="movies-page__hero">
        <div className="movies-page__container">
          <div className="movies-page__hero-content">
            <h1 className="movies-page__hero-title">
              {t('movies.title')}
            </h1>
            <div className="movies-page__hero-stats">
              <div className="movies-page__stat">
                <span className="movies-page__stat-number">{total}</span>
                <span className="movies-page__stat-label">{locale === 'en' ? 'Movies' : 'Películas'}</span>
              </div>
              <div className="movies-page__stat-divider"></div>
              <div className="movies-page__stat">
                <span className="movies-page__stat-number">{genres.length}</span>
                <span className="movies-page__stat-label">{locale === 'en' ? 'Genres' : 'Géneros'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout Principal */}
      <div className="movies-page__main">
        <div className="movies-page__container">
          <div className="movies-page__layout">
            {/* Sidebar - Search y Filtros */}
            <aside className="movies-page__sidebar">
              <div className="movies-page__sidebar-section">
                <h3 className="movies-page__sidebar-title">
                  {locale === 'en' ? 'Search' : 'Buscar'}
                </h3>
                <div className="movies-page__search">
                  <div className="movies-page__search-wrapper">
                    <svg className="movies-page__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <input
                      type="text"
                      placeholder={t('movies.search.placeholder')}
                      value={filters.search}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="movies-page__search-input"
                    />
                  </div>
                </div>
              </div>

              <div className="movies-page__sidebar-section">
                <h3 className="movies-page__sidebar-title">
                  {locale === 'en' ? 'Filters' : 'Filtros'}
                </h3>
                
                {/* Filtro de Género */}
                <div className="movies-page__filter-group">
                  <label className="movies-page__filter-label">
                    {t('movies.filters.genre')}
                  </label>
                  <select
                    value={filters.genre_id || ''}
                    onChange={(e) => handleGenreChange(e.target.value ? Number(e.target.value) : null)}
                    className="movies-page__filter-select"
                  >
                    <option value="">{locale === 'en' ? 'All genres' : 'Todos los géneros'}</option>
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {locale === 'en' ? genre.name_en : genre.name_es}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtro de Ordenamiento */}
                <div className="movies-page__filter-group">
                  <label className="movies-page__filter-label">
                    {locale === 'en' ? 'Sort by' : 'Ordenar por'}
                  </label>
                  <select
                    value={filters.sort_by}
                    onChange={(e) => handleSortChange(e.target.value as Filters['sort_by'])}
                    className="movies-page__filter-select"
                  >
                    <option value="tmdb_popularity">
                      {t('movies.filters.popularity')}
                    </option>
                    <option value="release_date">
                      {t('movies.filters.releaseDate')}
                    </option>
                    <option value="editorial_rating">
                      {t('movies.filters.rating')}
                    </option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Contenido Principal - Grid de Películas */}
            <main className="movies-page__content">
              {/* Título condicional */}
              <h2 className="movies-page__content-title">
                {getFilterTitle()}
              </h2>

              {loading ? (
                <div className="movies-page__loading">
                  <div className="movies-page__spinner"></div>
                </div>
              ) : error ? (
                <div className="movies-page__error">
                  <p>{t('movies.error')}</p>
                  <button onClick={loadMovies} className="movies-page__retry-btn">
                    {t('movies.retry')}
                  </button>
                </div>
              ) : movies.length > 0 ? (
                <>
              <div className="movies-page__cards">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    url={getMovieUrl(movie.slug)}
                  />
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="movies-page__pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="movies-page__pagination-btn"
                  >
                    {t('movies.pagination.previous')}
                  </button>

                  <div className="movies-page__pagination-numbers">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`movies-page__pagination-btn ${
                            currentPage === pageNum ? 'movies-page__pagination-btn--active' : ''
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="movies-page__pagination-btn"
                  >
                    {t('movies.pagination.next')}
                  </button>
                </div>
              )}

              <p className="movies-page__results-info">
                {t('movies.results.showing')} {movies.length} {t('movies.results.of')} {total} {t('movies.results.movies')}
              </p>
            </>
          ) : (
            <div className="movies-page__no-results">
              <p>
                {filters.search
                  ? t('movies.noResults.search')
                  : t('movies.noResults.empty')
                }
              </p>
            </div>
          )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
