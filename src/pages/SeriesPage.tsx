import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { mediaApi } from '../lib/api'
import { useLocalizedContent } from '../lib/i18n/content'

export function SeriesPage() {
  const { slug } = useParams<{ slug: string }>()
  const [series, setSeries] = useState<{ slug: string; poster_path?: string; original_title: string; release_date?: string; editorial_rating?: number; synopsis_es?: string; synopsis_en?: string; genres?: Array<{ id: string; name_es: string; name_en: string }> } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getMediaTitle, getMediaSynopsis, locale } = useLocalizedContent()

  useEffect(() => {
    async function loadSeries() {
      if (!slug) return
      try {
        const region = locale === 'en' ? 'US' : 'ES'
        const response = await mediaApi.getBySlug(slug, region)
        
        if (response.success && response.data) {
          setSeries(response.data)
        } else {
          setError('Serie no encontrada')
        }
      } catch (error) {
        console.error('Error loading series:', error)
        setError('Error al cargar la serie')
      } finally {
        setLoading(false)
      }
    }
    loadSeries()
  }, [slug, locale])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>{error}</div>
  if (!series) return <div>Serie no encontrada</div>

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        {series.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
            alt={getMediaTitle(series)}
            style={{ width: '300px', borderRadius: '8px' }}
          />
        )}
        <div style={{ flex: 1 }}>
          <h1>{getMediaTitle(series)}</h1>
          <p style={{ color: '#666' }}>{series.original_title}</p>
          <p><strong>Año:</strong> {series.release_date?.split('-')[0]}</p>
          <p><strong>Rating:</strong> {series.editorial_rating}/10</p>
          
          <h2>Sinopsis</h2>
          <p>{getMediaSynopsis(series)}</p>
          
          {series.genres && series.genres.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3>Géneros</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {series.genres.map((genre: { id: string; name_es: string; name_en: string }) => (
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
  )
}
