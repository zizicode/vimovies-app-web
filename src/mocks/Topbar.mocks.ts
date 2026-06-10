export const topbarMocks = {
  navLinks: [
    { key: 'nav.topbar.links.home', href: '/' },
    { key: 'nav.topbar.links.movies', href: '/peliculas' },
    { key: 'nav.topbar.links.genres', href: '/generos' },
    { key: 'nav.topbar.links.actors', href: '/actores' },
    { key: 'nav.topbar.links.premieres', href: '/estrenos' },
    { key: 'nav.topbar.links.blog', href: '/articles' },
    { key: 'nav.topbar.links.about', href: '/sobre-nosotros' },
  ],
  actions: [
    { key: 'nav.topbar.actions.changeLanguage', icon: 'ES' },
    { key: 'nav.topbar.actions.search', icon: 'search' },
    { key: 'nav.topbar.actions.searchInput', icon: 'search' },
  ],
} as const
