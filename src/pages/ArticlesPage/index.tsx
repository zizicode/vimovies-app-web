import { useEffect, useState, useCallback } from 'react'
import { SEO } from '../../hooks/useSEO'
import { useLocale } from '../../store/locate.store'
import { mockArticles } from './mock-articles'
import { useGTM } from '../../hooks/useGTM'
import ArticleCard from './components/ArticleCard/index'
import type { Article } from '../../lib/api/types'
import './ArticlesPage.scss'

interface Filters {
  search: string
  intent: string | null
}

export default function ArticlesPage() {
  const locale = useLocale()
  const { trackSearch, trackFilter } = useGTM()

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  const [filters, setFilters] = useState<Filters>({
    search: '',
    intent: null
  })

  const loadArticles = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Usar mock para desarrollo
      setTimeout(() => {
        setArticles(mockArticles as Article[])
        setTotalPages(1)
        setTotal(mockArticles.length)
        setLoading(false)
      }, 500)

      // Descomentar para usar API real
      /*
      const response = await articlesApi.getAll({
        page: currentPage,
        per_page: 12,
        locale: locale === 'en' ? 'en' : 'es',
        status: 'published',
        ...(filters.intent && { intent: filters.intent }),
        ...(filters.search && { search: filters.search })
      })

      if (response.success && response.data) {
        setArticles(response.data)
        setTotalPages(response.meta.pages)
        setTotal(response.meta.total)
      } else {
        setError('Error loading articles')
      }
      */
    } catch (err) {
      console.error('Error loading articles:', err)
      setError('Error loading articles')
      setLoading(false)
    }
  }, [currentPage, filters, locale])

  useEffect(() => {
    loadArticles()
  }, [loadArticles])

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }))
    setCurrentPage(1)
    if (value.length > 0) {
      trackSearch(value, articles.length)
    }
  }

  const handleIntentChange = (intent: string | null) => {
    setFilters(prev => ({ ...prev, intent }))
    setCurrentPage(1)

    if (intent) {
      const intentLabels = {
        informational: locale === 'en' ? 'Informational' : 'Informativo',
        navigational: locale === 'en' ? 'Navigational' : 'Navegacional',
        transactional: locale === 'en' ? 'Transactional' : 'Transaccional',
        seasonal: locale === 'en' ? 'Seasonal' : 'Estacional'
      }
      trackFilter('article_type', intentLabels[intent as keyof typeof intentLabels])
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getArticleUrl = (slug: string) => {
    return locale === 'en' ? `/article/${slug}` : `/articulo/${slug}`
  }

  const hasActiveFilters = filters.search || filters.intent

  const getFilterTitle = () => {
    if (!hasActiveFilters) {
      return locale === 'en' ? 'All Articles' : 'Todos los Artículos'
    }

    const parts = []
    if (filters.search) {
      parts.push(locale === 'en' ? `Search: "${filters.search}"` : `Búsqueda: "${filters.search}"`)
    }
    if (filters.intent) {
      const intentLabels = {
        informational: locale === 'en' ? 'Informational' : 'Informativo',
        navigational: locale === 'en' ? 'Navigational' : 'Navegacional',
        transactional: locale === 'en' ? 'Transactional' : 'Transaccional',
        seasonal: locale === 'en' ? 'Seasonal' : 'Estacional'
      }
      parts.push(intentLabels[filters.intent as keyof typeof intentLabels])
    }

    const prefix = locale === 'en' ? 'Results for' : 'Resultados de'
    return `${prefix} ${parts.join(' • ')}`
  }

  return (
    <div className="articles-page">
      <SEO
        title={locale === 'en' ? 'Articles - Vimovies' : 'Artículos - Vimovies'}
        description={locale === 'en' 
          ? 'Read movie reviews, guides, and recommendations. Expert analysis of the best films and streaming content.' 
          : 'Lee reseñas de películas, guías y recomendaciones. Análisis experto de las mejores películas y contenido en streaming.'}
        canonical={locale === 'en' ? 'https://vimovies.com/articles' : 'https://vimovies.com/articulos'}
        type="website"
        locale={locale === 'en' ? 'en_US' : 'es_ES'}
        image="https://vimovies.com/web-app-manifest-512x512.png"
        alternates={{
          es: 'https://vimovies.com/articulos',
          en: 'https://vimovies.com/articles'
        }}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: locale === 'en' ? 'Articles' : 'Artículos',
          description: locale === 'en' ? 'Discover movie articles, guides, and recommendations' : 'Descubre artículos de películas, guías y recomendaciones',
          url: locale === 'en' ? 'https://vimovies.com/articles' : 'https://vimovies.com/articulos'
        }}
      />

      {/* Hero */}
      <div className="articles-page__hero">
        <div className="articles-page__container">
          <div className="articles-page__hero-content">
            <h1 className="articles-page__hero-title">
              {locale === 'en' ? 'Articles' : 'Artículos'}
            </h1>
            <div className="articles-page__hero-stats">
              <div className="articles-page__stat">
                <span className="articles-page__stat-number">{total}</span>
                <span className="articles-page__stat-label">{locale === 'en' ? 'Articles' : 'Artículos'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout Principal */}
      <div className="articles-page__main">
        <div className="articles-page__container">
          <div className="articles-page__layout">
            {/* Sidebar */}
            <aside className="articles-page__sidebar">
              <div className="articles-page__sidebar-section">
                <h3 className="articles-page__sidebar-title">
                  {locale === 'en' ? 'Search' : 'Buscar'}
                </h3>
                <div className="articles-page__search">
                  <div className="articles-page__search-wrapper">
                    <svg className="articles-page__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <input
                      type="text"
                      placeholder={locale === 'en' ? 'Search articles...' : 'Buscar artículos...'}
                      value={filters.search}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="articles-page__search-input"
                    />
                  </div>
                </div>
              </div>

              <div className="articles-page__sidebar-section">
                <h3 className="articles-page__sidebar-title">
                  {locale === 'en' ? 'Filter by Type' : 'Filtrar por Tipo'}
                </h3>
                
                <div className="articles-page__filter-group">
                  <select
                    value={filters.intent || ''}
                    onChange={(e) => handleIntentChange(e.target.value || null)}
                    className="articles-page__filter-select"
                  >
                    <option value="">{locale === 'en' ? 'All types' : 'Todos los tipos'}</option>
                    <option value="informational">{locale === 'en' ? 'Informational' : 'Informativo'}</option>
                    <option value="navigational">{locale === 'en' ? 'Navigational' : 'Navegacional'}</option>
                    <option value="transactional">{locale === 'en' ? 'Transactional' : 'Transaccional'}</option>
                    <option value="seasonal">{locale === 'en' ? 'Seasonal' : 'Estacional'}</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Contenido Principal */}
            <main className="articles-page__content">
              <h2 className="articles-page__content-title">
                {getFilterTitle()}
              </h2>

              {loading ? (
                <div className="articles-page__loading">
                  <div className="articles-page__spinner"></div>
                </div>
              ) : error ? (
                <div className="articles-page__error">
                  <p>{locale === 'en' ? 'Error loading articles' : 'Error al cargar artículos'}</p>
                  <button onClick={loadArticles} className="articles-page__retry-btn">
                    {locale === 'en' ? 'Retry' : 'Reintentar'}
                  </button>
                </div>
              ) : articles.length > 0 ? (
                <>
                  <div className="articles-page__cards">
                    {articles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        url={getArticleUrl(article.slug)}
                      />
                    ))}
                  </div>

                  {/* Paginación */}
                  {totalPages > 1 && (
                    <div className="articles-page__pagination">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="articles-page__pagination-btn"
                      >
                        {locale === 'en' ? 'Previous' : 'Anterior'}
                      </button>

                      <div className="articles-page__pagination-numbers">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum
                          if (totalPages <= 5) {
                            pageNum = i + 1
                          } else if (currentPage <= 3) {
                            pageNum = i + 1
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i
                          } else {
                            pageNum = currentPage - 2 + i
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`articles-page__pagination-btn ${
                                currentPage === pageNum ? 'articles-page__pagination-btn--active' : ''
                              }`}
                            >
                              {pageNum}
                            </button>
                          )
                        })}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="articles-page__pagination-btn"
                      >
                        {locale === 'en' ? 'Next' : 'Siguiente'}
                      </button>
                    </div>
                  )}

                  <p className="articles-page__results-info">
                    {locale === 'en' ? 'Showing' : 'Mostrando'} {articles.length} {locale === 'en' ? 'of' : 'de'} {total} {locale === 'en' ? 'articles' : 'artículos'}
                  </p>
                </>
              ) : (
                <div className="articles-page__no-results">
                  <p>
                    {filters.search
                      ? (locale === 'en' ? 'No articles found for your search' : 'No se encontraron artículos para tu búsqueda')
                      : (locale === 'en' ? 'No articles available' : 'No hay artículos disponibles')
                    }
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
