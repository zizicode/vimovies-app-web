import { SEO } from '../../hooks/useSEO'
import { useLocale } from '../../store/locate.store'
import './AboutPage.scss'

export default function AboutPage() {
  const locale = useLocale()
  const isEnglish = locale === 'en'

  return (
    <div className="AboutPage">
      <SEO
        title={isEnglish ? 'About Us | ViMovies' : 'Sobre Nosotros | ViMovies'}
        description={isEnglish ? 'Learn about ViMovies, our mission, and our passion for cinema and movie recommendations.' : 'Conoce a ViMovies, nuestra misión y nuestra pasión por el cine y las recomendaciones de películas.'}
        canonical={isEnglish ? 'https://vimovies.com/about-us' : 'https://vimovies.com/sobre-nosotros'}
        type="website"
        locale={isEnglish ? 'en_US' : 'es_ES'}
        image="https://vimovies.com/web-app-manifest-512x512.png"
        alternates={{
          es: 'https://vimovies.com/sobre-nosotros',
          en: 'https://vimovies.com/about-us'
        }}
      />
      {/* Header */}
      <div className="AboutPage__header">
        <div className="AboutPage__header-content">
          <h1 className="AboutPage__title">{isEnglish ? 'About Us' : 'Sobre Nosotros'}</h1>
          <p className="AboutPage__subtitle">
            {isEnglish ? 'Passion for cinema, community, and inspiring recommendations' : 'Pasión por el cine, comunidad y recomendaciones que inspiran'}
          </p>
        </div>
      </div>

      <div className="AboutPage__container">
        {/* Fundador */}
        <div className="AboutPage__section">
          <div className="AboutPage__founder-card">
            <div className="AboutPage__founder-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="AboutPage__founder-info">
              <h2 className="AboutPage__founder-name">Victor Rodriguez</h2>
              <p className="AboutPage__founder-role">Desarrollador Web & Fundador</p>
              <p className="AboutPage__founder-bio">
                Apasionado por el desarrollo web y el séptimo arte. Creo en la tecnología como herramienta para 
                conectar personas y compartir experiencias cinematográficas únicas.
              </p>
            </div>
          </div>
        </div>

        {/* Misión */}
        <div className="AboutPage__section">
          <div className="AboutPage__mission-card">
            <div className="AboutPage__mission-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
              </svg>
            </div>
            <h2 className="AboutPage__section-title">Nuestra Misión</h2>
            <p className="AboutPage__section-text">
              Brindar recomendaciones de los clásicos del cine que han definido generaciones, 
              preservando la magia del celluloid para las nuevas audiencias. Creemos que cada película 
              cuenta una historia que merece ser descubierta y compartida.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="AboutPage__section">
          <h2 className="AboutPage__grid-title">Lo Que Nos Define</h2>
          <div className="AboutPage__values-grid">
            <div className="AboutPage__value-card">
              <div className="AboutPage__value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="AboutPage__value-title">Clásicos del Cine</h3>
              <p className="AboutPage__value-text">
                Recomendaciones curadas de películas que marcaron época, desde el golden age de Hollywood 
                hasta obras maestras del cine internacional.
              </p>
            </div>

            <div className="AboutPage__value-card">
              <div className="AboutPage__value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="AboutPage__value-title">Comunidad</h3>
              <p className="AboutPage__value-text">
                Construir un espacio donde los amantes del cine puedan compartir opiniones, 
                descubrir nuevas perspectivas y conectar con personas que comparten la misma pasión.
              </p>
            </div>

            <div className="AboutPage__value-card">
              <div className="AboutPage__value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
                  <polyline points="17 2 12 7 7 2"/>
                </svg>
              </div>
              <h3 className="AboutPage__value-title">Estrenos</h3>
              <p className="AboutPage__value-text">
                Mantenerte al día con los últimos estrenos de tus plataformas de streaming favoritas, 
                con análisis y recomendaciones para que nunca te quedes sin qué ver.
              </p>
            </div>

            <div className="AboutPage__value-card">
              <div className="AboutPage__value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </div>
              <h3 className="AboutPage__value-title">Calidad</h3>
              <p className="AboutPage__value-text">
                Cada recomendación es cuidadosamente seleccionada, priorizando la calidad narrativa, 
                la excelencia técnica y el impacto cultural de cada obra.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="AboutPage__section">
          <div className="AboutPage__cta-card">
            <h2 className="AboutPage__cta-title">Únete a Nuestra Comunidad</h2>
            <p className="AboutPage__cta-text">
              Ya seas un cinéfilo experimentado o alguien que recién comienza a explorar el mundo del cine, 
              hay un lugar para ti aquí. Descubre, comparte y crece con nosotros.
            </p>
            <a href="/contact" className="AboutPage__cta-button">
              Contáctanos
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
