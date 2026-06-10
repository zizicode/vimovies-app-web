import { useEffect, useState, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { SEO } from '../../hooks/useSEO'
import { useAlternateUrls } from '../../hooks/useAlternateUrls'
import { genresApi } from '../../lib/api/genres'
import { mediaApi } from '../../lib/api/media'
import { useLocalizedContent } from '../../lib/i18n/content'
import { useT } from '../../store/locate.store'
import { useGenreStore } from '../../store/genre.store'
import type { Media } from '../../lib/api/types'
import GenreSlider from '../../components/genreSection/GenreSlider.tsx'
import GenreFilterControls from '../../components/genreSection/GenreFilterControls.tsx'
import MovieGrid from '../../components/movieGrid/index.tsx'
import './GenrePage.scss'

export default function GenrePage() {
  const { slug } = useParams<{ slug: string }>()
  const { pathname } = useLocation()
  const t = useT()
  const { getGenreName, getGenreDescription } = useLocalizedContent()
  const { forGenre } = useAlternateUrls()

  const isEnglish = pathname.startsWith('/genre/')
  const currentLocale = isEnglish ? 'en_US' : 'es_ES'

  const genreData = useGenreStore((state) => state.genreData)
  const allMediaData = useGenreStore((state) => state.allMediaData)
  const genresStats = useGenreStore((state) => state.genresStats)
  const loading = useGenreStore((state) => state.loading)
  const error = useGenreStore((state) => state.error)
  const setGenreData = useGenreStore((state) => state.setGenreData)
  const setAllMediaData = useGenreStore((state) => state.setAllMediaData)
  const setGenresStats = useGenreStore((state) => state.setGenresStats)
  const setLoading = useGenreStore((state) => state.setLoading)
  const setError = useGenreStore((state) => state.setError)

  const [showAll, setShowAll] = useState(!slug)

  // Estado de filtros
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedGenreSlug, setSelectedGenreSlug] = useState<string | null>(slug || null)

  // Ref to track previous dependencies to avoid unnecessary refetches
  const prevDepsRef = useRef<{ selectedGenreSlug: string | null; currentPage: number; searchQuery: string; showAll: boolean } | null>(null)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    // Reset state when slug changes
    setSelectedGenreSlug(slug || null)
    setShowAll(!slug)
    setCurrentPage(1)
    setSearchQuery('')
    prevDepsRef.current = null // Reset ref to force reload on slug change
  }, [slug])

  useEffect(() => {
    async function loadData() {
      // Check if dependencies actually changed
      const prevDeps = prevDepsRef.current
      const depsChanged =
        !prevDeps ||
        prevDeps.selectedGenreSlug !== selectedGenreSlug ||
        prevDeps.currentPage !== currentPage ||
        prevDeps.searchQuery !== searchQuery ||
        prevDeps.showAll !== showAll

      if (!depsChanged) {
        setLoading(false) // Ensure loading is false if we skip fetch
        return
      }

      setLoading(true)
      setError(null)

      if (showAll) {
        // Cargar todas las películas
        try {
          const [mediaResponse, statsResponse] = await Promise.all([
            mediaApi.list({ page: currentPage, per_page: 20, search: searchQuery || undefined }),
            genresApi.getStats()
          ])

          if (mediaResponse.success && mediaResponse.data) {
            // Convertir el formato de mediaApi a GenreWithMediaResponse
            setAllMediaData({
              genre: null,
              media: mediaResponse.data,
              pagination: mediaResponse.meta
            })
          } else {
            setError('Content not found')
          }

          if (statsResponse.success && statsResponse.data) {
            setGenresStats(statsResponse.data)
          }
        } catch (err) {
          console.error('Error loading media data:', err)
          setError('Error loading data')
        } finally {
          setLoading(false)
        }
      } else if (selectedGenreSlug) {
        // Cargar por género específico
        try {
          const [genreResponse, statsResponse] = await Promise.all([
            genresApi.getWithMedia(selectedGenreSlug, currentPage, 20, searchQuery || undefined),
            genresApi.getStats()
          ])

          if (genreResponse.success && genreResponse.data) {
            setGenreData(genreResponse.data)
          } else {
            setError('Content not found')
          }

          if (statsResponse.success && statsResponse.data) {
            setGenresStats(statsResponse.data)
          }
        } catch (err) {
          console.error('Error loading genre data:', err)
          setError('Error loading data')
        } finally {
          setLoading(false)
        }
      }

      // Update ref after successful load
      prevDepsRef.current = { selectedGenreSlug, currentPage, searchQuery, showAll }
    }

    loadData()
  }, [selectedGenreSlug, currentPage, searchQuery, showAll, setLoading, setError, setAllMediaData, setGenreData, setGenresStats])

  useEffect(() => {
    if (searchQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(1)
    }
  }, [searchQuery])

  if (loading && !genreData && !allMediaData) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>{t('genre.loading')}</div>
  }

  if (error) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>{error}</div>
  }

  if (!genreData && !allMediaData) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>{t('genre.notFound')}</div>
  }

  const currentData = showAll ? allMediaData : genreData
  const genreName = showAll ? t('genre.allMovies') : (genre ? getGenreName(genre) : '')
  const genreDescription = showAll ? t('genre.allMoviesDescription') : (genre ? getGenreDescription(genre) : '')

  const canonical = genre
    ? (isEnglish
      ? `https://vimovies.com/genre/${genre.slug_en ?? genre.slug}`
      : `https://vimovies.com/genero/${genre.slug_es ?? genre.slug}`)
    : 'https://vimovies.com/'

  const alternates = genre
    ? forGenre(genre.slug_es ?? genre.slug, genre.slug_en ?? genre.slug)
    : { es: 'https://vimovies.com/', en: 'https://vimovies.com/' }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {genre && (
        <SEO
          title={isEnglish
            ? `${getGenreName(genre)} Movies - Vimovies`
            : `Películas de ${getGenreName(genre)} - Vimovies`}
          description={isEnglish
            ? `Explore the best ${getGenreName(genre)} movies available on streaming.`
            : `Explora las mejores películas de ${getGenreName(genre)} en streaming.`}
          canonical={canonical}
          type="website"
          locale={currentLocale}
          alternates={alternates}
          jsonLd={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: isEnglish
              ? `${getGenreName(genre)} Movies`
              : `Películas de ${getGenreName(genre)}`,
            url: canonical,
            description: isEnglish
              ? `Explore the best ${getGenreName(genre)} movies available on streaming.`
              : `Explora las mejores películas de ${getGenreName(genre)} en streaming.`,
            numberOfItems: allMediaData?.pagination?.total,
            itemListElement: allMediaData?.media?.slice(0, 10).map((media, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: isEnglish
                ? `https://vimovies.com/movie/${media.slug}`
                : `https://vimovies.com/pelicula/${media.slug}`
            }))
          }}
        />
      )}

      {!genre && (
        <SEO
          title={isEnglish ? 'All Movies - Vimovies' : 'Todas las Películas - Vimovies'}
          description={isEnglish ? 'Browse our complete catalog of movies on ViMovies.' : 'Explora nuestro catálogo completo de películas en ViMovies.'}
          canonical={isEnglish ? 'https://vimovies.com/movies' : 'https://vimovies.com/peliculas'}
          type="website"
          locale={currentLocale}
          alternates={{
            es: 'https://vimovies.com/peliculas',
            en: 'https://vimovies.com/movies'
          }}
          jsonLd={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: isEnglish ? 'All Movies' : 'Todas las Películas',
            description: isEnglish ? 'Browse our complete catalog of movies on ViMovies.' : 'Explora nuestro catálogo completo de películas en ViMovies.',
            url: isEnglish ? 'https://vimovies.com/movies' : 'https://vimovies.com/peliculas',
            numberOfItems: allMediaData?.pagination?.total,
            itemListElement: allMediaData?.media?.slice(0, 10).map((media, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: isEnglish
                ? `https://vimovies.com/movie/${media.slug}`
                : `https://vimovies.com/pelicula/${media.slug}`
            }))
          }}
        />
      )}

      <div className="genre-page">
        {/* Header con slider de géneros */}
        <div className="genre-page__header">
          <div className="genre-page__container">
            <GenreSlider
              genres={genresStats}
              currentSlug={selectedGenreSlug}
            />
          </div>
        </div>

        {/* Controles de filtrado */}
        <div className="genre-page__controls genre-page__container">
          <GenreFilterControls
            searchQuery={searchQuery}
            onSearch={handleSearch}
            totalResults={currentData?.pagination.total || 0}
            showAll={showAll}
          />
        </div>

        {/* Título del género */}
        <div className="genre-page__title-section genre-page__container">
          <h1 className="genre-page__title">{genreName}</h1>
          {genreDescription && (
            <p className="genre-page__description">{genreDescription}</p>
          )}
        </div>

        {/* Grid de películas */}
        <div className="genre-page__grid-section genre-page__container">
          {loading && !currentData ? (
            <div className="genre-page__loading">
              <div className="genre-page__spinner"></div>
            </div>
          ) : currentData?.media.length > 0 ? (
            <>
              <MovieGrid movies={currentData.media as Media[]} />

              {/* Paginación */}
              {currentData.pagination.pages > 1 && (
                <div className="genre-page__pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="genre-page__pagination-btn"
                  >
                    {t('genre.pagination.previous')}
                  </button>

                  <div>
                    {Array.from({ length: Math.min(5, currentData.pagination.pages) }, (_, i) => {
                      let pageNum
                      if (currentData.pagination.pages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= currentData.pagination.pages - 2) {
                        pageNum = currentData.pagination.pages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`genre-page__pagination-btn ${
                            currentPage === pageNum ? 'genre-page__pagination-btn--active' : ''
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === currentData.pagination.pages}
                    className="genre-page__pagination-btn"
                  >
                    {t('genre.pagination.next')}
                  </button>
                </div>
              )}

              <p className="genre-page__results-info">
                {t('genre.results.showing')} {currentData.media.length} {t('genre.results.of')} {currentData.pagination.total} {t('genre.results.movies')}
              </p>
            </>
          ) : (
            <div className="genre-page__no-results">
              <p>
                {searchQuery
                  ? t('genre.noResults.search')
                  : t('genre.noResults.empty')
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
