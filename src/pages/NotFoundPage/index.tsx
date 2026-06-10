import { Link } from 'react-router-dom'
import { useLocale } from '../../store/locate.store'
import { SEO } from '../../hooks/useSEO'
import './NotFoundPage.scss'

export default function NotFoundPage() {
  const locale = useLocale()
  const isEnglish = locale === 'en'

  return (
    <div className="not-found-page">
      <SEO
        title={isEnglish ? '404 - Page Not Found | ViMovies' : '404 - Página No Encontrada | ViMovies'}
        description={isEnglish ? 'The page you are looking for does not exist or has been moved.' : 'La página que buscas no existe o ha sido movida.'}
        canonical="https://vimovies.com/404"
        type="website"
        locale={isEnglish ? 'en_US' : 'es_ES'}
        noindex={true}
      />
      <div className="not-found-page__container">
        <div className="not-found-page__content">
          <h1 className="not-found-page__code">404</h1>
          <h2 className="not-found-page__title">
            {isEnglish ? 'Page Not Found' : 'Página No Encontrada'}
          </h2>
          <p className="not-found-page__description">
            {isEnglish
              ? 'The page you are looking for does not exist or has been moved.'
              : 'La página que buscas no existe o ha sido movida.'}
          </p>
          <Link to="/" className="not-found-page__home-btn">
            {isEnglish ? 'Go to Home' : 'Ir al Inicio'}
          </Link>
        </div>
      </div>
    </div>
  )
}
