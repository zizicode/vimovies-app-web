import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { genresApi } from '../lib/api'
import { useLocalizedContent } from '../lib/i18n/content'

export function GenrePage() {
  const { slug } = useParams<{ slug: string }>()
  const [genre, setGenre] = useState<{ id: string; name_es: string; name_en: string; description_es?: string; description_en?: string } | null>(null)
  const [media, setMedia] = useState<Array<{ id: string; poster_path?: string; release_date?: string; slug: string; media_type: 'movie' | 'tv' }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getGenreName, getGenreDescription, getMediaTitle, getMediaPath, locale } = useLocalizedContent()

  useEffect(() => {
    async function loadGenre() {
      if (!slug) return
      try {
        const region = locale === 'en' ? 'US' : 'ES'
        const [genreResponse, mediaResponse] = await Promise.all([
          genresApi.getBySlug(slug),
          genresApi.getWithMedia(slug, 1, 20, region)
        ])
        
        setGenre(genreResponse.data)
        
        // Verificar que la respuesta tenga la estructura correcta
        // La API retorna {success: true, data: {genre: {...}, media: []}}
        if (mediaResponse.success && mediaResponse.data && Array.isArray(mediaResponse.data.media)) {
          setMedia(mediaResponse.data.media)
        } else {
          console.error('Unexpected media response structure:', mediaResponse)
          setMedia([])
        }
      } catch (error) {
        console.error('Error loading genre:', error)
        setError('Error al cargar el género')
        setMedia([])
      } finally {
        setLoading(false)
      }
    }
    loadGenre()
  }, [slug, locale])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>{error}</div>
  if (!genre) return <div>Género no encontrado</div>

  return (
    <div style={{ padding: '20px' }}>
      <h1>{getGenreName(genre)}</h1>
      {getGenreDescription(genre) && <p>{getGenreDescription(genre)}</p>}
      
      <h2>Películas y Series</h2>
      {media.length === 0 ? (
        <p>No hay películas o series en este género</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {media.map((item) => (
            <Link
              key={item.id}
              to={getMediaPath(item)}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                {item.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                    alt={getMediaTitle(item)}
                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  />
                )}
                <div style={{ padding: '10px' }}>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{getMediaTitle(item)}</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{item.release_date?.split('-')[0]}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
