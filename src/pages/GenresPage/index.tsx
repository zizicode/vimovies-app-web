import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { SEO } from '../../hooks/useSEO'
import { useLocale } from '../../store/locate.store'
import { genresApi } from '../../lib/api/genres'
import { useGTM } from '../../hooks/useGTM'
import type { Genre } from '../../lib/api/types'
import './GenresPage.scss'

interface GenreStats {
  slug: string
  media_count: number
}

export default function GenresPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const locale = useLocale()
  const { trackFilter, trackNavigation } = useGTM()

  const [genres, setGenres] = useState<Genre[]>([])
  const [activeGenre, setActiveGenre] = useState<Genre | null>(null)
  const [genresStats, setGenresStats] = useState<GenreStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadGenres = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [genresResponse, statsResponse] = await Promise.all([
        genresApi.list(),
        genresApi.getStats()
      ])

      if (genresResponse.success && genresResponse.data) {
        setGenres(genresResponse.data)
      }

      if (statsResponse.success && statsResponse.data) {
        setGenresStats(statsResponse.data)
      }
    } catch (err) {
      console.error('Error loading genres:', err)
      setError('Error loading genres')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadGenres()
  }, [loadGenres])

  useEffect(() => {
    if (slug && genres.length > 0) {
      const genre = genres.find((g: Genre) => g.slug === slug)
      if (genre) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveGenre(genre)
      }
    } else if (!slug && genres.length > 0) {
      // Si no hay slug, seleccionar el primer género
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveGenre(genres[0])
    }
  }, [slug, genres])

  const handleGenreSelect = (genreSlug: string) => {
    const genre = genres.find(g => g.slug === genreSlug)
    const genreName = genre ? (locale === 'en' ? genre.name_en : genre.name_es) : ''
    trackFilter('genre_select', genreName)
    navigate(locale === 'en' ? `/genre/${genreSlug}` : `/genero/${genreSlug}`)
  }

  const getGenreName = (genre: Genre) => {
    return locale === 'en' ? genre.name_en : genre.name_es
  }

  const getGenreDescription = (genre: Genre) => {
    return locale === 'en' ? genre.description_en : genre.description_es
  }

  const getGenreMovieCount = (genreSlug: string) => {
    const stat = genresStats.find((s: GenreStats) => s.slug === genreSlug)
    return stat ? stat.media_count : 0
  }

  const isEnglishRoute = window.location.pathname.startsWith('/genres/')
  const canonical = activeGenre
    ? (isEnglishRoute
      ? `https://vimovies.com/genres/${activeGenre.slug}`
      : `https://vimovies.com/generos/${activeGenre.slug}`)
    : (isEnglishRoute ? 'https://vimovies.com/genres' : 'https://vimovies.com/generos')

  const alternates = activeGenre
    ? {
        es: `https://vimovies.com/generos/${activeGenre.slug}`,
        en: `https://vimovies.com/genres/${activeGenre.slug}`
      }
    : {
        es: 'https://vimovies.com/generos',
        en: 'https://vimovies.com/genres'
      }

  return (
    <div className="genres-page">
      <SEO
        title={activeGenre ? `${getGenreName(activeGenre)} - Vimovies` : (locale === 'en' ? 'Genres - Vimovies' : 'Géneros - Vimovies')}
        description={activeGenre ? getGenreDescription(activeGenre) : (locale === 'en' ? 'Browse movies by genre on ViMovies. Find action, comedy, drama, and more.' : 'Explora películas por género en ViMovies. Encuentra acción, comedia, drama y más.')}
        canonical={canonical}
        type="website"
        locale={locale === 'en' ? 'en_US' : 'es_ES'}
        image={activeGenre?.cover_image_url || 'https://vimovies.com/web-app-manifest-512x512.png'}
        alternates={alternates}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: activeGenre ? getGenreName(activeGenre) : (locale === 'en' ? 'Genres' : 'Géneros'),
          description: activeGenre ? getGenreDescription(activeGenre) || `Explore ${getGenreName(activeGenre)} movies` : (locale === 'en' ? 'Browse movies by genre' : 'Explora películas por género'),
          url: canonical
        }}
      />

      {/* Hero */}
      <div className="genres-page__hero">
        {activeGenre?.cover_image_url && (
          <div className="genres-page__hero-banner">
            <img
              src={activeGenre.cover_image_url}
              alt={getGenreName(activeGenre)}
              className="genres-page__hero-banner-image"
            />
            <div className="genres-page__hero-banner-overlay"></div>
          </div>
        )}
        <div className="genres-page__container">
          {activeGenre ? (
            <div className="genres-page__hero-content">
              {activeGenre.cover_image_url && (
                <img
                  src={activeGenre.cover_image_url}
                  alt={getGenreName(activeGenre)}
                  className="genres-page__hero-cover"
                />
              )}
              <div className="genres-page__hero-text">
                <h1 className="genres-page__hero-title">
                  {getGenreName(activeGenre)}
                </h1>
                {getGenreDescription(activeGenre) && (
                  <p className="genres-page__hero-description">
                    {getGenreDescription(activeGenre)}
                  </p>
                )}
                <div className="genres-page__hero-stats">
                  <div className="genres-page__stat">
                    <span className="genres-page__stat-number">{getGenreMovieCount(activeGenre.slug)}</span>
                    <span className="genres-page__stat-label">{locale === 'en' ? 'Movies' : 'Películas'}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    trackNavigation('movies_by_genre', `View ${getGenreName(activeGenre)} movies`)
                    navigate(locale === 'en' ? `/movies?genre=${activeGenre.slug}` : `/peliculas?genre=${activeGenre.slug}`)
                  }}
                  className="genres-page__hero-browse-btn"
                >
                  {locale === 'en' ? 'View Movies in this Genre' : 'Ver Películas de este Género'}
                </button>
              </div>
            </div>
          ) : (
            <div className="genres-page__hero-content">
              <h1 className="genres-page__hero-title">
                {locale === 'en' ? 'Genres' : 'Géneros'}
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Layout Principal */}
      <div className="genres-page__main">
        <div className="genres-page__container">
          <h2 className="genres-page__section-title">
            {locale === 'en' ? 'Select a Genre' : 'Selecciona un Género'}
          </h2>
          
          {loading ? (
            <div className="genres-page__loading">
              <div className="genres-page__spinner"></div>
            </div>
          ) : error ? (
            <div className="genres-page__error">
              <p>{locale === 'en' ? 'Error loading content' : 'Error al cargar contenido'}</p>
              <button onClick={loadGenres} className="genres-page__retry-btn">
                {locale === 'en' ? 'Retry' : 'Reintentar'}
              </button>
            </div>
          ) : (
            <div className="genres-page__genres-grid">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreSelect(genre.slug)}
                  className={`genres-page__genre-card ${
                    activeGenre?.slug === genre.slug ? 'genres-page__genre-card--active' : ''
                  }`}
                >
                  <h3 className="genres-page__genre-card-title">
                    {getGenreName(genre)}
                  </h3>
                  <p className="genres-page__genre-card-count">
                    {getGenreMovieCount(genre.slug)} {locale === 'en' ? 'movies' : 'películas'}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
