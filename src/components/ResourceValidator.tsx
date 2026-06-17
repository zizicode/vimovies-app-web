import type { ReactNode } from 'react'
import { SeoMeta } from './SeoMeta'

interface ResourceValidatorProps {
  children: ReactNode
  isLoading: boolean
  error: string | null
  resourceType: 'movie' | 'series' | 'person' | 'article' | 'genre'
  slug: string
  locale: 'es_ES' | 'en_US'
}

/**
 * Componente que valida si un recurso existe y controla SEO accordingly
 * - Si hay error 404: muestra NotFoundPage con noindex
 * - Si está cargando: muestra loading
 * - Si existe: renderiza children con SEO normal
 */
export function ResourceValidator({
  children,
  isLoading,
  error,
  resourceType,
  locale
}: ResourceValidatorProps) {
  const isEnglish = locale === 'en_US'
  const canonical = `https://vimovies.com${window.location.pathname}`
  
  // Si hay error (404 o similar), renderizar NotFoundPage con noindex
  if (error) {
    const title = isEnglish 
      ? '404 - Resource Not Found | ViMovies' 
      : '404 - Recurso No Encontrado | ViMovies'
    
    const description = isEnglish
      ? `The ${resourceType} you are looking for does not exist or has been moved.`
      : `El ${resourceType} que buscas no existe o ha sido movido.`

    return (
      <div className="not-found-page">
        <SeoMeta
          title={title}
          description={description}
          canonical={canonical}
          type="website"
          locale={locale}
          noindex={true}
        />
        <div className="not-found-page__container">
          <div className="not-found-page__content">
            <h1 className="not-found-page__code">404</h1>
            <h2 className="not-found-page__title">
              {isEnglish ? 'Resource Not Found' : 'Recurso No Encontrado'}
            </h2>
            <p className="not-found-page__description">
              {isEnglish
                ? `The ${resourceType} you are looking for does not exist or has been moved.`
                : `El ${resourceType} que buscas no existe o ha sido movido.`}
            </p>
            <a href="/" className="not-found-page__home-btn">
              {isEnglish ? 'Go to Home' : 'Ir al Inicio'}
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Si está cargando, mostrar loading
  if (isLoading) {
    return (
      <div className="page-loading" style={{ minHeight: '100vh' }}>
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  // Si todo está bien, renderizar children (el contenido normal)
  return <>{children}</>
}
