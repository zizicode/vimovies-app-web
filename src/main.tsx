import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './styles/global.scss'
import App from './App.tsx'
import Store from './store'

// Prefetch data as early as possible
Store.useMoviesStore.getState().fetchMovies()
Store.useGenresStore.getState().fetchGenres()
Store.usePlatformsStore.getState().fetchPlatforms()
Store.useArticlesStore.getState().fetchArticles()

createRoot(document.getElementById('root')!).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
)
