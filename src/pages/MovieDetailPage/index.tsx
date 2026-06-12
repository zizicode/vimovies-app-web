import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { SEO } from '../../hooks/useSEO'
import { useAlternateUrls } from '../../hooks/useAlternateUrls'
import { useGTM } from '../../hooks/useGTM'
import { mediaApi } from '../../lib/api/media'
import type { Media } from '../../lib/api/types'
import { getBackdropUrl, minutesToISO8601Duration } from '../../utils/image.utils'
import { useLocale } from '../../store/locate.store'
import { usePageLoaderStore } from '../../store/pageLoader.store'
import HeroSection from './components/HeroSection'
// import QuickStatsBar from './components/QuickStatsBar'
import TabsSection from './components/TabsSection'
// import CastSlider from './components/CastSlider'
import EditorialReview from './components/EditorialReview'
import FaqAccordion from './components/FaqAccordion'
import './MovieDetailPage.scss'
import PlataformsList from './components/PlataformsList'

export default function MovieDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const locale = useLocale()
  const { pathname } = useLocation()
  const { forMovie } = useAlternateUrls()
  const { setPageLoading, isPageLoading } = usePageLoaderStore()
  const { trackPageView } = useGTM()
  const [movie, setMovie] = useState<Media | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isEnglishRoute = pathname.startsWith('/movie/')
  const isEnglish = locale === 'en'
  const currentLocale = isEnglish ? 'en_US' : 'es_ES'

  useEffect(() => {
    async function fetchMovie() {
      if (!slug) {
        setError('Slug no proporcionado')
        return
      }

      try {
        setPageLoading(true)
        setError(null)
        const response = await mediaApi.getBySlug(slug)
        if (response.success && response.data) {
          setMovie(response.data)
          const title = isEnglish ? response.data.title_en : response.data.title_es
          trackPageView(title, pathname)
        } else {
          setError('Película no encontrada')
        }
      } catch (err) {
        console.error('Error fetching movie:', err)
        setError('Error al cargar la película')
      } finally {
        setPageLoading(false)
      }
    }

    fetchMovie()
  }, [slug, isEnglish, pathname, setPageLoading, trackPageView])

  return (
    <div className="movie-detail">
      {/* Error State */}
      {isPageLoading ? (
        <div className="movie-detail__loading">
          <p>{locale === 'en' ? 'Loading...' : 'Cargando información...'}</p>
        </div>
      ) : error && (
        <div className="movie-detail__error">
          <div className="movie-detail__error-content">
            <h2>{error}</h2>
            <p>{locale === 'en' ? 'We could not find the movie you are looking for.' : 'No pudimos encontrar la película que buscas.'}</p>
          </div>
        </div>
      )}

      {!error && !movie && (
        <div className="movie-detail__error">
          <div className="movie-detail__error-content">
            <h2>{locale === 'en' ? 'Movie not found' : 'Película no encontrada'}</h2>
            <p>{locale === 'en' ? 'We could not find the movie you are looking for.' : 'No pudimos encontrar la película que buscas.'}</p>
          </div>
        </div>
      )}

      {/* Movie Content */}
      {movie && (
        <>
          <SEO
            title={`${isEnglish ? movie.title_en : movie.title_es} (${movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}) - Vimovies`}
            description={isEnglish ? movie.synopsis_en : movie.synopsis_es}
            canonical={isEnglishRoute ? `https://vimovies.com/movie/${movie.slug}` : `https://vimovies.com/pelicula/${movie.slug}`}
            image={getBackdropUrl(movie.backdrop_path, 'w1280')}
            type="video.movie"
            locale={currentLocale}
            alternates={forMovie(movie.slug)}
            jsonLd={[
              {
                '@context': 'https://schema.org',
                '@type': 'Movie',
                name: isEnglish ? movie.title_en : movie.title_es,
                alternateName: isEnglish ? movie.title_es : movie.title_en,
                url: isEnglishRoute ? `https://vimovies.com/movie/${movie.slug}` : `https://vimovies.com/pelicula/${movie.slug}`,
                image: getBackdropUrl(movie.backdrop_path, 'w1280'),
                datePublished: movie.release_date,
                description: isEnglish ? movie.synopsis_en : movie.synopsis_es,
                duration: minutesToISO8601Duration(movie.runtime_minutes),
                genre: movie.genres?.map(g => isEnglish ? g.name_en : g.name_es),
                director: movie.credits?.filter(c => c.role === 'director').map(c => ({
                  '@type': 'Person',
                  name: c.person?.name || c.name
                })),
                actor: movie.credits?.filter(c => c.role === 'actor').slice(0, 10).map(c => ({
                  '@type': 'Person',
                  name: c.person?.name || c.name
                })),
                aggregateRating: movie.editorial_rating ? {
                  '@type': 'AggregateRating',
                  ratingValue: movie.editorial_rating,
                  bestRating: 10,
                  worstRating: 0,
                  ratingCount: movie.ratings?.reduce((sum, r) => sum + (r.vote_count || 0), 0) || undefined
                } : undefined
              },
              ...(movie.editorial_rating && (isEnglish ? movie.editorial_review_en : movie.editorial_review_es) ? [{
                '@context': 'https://schema.org',
                '@type': 'Review',
                reviewBody: isEnglish ? movie.editorial_review_en : movie.editorial_review_es,
                author: {
                  '@type': 'Organization',
                  name: 'ViMovies Editorial'
                },
                itemReviewed: {
                  '@type': 'Movie',
                  name: isEnglish ? movie.title_en : movie.title_es
                },
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: movie.editorial_rating,
                  bestRating: 10
                }
              }] : [])
            ]}
          />

          {/* 1. Hero Section */}
          <HeroSection movie={movie} />

          {/* Plataformas */}
          <PlataformsList watch_providers={movie.watch_providers} locale={locale} />

          {/* 2. Stats Bar - Valoración y Fecha Estreno */}
          {/* <QuickStatsBar movie={movie} /> */}

          {/* 3. Tabs Section */}
          <div className="main-content">
            <TabsSection movie={movie} />
          </div>



          {/* 6. Editorial Review */}
          <EditorialReview movie={movie} />

          {/* 7. FAQs */}
          <FaqAccordion movie={movie} />
        </>
      )}
    </div>
  )
}
