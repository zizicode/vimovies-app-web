import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { SEO } from '../../hooks/useSEO'
import { useAlternateUrls } from '../../hooks/useAlternateUrls'
import { mediaApi } from '../../lib/api/media'
import type { Media } from '../../lib/api/types'
import { getPosterUrl, getBackdropUrl, minutesToISO8601Duration } from '../../utils/image.utils'
import { useLocale, useT } from '../../store/locate.store'
import './SeriesDetailPage.scss'

export default function SeriesDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { pathname } = useLocation()
  const locale = useLocale()
  const t = useT()
  const { forSeries } = useAlternateUrls()
  const [series, setSeries] = useState<Media | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isEnglishRoute = pathname.startsWith('/tv-show/')
  const isEnglish = locale === 'en'
  const currentLocale = isEnglish ? 'en_US' : 'es_ES'

  useEffect(() => {
    async function fetchSeries() {
      if (!slug) {
        setError(isEnglish ? 'Slug not provided' : 'Slug no proporcionado')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const response = await mediaApi.getBySlug(slug)
        if (response.success && response.data && response.data.media_type === 'tv') {
          setSeries(response.data)
        } else {
          setError(isEnglish ? 'Series not found' : 'Serie no encontrada')
        }
      } catch (err) {
        console.error('Error fetching series:', err)
        setError(isEnglish ? 'Error loading series' : 'Error al cargar la serie')
      } finally {
        setLoading(false)
      }
    }

    fetchSeries()
  }, [slug, isEnglish])

  return (
    <div className="SeriesDetailPage">
      {loading && (
        <p className="SeriesDetailPage__loading">{isEnglish ? 'Loading series...' : 'Cargando serie...'}</p>
      )}

      {!loading && error && (
        <p className="SeriesDetailPage__error">{error}</p>
      )}

      {!loading && !series && !error && (
        <p className="SeriesDetailPage__not-found">{isEnglish ? 'Series not found' : 'Serie no encontrada'}</p>
      )}

      {series && (
        <>
          <SEO
            title={`${isEnglish ? series.title_en : series.title_es} - Vimovies`}
            description={isEnglish ? series.synopsis_en : series.synopsis_es}
            canonical={isEnglishRoute ? `https://vimovies.com/tv-show/${series.slug}` : `https://vimovies.com/serie/${series.slug}`}
            image={getBackdropUrl(series.backdrop_path, 'w1280')}
            type="video.tv_show"
            locale={currentLocale}
            alternates={forSeries(series.slug)}
            jsonLd={{
              '@context': 'https://schema.org',
              '@type': 'TVSeries',
              name: isEnglish ? series.title_en : series.title_es,
              alternateName: isEnglish ? series.title_es : series.title_en,
              description: isEnglish ? series.synopsis_en : series.synopsis_es,
              url: isEnglishRoute ? `https://vimovies.com/tv-show/${series.slug}` : `https://vimovies.com/serie/${series.slug}`,
              image: getBackdropUrl(series.backdrop_path, 'w1280'),
              datePublished: series.release_date,
              genre: series.genres?.map(g => isEnglish ? g.name_en : g.name_es),
              director: series.credits?.filter(c => c.role === 'director').map(c => ({
                '@type': 'Person',
                name: c.person?.name || c.name
              })),
              actor: series.credits?.filter(c => c.role === 'actor').slice(0, 10).map(c => ({
                '@type': 'Person',
                name: c.person?.name || c.name
              })),
              aggregateRating: series.editorial_rating ? {
                '@type': 'AggregateRating',
                ratingValue: series.editorial_rating,
                bestRating: 10,
                worstRating: 0,
                ratingCount: series.ratings?.reduce((sum, r) => sum + (r.vote_count || 0), 0) || undefined
              } : undefined
            }}
          />

          <div className="SeriesDetailPage__content">
            <img
              src={getPosterUrl(series.poster_path, 'w500')}
              alt={isEnglish ? series.title_en : series.title_es}
              className="SeriesDetailPage__poster"
            />
            <h1 className="SeriesDetailPage__title">{isEnglish ? series.title_en : series.title_es}</h1>
            <p className="SeriesDetailPage__overview">{isEnglish ? series.synopsis_en : series.synopsis_es}</p>
            <div className="SeriesDetailPage__genres">
              {series.genres && series.genres.map((genre) => (
                <span key={genre.id}>
                  {isEnglish ? genre.name_en : genre.name_es}
                </span>
              ))}
            </div>
            <div className="SeriesDetailPage__meta">
              <span>{isEnglish ? 'First aired:' : 'Primera emisión:'} {series.release_date}</span>
              {series.editorial_rating && (
                <span>{isEnglish ? 'Rating:' : 'Calificación:'} {series.editorial_rating.toFixed(1)}</span>
              )}
            </div>
            <div className="SeriesDetailPage__cast">
              <h2>{isEnglish ? 'Cast' : 'Reparto'}</h2>
              {series.credits && series.credits
                .filter((c) => c.role === 'actor')
                .map((credit) => (
                  <span key={credit.id}>{credit.character_name}</span>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
