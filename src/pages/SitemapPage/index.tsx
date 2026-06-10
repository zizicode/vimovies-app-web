import { Link } from 'react-router-dom'
import { SEO } from '../../hooks/useSEO'
import { useI18n } from '../../store/locate.store'
import './SitemapPage.scss'

export default function SitemapPage() {
  const { t, locale } = useI18n()
  const isEnglish = locale === 'en'

  const sitemapSections = [
    {
      title: isEnglish ? 'Main' : 'Principal',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      ),
      links: [
        { key: 'nav.topbar.links.home', href: '/' },
        { key: 'nav.topbar.links.movies', href: '/peliculas' },
        { key: 'nav.topbar.links.genres', href: '/generos' },
        { key: 'nav.topbar.links.actors', href: '/actores' },
        { key: 'nav.topbar.links.blog', href: '/articles' },
      ]
    },
    {
      title: isEnglish ? 'Information' : 'Información',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4"/>
          <path d="M12 8h.01"/>
        </svg>
      ),
      links: [
        { label: isEnglish ? 'About us' : 'Sobre nosotros', href: '/sobre-nosotros' },
        { label: isEnglish ? 'Contact' : 'Contacto', href: '/contacto' },
      ]
    },
    {
      title: isEnglish ? 'Legal' : 'Legal',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      links: [
        { label: isEnglish ? 'Terms and conditions' : 'Términos y condiciones', href: '/terminos' },
        { label: isEnglish ? 'Privacy' : 'Privacidad', href: '/privacidad' },
        { label: isEnglish ? 'Cookies' : 'Cookies', href: '/cookies' },
      ]
    }
  ]

  return (
    <div className="SitemapPage">
      <SEO
        title={isEnglish ? 'Sitemap | ViMovies' : 'Mapa del sitio | ViMovies'}
        description={isEnglish ? 'Navigate easily through all sections of ViMovies' : 'Navega fácilmente por todas las secciones de Vimovies'}
        canonical={isEnglish ? 'https://vimovies.com/sitemap' : 'https://vimovies.com/mapa-del-sitio'}
        type="website"
        alternates={{
          es: 'https://vimovies.com/mapa-del-sitio',
          en: 'https://vimovies.com/sitemap'
        }}
      />
      <div className="SitemapPage__header">
        <div className="SitemapPage__header-content">
          <h1 className="SitemapPage__title">{isEnglish ? 'Sitemap' : 'Mapa del sitio'}</h1>
          <p className="SitemapPage__subtitle">
            {isEnglish ? 'Navigate easily through all sections of ViMovies' : 'Navega fácilmente por todas las secciones de Vimovies'}
          </p>
        </div>
      </div>

      <div className="SitemapPage__container">
        <div className="SitemapPage__sections">
          {sitemapSections.map((section, index) => (
            <div key={index} className="SitemapPage__section">
              <div className="SitemapPage__section-header">
                <div className="SitemapPage__section-icon">
                  {section.icon}
                </div>
                <h2 className="SitemapPage__section-title">{section.title}</h2>
              </div>
              <ul className="SitemapPage__section-list">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="SitemapPage__section-item">
                    <Link to={link.href} className="SitemapPage__section-link">
                      <span className="SitemapPage__link-text">
                        {link.key ? t(link.key as keyof ReturnType<typeof useI18n>['t']) : link.label}
                      </span>
                      <svg className="SitemapPage__link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14"/>
                        <path d="M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="SitemapPage__footer">
          <p className="SitemapPage__footer-text">
            {isEnglish ? 'Can\'t find what you\'re looking for?' : '¿No encuentras lo que buscas?'}{' '}
            <Link to="/contacto" className="SitemapPage__footer-link">
              {isEnglish ? 'Contact us' : 'Contáctanos'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
