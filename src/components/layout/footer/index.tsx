import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../../store/locate.store';
import logo from '/logos/vimovies_logo_circle.svg';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from './FooterIcons';
import './footer.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  const navLinks = [
    { key: 'nav.topbar.links.home', href: '/' },
    { key: 'nav.topbar.links.movies', href: '/peliculas' },
    { key: 'nav.topbar.links.genres', href: '/generos' },
    { key: 'nav.topbar.links.actors', href: '/actores' },
    { key: 'nav.topbar.links.blog', href: '/articles' },
  ];

  return (
    <footer className="footer">
      <div className="footer__container">
        
        {/* Bloque 1: Brand & Info */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <img src={logo} alt="Vimovies Logo" />
          </Link>
          <p className="footer__description">
            Tu guía editorial de cine. Descubrimiento, análisis y dónde ver los mejores títulos en streaming.
          </p>
          <div className="footer__social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
              <YoutubeIcon />
            </a>
          </div>
        </div>

        {/* Bloque 2: Descubrir - Mismos enlaces que topbar sin estrenos */}
        <div className="footer__nav">
          <h4 className="footer__title">Descubrir</h4>
          <ul className="footer__list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href}>
                  {t(link.key as keyof ReturnType<typeof useI18n>['t'])}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bloque 3: Plataformas */}
        <div className="footer__nav">
          <h4 className="footer__title">Plataformas</h4>
          <ul className="footer__list">
            <li><Link to="/plataformas/netflix">Netflix</Link></li>
            <li><Link to="/plataformas/prime-video">Prime Video</Link></li>
            <li><Link to="/plataformas/disney-plus">Disney+</Link></li>
            <li><Link to="/plataformas/max">Max</Link></li>
            <li><Link to="/plataformas/apple-tv">Apple TV+</Link></li>
            <li><Link to="/plataformas/mubi">MUBI</Link></li>
            <li><Link to="/plataformas" className="footer__link--accent">Ver todas →</Link></li>
          </ul>
        </div>

        {/* Bloque 4: Editorial & Empresa */}
        <div className="footer__nav">
          <h4 className="footer__title">Vimovies</h4>
          <ul className="footer__list">
            <li><Link to="/sobre-nosotros">Sobre nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/mapa-sitio">Mapa del sitio</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-container">
          <p className="footer__copy">
            © {currentYear} Vimovies. Todos los derechos reservados.
          </p>
          <div className="footer__legal">
            <Link to="/terminos">Términos y condiciones</Link>
            <Link to="/privacidad">Privacidad</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
