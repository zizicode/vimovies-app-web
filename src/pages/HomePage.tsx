import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { mediaApi } from '../lib/api'
import { useLocalizedContent } from '../lib/i18n/content'

export function HomePage() {
  const [movies, setMovies] = useState<Array<{ id: string; poster_path?: string; release_date?: string; slug: string; media_type: 'movie' | 'tv' }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getMediaTitle, getMediaPath, locale } = useLocalizedContent()

  useEffect(() => {
    async function loadMovies() {
      try {
        const region = locale === 'en' ? 'US' : 'ES'
        const response = await mediaApi.list({ media_type: 'movie', per_page: 10, region })
        
        if (response.success && Array.isArray(response.data)) {
          setMovies(response.data)
        } else {
          console.error('Unexpected response structure:', response)
          setMovies([])
        }
      } catch (error) {
        console.error('Error loading movies:', error)
        setError('Error al cargar películas')
        setMovies([])
      } finally {
        setLoading(false)
      }
    }
    loadMovies()
  }, [locale])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>{error}</div>

  return (
    <div style={{ padding: '20px' }}>
      <h1>Vimovies - Películas y Series</h1>
      
      <section>
        <h2>Películas Populares</h2>
        {movies.length === 0 ? (
          <p>No hay películas disponibles</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {movies.map((movie) => (
              <Link key={movie.id} to={getMediaPath(movie)} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={getMediaTitle(movie)}
                      style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                    />
                  )}
                  <div style={{ padding: '10px' }}>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{getMediaTitle(movie)}</h3>
                    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{movie.release_date?.split('-')[0]}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
