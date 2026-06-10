import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { SEO } from '../../hooks/useSEO'
import { useLocale } from '../../store/locate.store'
import { peopleApi } from '../../lib/api/people'
import { useGTM } from '../../hooks/useGTM'
import PersonCard from './components/PersonCard'
import type { Person } from '../../lib/api/types'
import './PeoplePage.scss'

interface Filters {
  search: string
  sort_by: 'name' | 'popularity' | 'birthdate'
}

export default function PeoplePage() {
  const navigate = useNavigate()
  const locale = useLocale()
  const { trackSearch, trackFilter, trackClick } = useGTM()

  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  const [filters, setFilters] = useState<Filters>({
    search: '',
    sort_by: 'name'
  })

  const loadPeople = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await peopleApi.list({
        page: currentPage,
        per_page: 20,
        search: filters.search || undefined
      })

      if (response.success && response.data) {
        let peopleList: Person[] = []

        // Manejar ambas estructuras de respuesta posibles
        if (Array.isArray(response.data)) {
          peopleList = response.data
        } else {
          peopleList = response.data.people || []
        }

        setPeople(peopleList)
        setTotalPages(response.meta?.pages || 1)
        setTotal(response.meta?.total || 0)
      } else {
        setError('Error loading people')
      }
    } catch (err) {
      console.error('Error loading people:', err)
      setError('Error loading people')
    } finally {
      setLoading(false)
    }
  }, [currentPage, filters])

  useEffect(() => {
    loadPeople()
  }, [loadPeople])

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }))
    setCurrentPage(1)
    if (value.length > 0) {
      trackSearch(value, people.length)
    }
  }

  const handleSortChange = (sortBy: 'name' | 'popularity' | 'birthdate') => {
    setFilters(prev => ({ ...prev, sort_by: sortBy }))
    setCurrentPage(1)

    const sortLabels = {
      name: locale === 'en' ? 'Name' : 'Nombre',
      popularity: locale === 'en' ? 'Popularity' : 'Popularidad',
      birthdate: locale === 'en' ? 'Birthdate' : 'Fecha de nacimiento'
    }
    trackFilter('people_sort', sortLabels[sortBy])
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getPersonUrl = (slug: string) => {
    return locale === 'en' ? `/person/${slug}` : `/persona/${slug}`
  }

  const handlePersonClick = (person: Person) => {
    trackClick('person', 'view_profile', person.name)
    navigate(getPersonUrl(person.slug))
  }

  const hasActiveFilters = filters.search || filters.sort_by !== 'name'

  const getFilterTitle = () => {
    if (!hasActiveFilters) {
      return locale === 'en' ? 'All Actors' : 'Todos los Actores'
    }

    const parts = []
    if (filters.search) {
      parts.push(locale === 'en' ? `Search: "${filters.search}"` : `Búsqueda: "${filters.search}"`)
    }
    if (filters.sort_by !== 'name') {
      const sortLabels = {
        name: locale === 'en' ? 'Name' : 'Nombre',
        popularity: locale === 'en' ? 'Popularity' : 'Popularidad',
        birthdate: locale === 'en' ? 'Birthdate' : 'Fecha de nacimiento'
      }
      parts.push(locale === 'en' ? `Sort: ${sortLabels[filters.sort_by]}` : `Ordenar: ${sortLabels[filters.sort_by]}`)
    }

    const prefix = locale === 'en' ? 'Results for' : 'Resultados de'
    return `${prefix} ${parts.join(' • ')}`
  }

  return (
    <div className="people-page">
      <SEO
        title={locale === 'en' ? 'People - Vimovies' : 'Personas - Vimovies'}
        description={locale === 'en' 
          ? 'Discover actors, directors, and film industry professionals. Explore filmographies and career highlights.' 
          : 'Descubre actores, directores y profesionales de la industria del cine. Explora filmografías y destacados de carrera.'}
        canonical={locale === 'en' ? 'https://vimovies.com/actors' : 'https://vimovies.com/actores'}
        type="website"
        locale={locale === 'en' ? 'en_US' : 'es_ES'}
        image="https://vimovies.com/web-app-manifest-512x512.png"
        alternates={{
          es: 'https://vimovies.com/actores',
          en: 'https://vimovies.com/actors'
        }}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: locale === 'en' ? 'People' : 'Personas',
          description: locale === 'en' ? 'Discover actors and directors on ViMovies' : 'Descubre actores y directores en ViMovies',
          url: locale === 'en' ? 'https://vimovies.com/actors' : 'https://vimovies.com/actores'
        }}
      />

      {/* Hero */}
      <div className="people-page__hero">
        <div className="people-page__container">
          <div className="people-page__hero-content">
            <h1 className="people-page__hero-title">
              {locale === 'en' ? 'Actors' : 'Actores'}
            </h1>
            <div className="people-page__hero-stats">
              <div className="people-page__stat">
                <span className="people-page__stat-number">{total}</span>
                <span className="people-page__stat-label">{locale === 'en' ? 'Actors' : 'Actores'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout Principal */}
      <div className="people-page__main">
        <div className="people-page__container">
          <div className="people-page__layout">
            {/* Sidebar - Search y Filtros */}
            <aside className="people-page__sidebar">
              <div className="people-page__sidebar-section">
                <h3 className="people-page__sidebar-title">
                  {locale === 'en' ? 'Search' : 'Buscar'}
                </h3>
                <div className="people-page__search">
                  <div className="people-page__search-wrapper">
                    <svg className="people-page__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <input
                      type="text"
                      placeholder={locale === 'en' ? 'Search actors...' : 'Buscar actores...'}
                      value={filters.search}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="people-page__search-input"
                    />
                  </div>
                </div>
              </div>

              <div className="people-page__sidebar-section">
                <h3 className="people-page__sidebar-title">
                  {locale === 'en' ? 'Filters' : 'Filtros'}
                </h3>
                
                {/* Filtro de Ordenamiento */}
                <div className="people-page__filter-group">
                  <label className="people-page__filter-label">
                    {locale === 'en' ? 'Sort by' : 'Ordenar por'}
                  </label>
                  <select
                    value={filters.sort_by}
                    onChange={(e) => handleSortChange(e.target.value as any)}
                    className="people-page__filter-select"
                  >
                    <option value="name">{locale === 'en' ? 'Name' : 'Nombre'}</option>
                    <option value="popularity">{locale === 'en' ? 'Popularity' : 'Popularidad'}</option>
                    <option value="birthdate">{locale === 'en' ? 'Birthdate' : 'Fecha de nacimiento'}</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Contenido Principal */}
            <main className="people-page__content">
              <div className="people-page__header">
                <h2 className="people-page__section-title">{getFilterTitle()}</h2>
              </div>

              {loading ? (
                <div className="people-page__loading">
                  <div className="people-page__spinner"></div>
                </div>
              ) : error ? (
                <div className="people-page__error">
                  <p>{locale === 'en' ? 'Error loading content' : 'Error al cargar contenido'}</p>
                  <button onClick={loadPeople} className="people-page__retry-btn">
                    {locale === 'en' ? 'Retry' : 'Reintentar'}
                  </button>
                </div>
              ) : people.length === 0 ? (
                <div className="people-page__no-results">
                  <p>{locale === 'en' ? 'No actors found' : 'No se encontraron actores'}</p>
                </div>
              ) : (
                <>
                  <div className="people-page__grid">
                    {people.map((person) => (
                      <PersonCard
                        key={person.id}
                        person={person}
                        onClick={() => handlePersonClick(person)}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="people-page__pagination">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="people-page__pagination-btn"
                      >
                        {locale === 'en' ? 'Previous' : 'Anterior'}
                      </button>
                      
                      <div className="people-page__pagination-info">
                        {locale === 'en' ? `Page ${currentPage} of ${totalPages}` : `Página ${currentPage} de ${totalPages}`}
                      </div>
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="people-page__pagination-btn"
                      >
                        {locale === 'en' ? 'Next' : 'Siguiente'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
