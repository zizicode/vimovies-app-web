import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './topbar.scss'
import logo from '/logos/vimovies_logo_circle.svg'
import { topbarMocks } from '../../../mocks'
import { useI18n } from '../../../store/locate.store'

function Topbar() {
  const { t, locale, setLocale } = useI18n()
  const location = useLocation()
  const [menuOpen, setMenuOpen]     = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const toggleLocale = () => setLocale(locale === 'es' ? 'en' : 'es')

  const closeAll = () => {
    setMenuOpen(false)
    setSearchOpen(false)
  }

  return (
    <>
      <div className="topbar">
        <div className="content_topbar">
          <div className="identity">
            <img src={logo} alt="Vimovies Logo" className="logo" />
            <em><span>Vi</span>movies</em>
          </div>

          <div className="actions">
            <button
              className="action-btn"
              aria-label={t(topbarMocks.actions[0].key as keyof ReturnType<typeof useI18n>['t'])}
              onClick={toggleLocale}
            >
              <span>{locale.toUpperCase()}</span>
            </button>

            {/* Botón search */}
            <button
              className={`action-btn ${searchOpen ? 'action-btn--active' : ''}`}
              aria-label="Buscar"
              onClick={() => { setSearchOpen(p => !p); setMenuOpen(false) }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Botón hamburguesa — visible solo en mobile */}
            <button
              className={`action-btn nav-toggle ${menuOpen ? 'action-btn--active' : ''}`}
              aria-label="Menú"
              onClick={() => { setMenuOpen(p => !p); setSearchOpen(false) }}
            >
              {menuOpen ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Nav bar inferior — desktop */}
        <div className="nav-bar">
          <div className="content_nav">
            {topbarMocks.navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) => {
                  // Para /peliculas, activar si la ruta empieza con /pelicula, /peliculas, /movie o /movies
                  if (link.href === '/peliculas') {
                    const isMoviesRoute = location.pathname.startsWith('/pelicula') ||
                                          location.pathname.startsWith('/peliculas') ||
                                          location.pathname.startsWith('/movie') ||
                                          location.pathname.startsWith('/movies')
                    return `nav-link ${isMoviesRoute ? 'active' : ''}`
                  }
                  // Para /generos, activar si la ruta empieza con /genero, /generos, /genre o /genres
                  if (link.href === '/generos') {
                    const isGenreRoute = location.pathname.startsWith('/genero') ||
                                         location.pathname.startsWith('/generos') ||
                                         location.pathname.startsWith('/genre') ||
                                         location.pathname.startsWith('/genres')
                    return `nav-link ${isGenreRoute ? 'active' : ''}`
                  }
                  // Para /estrenos, activar si la ruta empieza con /estreno, /estrenos, /premiere o /premieres
                  if (link.href === '/estrenos') {
                    const isPremiereRoute = location.pathname.startsWith('/estreno') ||
                                            location.pathname.startsWith('/estrenos') ||
                                            location.pathname.startsWith('/premiere') ||
                                            location.pathname.startsWith('/premieres')
                    return `nav-link ${isPremiereRoute ? 'active' : ''}`
                  }
                  // Para /actores, activar si la ruta empieza con /actor, /actores, /person o /people
                  if (link.href === '/actores') {
                    const isActorRoute = location.pathname.startsWith('/actor') ||
                                        location.pathname.startsWith('/actores') ||
                                        location.pathname.startsWith('/persona') ||
                                        location.pathname.startsWith('/person')
                    return `nav-link ${isActorRoute ? 'active' : ''}`
                  }
                  // Para /articles, usar la lógica normal de isActive
                  if (link.href === '/articles') {
                    const isArticleRoute = location.pathname.startsWith('/articulo') ||
                                          location.pathname.startsWith('/article')
                    return `nav-link ${isArticleRoute ? 'active' : ''}`
                  }
                  // Para el resto, usar la lógica normal de isActive
                  return `nav-link ${isActive ? 'active' : ''}`
                }}
              >
                {t(link.key as keyof ReturnType<typeof useI18n>['t'])}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {(menuOpen || searchOpen) && (
        <div className="panel-overlay" onClick={closeAll} />
      )}

      {/* Panel — Nav lateral (mobile) */}
      <aside className={`side-panel side-panel--nav ${menuOpen ? 'side-panel--open' : ''}`}>
        <div className="side-panel__header">
          <span className="side-panel__title">Menú</span>
          <button className="side-panel__close" onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="side-panel__nav">
          {topbarMocks.navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) => {
                // Para /peliculas, activar si la ruta empieza con /pelicula, /peliculas, /movie o /movies
                if (link.href === '/peliculas') {
                  const isMoviesRoute = location.pathname.startsWith('/pelicula') ||
                                        location.pathname.startsWith('/peliculas') ||
                                        location.pathname.startsWith('/movie') ||
                                        location.pathname.startsWith('/movies')
                  return `side-nav-link ${isMoviesRoute ? 'active' : ''}`
                }
                // Para /generos, activar si la ruta empieza con /genero, /generos, /genre o /genres
                if (link.href === '/generos') {
                  const isGenreRoute = location.pathname.startsWith('/genero') ||
                                       location.pathname.startsWith('/generos') ||
                                       location.pathname.startsWith('/genre') ||
                                       location.pathname.startsWith('/genres')
                  return `side-nav-link ${isGenreRoute ? 'active' : ''}`
                }
                // Para /estrenos, activar si la ruta empieza con /estreno, /estrenos, /premiere o /premieres
                if (link.href === '/estrenos') {
                  const isPremiereRoute = location.pathname.startsWith('/estreno') ||
                                          location.pathname.startsWith('/estrenos') ||
                                          location.pathname.startsWith('/premiere') ||
                                          location.pathname.startsWith('/premieres')
                  return `side-nav-link ${isPremiereRoute ? 'active' : ''}`
                }
                // Para /actores, activar si la ruta empieza con /actor, /actores, /person o /people
                if (link.href === '/actores') {
                  const isActorRoute = location.pathname.startsWith('/actor') ||
                                      location.pathname.startsWith('/actores') ||
                                      location.pathname.startsWith('/persona') ||
                                      location.pathname.startsWith('/person')
                  return `side-nav-link ${isActorRoute ? 'active' : ''}`
                }
                // Para /articles, usar la lógica normal de isActive
                if (link.href === '/articles') {
                  const isArticleRoute = location.pathname.startsWith('/articulo') ||
                                        location.pathname.startsWith('/article')
                  return `side-nav-link ${isArticleRoute ? 'active' : ''}`
                }
                // Para el resto, usar la lógica normal de isActive
                return `side-nav-link ${isActive ? 'active' : ''}`
              }}
              onClick={() => setMenuOpen(false)}
            >
              {t(link.key as keyof ReturnType<typeof useI18n>['t'])}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Panel — Search lateral */}
      <aside className={`side-panel side-panel--search ${searchOpen ? 'side-panel--open' : ''}`}>
        <div className="side-panel__header">
          <span className="side-panel__title">{t('nav.topbar.actions.search')}</span>
          <button className="side-panel__close" onClick={() => setSearchOpen(false)}
            aria-label={t('nav.topbar.actions.search')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="side-panel__search-input">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            id="search-input"
            name="search"
            placeholder={t('nav.topbar.actions.searchInput')}
            autoFocus={searchOpen}
          />
        </div>
        <div className="side-panel__empty">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span>Sin resultados de búsqueda</span>
        </div>
      </aside>
    </>
  )
}

export default Topbar