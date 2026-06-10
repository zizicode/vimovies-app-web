import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from '../components/layout'

const Home = lazy(() => import('../pages/Home'))
const MaintenancePage = lazy(() => import('../pages/MaintenancePage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))
// const GenrePage = lazy(() => import('../pages/GenrePage'))
const GenresPage = lazy(() => import('../pages/GenresPage'))
const MoviesPage = lazy(() => import('../pages/MoviesPage'))
const MovieDetailPage = lazy(() => import('../pages/MovieDetailPage'))
const SeriesDetailPage = lazy(() => import('../pages/SeriesDetailPage'))
const PersonDetailPage = lazy(() => import('../pages/PersonDetailPage'))
const PeoplePage = lazy(() => import('../pages/PeoplePage'))
const ArticlesPage = lazy(() => import('../pages/ArticlesPage'))
const ArticleDetailPage = lazy(() => import('../pages/ArticleDetailPage'))
const SitemapPage = lazy(() => import('../pages/SitemapPage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const TermsPage = lazy(() => import('../pages/TermsPage'))
const PrivacyPage = lazy(() => import('../pages/PrivacyPage'))
const CookiesPage = lazy(() => import('../pages/CookiesPage'))

// Componente de redirección para rutas en plural
const GenreRedirect = () => {
  const { slug } = useParams<{ slug: string }>()
  const { pathname } = useLocation()
  const isEnglish = pathname.startsWith('/genres/')
  const newPath = isEnglish ? `/genre/${slug}` : `/genero/${slug}`
  return <Navigate to={newPath} replace />
}

export function AppRouter() {
  return (
    <Suspense fallback={<div className="page-loading" style={{ minHeight: '100vh' }} />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Películas ES/EN */}
          <Route path="/peliculas" element={<MoviesPage />} />
          <Route path="/movies" element={<MoviesPage />} />

          {/* Actores ES/EN */}
          <Route path="/actores" element={<PeoplePage />} />
          <Route path="/actors" element={<PeoplePage />} />

          {/* Géneros ES/EN - Rutas en singular (correctas) */}
          <Route path="/genero/:slug" element={<GenresPage />} />
          <Route path="/genre/:slug" element={<GenresPage />} />

          {/* Géneros ES/EN - Rutas en plural (redirección a singular) */}
          <Route path="/generos/:slug" element={<GenreRedirect />} />
          <Route path="/genres/:slug" element={<GenreRedirect />} />

          {/* Detalle película ES/EN */}
          <Route path="/pelicula/:slug" element={<MovieDetailPage />} />
          <Route path="/movie/:slug" element={<MovieDetailPage />} />

          {/* Series ES/EN */}
          <Route path="/serie/:slug" element={<SeriesDetailPage />} />
          <Route path="/tv-show/:slug" element={<SeriesDetailPage />} />

          {/* Personas ES/EN */}
          <Route path="/actor/:slug" element={<PersonDetailPage />} />
          <Route path="/persona/:slug" element={<PersonDetailPage />} />
          <Route path="/person/:slug" element={<PersonDetailPage />} />

          {/* Géneros lista ES/EN */}
          <Route path="/generos" element={<GenresPage />} />
          <Route path="/genres" element={<GenresPage />} />

          {/* Artículos lista ES/EN */}
          <Route path="/articulos" element={<ArticlesPage />} />
          <Route path="/articles" element={<ArticlesPage />} />

          {/* Artículos detalle ES/EN */}
          <Route path="/articulo/:slug" element={<ArticleDetailPage />} />
          <Route path="/article/:slug" element={<ArticleDetailPage />} />

          {/* Mapa del sitio */}
          <Route path="/mapa-sitio" element={<SitemapPage />} />

          {/* Contacto */}
          <Route path="/contacto" element={<ContactPage />} />

          {/* Sobre Nosotros ES/EN */}
          <Route path="/sobre-nosotros" element={<AboutPage />} />
          <Route path="/about-us" element={<AboutPage />} />

          {/* Términos y Condiciones ES/EN */}
          <Route path="/terminos" element={<TermsPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Política de Privacidad ES/EN */}
          <Route path="/privacidad" element={<PrivacyPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />

          {/* Política de Cookies ES/EN */}
          <Route path="/cookies" element={<CookiesPage />} />
        </Route>

        {/* 404 personalizado */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
