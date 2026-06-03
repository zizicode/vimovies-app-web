import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { mediaApi } from '../lib/api'
import { useLocalizedContent } from '../lib/i18n/content'

export function MoviePage() {
  const { slug } = useParams<{ slug: string }>()
  const [movie, setMovie] = useState<{ slug: string; poster_path?: string; original_title: string; release_date?: string; runtime_minutes?: number; editorial_rating?: number; synopsis_es?: string; synopsis_en?: string; seo_title_es?: string; seo_title_en?: string; seo_description_es?: string; seo_description_en?: string; genres?: Array<{ id: string; name_es: string; name_en: string }> } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getMediaTitle, getMediaSynopsis, locale } = useLocalizedContent()

  useEffect(() => {
    async function loadMovie() {
      if (!slug) return
      try {
        const region = locale === 'en' ? 'US' : 'ES'
        const response = await mediaApi.getBySlug(slug, region)
        
        if (response.success && response.data) {
          setMovie(response.data)
        } else {
          setError('Película no encontrada')
        }
      } catch (error) {
        console.error('Error loading movie:', error)
        setError('Error al cargar la película')
      } finally {
        setLoading(false)
      }
    }
    loadMovie()
  }, [slug, locale])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>{error}</div>
  if (!movie) return <div>Película no encontrada</div>

  const title = locale === 'en'
    ? (movie.seo_title_en || movie.title_en || movie.original_title)
    : (movie.seo_title_es || movie.title_es || movie.original_title)
  const description = locale === 'en'
    ? (movie.seo_description_en || movie.synopsis_en || movie.synopsis_es || '')
    : (movie.seo_description_es || movie.synopsis_es || movie.synopsis_en || '')
  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w780${movie.poster_path}` : ''
  const url = `https://vimovies.com/${locale === 'en' ? 'movie' : 'pelicula'}/${movie.slug}`

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content={locale === 'es' ? 'es_ES' : 'en_US'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <link rel="canonical" href={url} />
      </Helmet>
      <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={getMediaTitle(movie)}
            style={{ width: '300px', borderRadius: '8px' }}
          />
        )}
        <div style={{ flex: 1 }}>
          <h1>{getMediaTitle(movie)}</h1>
          <p style={{ color: '#666' }}>{movie.original_title}</p>
          <p><strong>Año:</strong> {movie.release_date?.split('-')[0]}</p>
          <p><strong>Duración:</strong> {movie.runtime_minutes} min</p>
          <p><strong>Rating:</strong> {movie.editorial_rating}/10</p>
          
          <h2>Sinopsis</h2>
          <p>{getMediaSynopsis(movie)}</p>
          
          {movie.genres && movie.genres.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3>Géneros</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {movie.genres.map((genre: { id: string; name_es: string; name_en: string }) => (
                  <span
                    key={genre.id}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#e8a030',
                      borderRadius: '4px',
                      color: '#0a0a0b'
                    }}
                  >
                    {locale === 'en' ? genre.name_en : genre.name_es}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}
