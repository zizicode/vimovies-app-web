import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { SEO } from '../../hooks/useSEO'
import { useAlternateUrls } from '../../hooks/useAlternateUrls'
import { useLocale } from '../../store/locate.store'
import { peopleApi } from '../../lib/api/people'
import type { Person, Media } from '../../lib/api/types'
import { ResourceValidator } from '../../components/ResourceValidator'
import './PersonDetailPage.scss'

interface PersonCredit {
  media: Media
  role: string
  character?: string
}

export default function PersonDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { pathname } = useLocation()
  const locale = useLocale()
  const { forPerson } = useAlternateUrls()

  const [person, setPerson] = useState<Person | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [bioOpen, setBioOpen] = useState(true)

  const popularity = person?.tmdb_popularity || person?.popularity || 0
  const popularityPercent = Math.min(Math.round((popularity / 20) * 100), 100)

  const radius = 20
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (popularityPercent / 100) * circumference

  const isEnglish = locale === 'en'
  const isEnglishRoute = pathname.startsWith('/person/')
  const currentLocale = isEnglish ? 'en_US' : 'es_ES'

  useEffect(() => {
    const loadPerson = async () => {
      if (!slug) return

      setLoading(true)
      setError(null)
      try {
        const response = await peopleApi.getBySlug(slug)

        if (response.success && response.data) {
          setPerson(response.data.person)
        } else {
          setError(isEnglish ? 'Error loading person' : 'Error al cargar persona')
        }
      } catch (err) {
        console.error('Error loading person:', err)
        setError(isEnglish ? 'Error loading person' : 'Error al cargar persona')
      } finally {
        setLoading(false)
      }
    }

    loadPerson()
  }, [slug, isEnglish])

  return (
    <ResourceValidator
      isLoading={loading}
      error={error}
      resourceType="person"
      slug={slug || ''}
      locale={currentLocale}
    >
      <div className="PersonDetailPage">
        {person && (
        <>
          <SEO
            title={`${person.name} - Vimovies`}
            description={isEnglish ? person.biography_en : person.biography_es}
            canonical={isEnglishRoute ? `https://vimovies.com/person/${person.slug}` : `https://vimovies.com/actor/${person.slug}`}
            image={person.profile_path ? `https://image.tmdb.org/t/p/w300${person.profile_path}` : ''}
            type="profile"
            locale={currentLocale}
            alternates={forPerson(person.slug)}
            jsonLd={{
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: person.name,
              url: isEnglishRoute ? `https://vimovies.com/person/${person.slug}` : `https://vimovies.com/actor/${person.slug}`,
              image: person.profile_path ? `https://image.tmdb.org/t/p/w300${person.profile_path}` : '',
              birthDate: person.birth_date,
              birthPlace: person.place_of_birth,
              jobTitle: 'Actor',
              description: isEnglish ? person.biography_en : person.biography_es,
              sameAs: []
            }}
          />

          <div className="PersonDetailPage">
            <div className="PersonDetailPage__container">
              {/* Header */}
              <div className="PersonDetailPage__header">
                {person.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                    alt={person.name}
                    className="PersonDetailPage__photo"
                  />
                ) : (
                  <div className="PersonDetailPage__photo-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                )}

                <div className="PersonDetailPage__info">
                  <h1 className="PersonDetailPage__name">{person.name}</h1>
                  
                  {person.tmdb_popularity && (
                    <div className="PersonDetailPage__popularity-wrapper">
                      <div className="PersonDetailPage__popularity-badge" title={`Popularidad: ${popularityPercent}%`}>
                        <svg width="48" height="48" viewBox="0 0 48 48">
                          <circle
                            cx="24"
                            cy="24"
                            r={radius}
                            fill="none"
                            stroke="rgba(139, 92, 246, 0.2)"
                            strokeWidth="3"
                          />
                          <circle
                            cx="24"
                            cy="24"
                            r={radius}
                            fill="none"
                            stroke="#8B5CF6"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            transform="rotate(-90 24 24)"
                          />
                        </svg>
                        <span className="PersonDetailPage__popularity-number">{popularityPercent}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="PersonDetailPage__meta">
                    {person.birthdate && (
                      <span className="PersonDetailPage__meta-item">
                        {locale === 'en' ? 'Born' : 'Nacido'}: {person.birthdate}
                      </span>
                    )}
                    {person.birthplace && (
                      <span className="PersonDetailPage__meta-item">
                        📍 {person.birthplace}
                      </span>
                    )}
                  </div>

                  <div className="PersonDetailPage__stats">
                    <div className="PersonDetailPage__stat">
                      <span className="PersonDetailPage__stat-value">
                        {person.as_actor?.length || 0}
                      </span>
                      <span className="PersonDetailPage__stat-label">
                        {locale === 'en' ? 'Actor' : 'Actor'}
                      </span>
                    </div>
                    <div className="PersonDetailPage__stat">
                      <span className="PersonDetailPage__stat-value">
                        {person.as_director?.length || 0}
                      </span>
                      <span className="PersonDetailPage__stat-label">
                        {locale === 'en' ? 'Director' : 'Director'}
                      </span>
                    </div>
                    <div className="PersonDetailPage__stat">
                      <span className="PersonDetailPage__stat-value">
                        {person.as_writer?.length || 0}
                      </span>
                      <span className="PersonDetailPage__stat-label">
                        {locale === 'en' ? 'Writer' : 'Escritor'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Biography Accordion */}
              <div className="PersonDetailPage__accordion">
                <button 
                  className="PersonDetailPage__accordion-header"
                  onClick={() => setBioOpen(!bioOpen)}
                >
                  <h2 className="PersonDetailPage__accordion-title">
                    {locale === 'en' ? 'About' : 'Sobre mí'}
                  </h2>
                  <svg 
                    className={`PersonDetailPage__accordion-icon ${bioOpen ? 'open' : ''}`}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                {bioOpen && (
                  <div className="PersonDetailPage__accordion-content">
                    <p className="PersonDetailPage__bio">
                      {(locale === 'en' ? person.biography_en : person.biography_es) || 
                        (locale === 'en' ? 'No biography available' : 'No hay biografía disponible')}
                    </p>
                  </div>
                )}
              </div>

              {/* Filmography */}
              <div className="PersonDetailPage__filmography">
                <h2 className="PersonDetailPage__section-title">
                  {locale === 'en' ? 'Filmography' : 'Filmografía'}
                </h2>
                
                <div className="PersonDetailPage__filmography-grid">
                  {/* Actor films */}
                  {person.as_actor && person.as_actor.length > 0 && (
                    <>
                      {person.as_actor.map((movie: PersonCredit) => (
                        <div key={movie.id} className="PersonDetailPage__movie-card">
                          {movie.poster_path && (
                            <img
                              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                              alt={movie.title_es || movie.title}
                              className="PersonDetailPage__movie-poster"
                            />
                          )}
                          <div className="PersonDetailPage__movie-info">
                            <h3 className="PersonDetailPage__movie-title">
                              {locale === 'en' ? movie.title_en || movie.title : movie.title_es || movie.title}
                            </h3>
                            {movie.character && (
                              <p className="PersonDetailPage__movie-role">
                                {locale === 'en' ? 'as' : 'como'} {movie.character}
                              </p>
                            )}
                            {movie.release_date && (
                              <p className="PersonDetailPage__movie-year">
                                {new Date(movie.release_date).getFullYear()}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {/* Director films */}
                  {person.as_director && person.as_director.length > 0 && (
                    <>
                      {person.as_director.map((movie: PersonCredit) => (
                        <div key={movie.id} className="PersonDetailPage__movie-card">
                          {movie.poster_path && (
                            <img
                              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                              alt={movie.title_es || movie.title}
                              className="PersonDetailPage__movie-poster"
                            />
                          )}
                          <div className="PersonDetailPage__movie-info">
                            <h3 className="PersonDetailPage__movie-title">
                              {locale === 'en' ? movie.title_en || movie.title : movie.title_es || movie.title}
                            </h3>
                            <p className="PersonDetailPage__movie-role">
                              {locale === 'en' ? 'Director' : 'Director'}
                            </p>
                            {movie.release_date && (
                              <p className="PersonDetailPage__movie-year">
                                {new Date(movie.release_date).getFullYear()}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {/* Writer films */}
                  {person.as_writer && person.as_writer.length > 0 && (
                    <>
                      {person.as_writer.map((movie: PersonCredit) => (
                        <div key={movie.id} className="PersonDetailPage__movie-card">
                          {movie.poster_path && (
                            <img
                              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                              alt={movie.title_es || movie.title}
                              className="PersonDetailPage__movie-poster"
                            />
                          )}
                          <div className="PersonDetailPage__movie-info">
                            <h3 className="PersonDetailPage__movie-title">
                              {locale === 'en' ? movie.title_en || movie.title : movie.title_es || movie.title}
                            </h3>
                            <p className="PersonDetailPage__movie-role">
                              {locale === 'en' ? 'Writer' : 'Escritor'}
                            </p>
                            {movie.release_date && (
                              <p className="PersonDetailPage__movie-year">
                                {new Date(movie.release_date).getFullYear()}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      </div>
    </ResourceValidator>
  )
}
