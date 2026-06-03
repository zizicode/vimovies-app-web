# Vimovies Frontend - Guía de Desarrollo

## 📋 Estado Actual del Proyecto

### ✅ Lo Completado

#### 1. Infraestructura Base
- **React 19 + TypeScript**: Configuración base con Vite
- **React Router 7**: Enrutamiento configurado
- **Zustand**: Store para gestión de estado (locale)
- **React Helmet Async**: SEO dinámico configurado
- **Axios**: Cliente HTTP para API

#### 2. Sistema de Internacionalización (i18n)
- **Store de Locale** (`store/locate.store.ts`):
  - Gestión del idioma activo (es/en)
  - Persistencia en localStorage
  - Sincronización con cookie
  - Función `useLocalizedContent()` con helpers

- **Helpers de Localización** (`lib/i18n/content.ts`):
  ```typescript
  const {
    locale,                    // 'es' | 'en'
    getMediaTitle,            // Título localizado de media
    getMediaSynopsis,         // Sinopsis localizada
    getGenreName,             // Nombre localizado de género
    getGenreDescription,      // Descripción localizada de género
    getMediaPath,             // Ruta según idioma (/pelicula/ o /movie/)
    getPath,                  // Helper general para rutas
    t                         // Traductor simple (es, en)
  } = useLocalizedContent()
  ```

#### 3. Cliente API
- **API Client** (`lib/api/client.ts`): Configuración de Axios
- **Media API** (`lib/api/media.ts`):
  - `getBySlug(slug, region)` - Obtener media por slug
  - `list(filters)` - Listado paginado
  - `search(query)` - Búsqueda
- **Genres API** (`lib/api/genres.ts`):
  - `getBySlug(slug)` - Obtener género por slug
  - `getWithMedia(slug, page, perPage, region)` - Género con sus películas/series
  - `list()` - Listado de géneros
- **Types** (`lib/api/types.ts`): Tipos TypeScript para respuestas API

#### 4. Vistas Implementadas
- **HomePage** (`pages/HomePage.tsx`): Listado de películas populares
- **MoviePage** (`pages/MoviePage.tsx`): 
  - ✅ Datos de película
  - ✅ SEO con Helmet (meta tags completos)
  - ✅ Localización de contenido
- **SeriesPage** (`pages/SeriesPage.tsx`): Datos de serie (sin SEO aún)
- **GenrePage** (`pages/GenrePage.tsx`): Género con sus películas/series (sin SEO aún)

#### 5. Enrutamiento Multilingüe
- Rutas en App.tsx:
  ```typescript
  / → HomePage
  /pelicula/:slug → MoviePage (español)
  /movie/:slug → MoviePage (inglés)
  /serie/:slug → SeriesPage (español)
  /tv-show/:slug → SeriesPage (inglés)
  /genero/:slug → GenrePage (español)
  /genre/:slug → GenrePage (inglés)
  ```

#### 6. API Backend (api-control)
- ✅ Endpoints de media funcionando
- ✅ Detección de bots para pre-rendering SEO
- ✅ Middleware de locale para bots
- ✅ Rutas de renderizado para SEO completo

---

## 🛠️ Utils y Helpers Disponibles

### 1. useLocalizedContent()
**Ubicación**: `lib/i18n/content.ts`

**Uso**:
```typescript
import { useLocalizedContent } from '../lib/i18n/content'

function MyPage() {
  const { locale, getMediaTitle, getMediaPath, t } = useLocalizedContent()
  
  // Obtener título según idioma
  const title = getMediaTitle(movie)
  
  // Obtener ruta según idioma
  const path = getMediaPath(movie) // /pelicula/eden-2025 o /movie/eden-2025
  
  // Traducción simple
  const text = t('Texto en español', 'Text in English')
  
  return <div>{title}</div>
}
```

**Métodos disponibles**:
- `locale`: 'es' | 'en'
- `getMediaTitle(media)`: Retorna título localizado
- `getMediaSynopsis(media)`: Retorna sinopsis localizada
- `getGenreName(genre)`: Retorna nombre de género localizado
- `getGenreDescription(genre)`: Retorna descripción de género localizada
- `getMediaPath(media)`: Retorna ruta según idioma
- `getPath(spanishPath, englishPath)`: Helper general para rutas
- `t(es, en)`: Traductor simple

### 2. API Clients
**Ubicación**: `lib/api/`

**Media API**:
```typescript
import { mediaApi } from '../lib/api'

// Obtener película/serie por slug
const response = await mediaApi.getBySlug('eden-2025', 'ES')

// Listado con filtros
const movies = await mediaApi.list({
  media_type: 'movie',
  per_page: 20,
  region: 'ES'
})

// Búsqueda
const results = await mediaApi.search('inception')
```

**Genres API**:
```typescript
import { genresApi } from '../lib/api'

// Obtener género
const genre = await genresApi.getBySlug('thriller')

// Género con películas
const genreWithMedia = await genresApi.getWithMedia('thriller', 1, 20, 'ES')

// Listado de géneros
const genres = await genresApi.list()
```

### 3. Helmet para SEO
**Ubicación**: `react-helmet-async` (ya configurado en main.tsx)

**Uso**:
```typescript
import { Helmet } from 'react-helmet-async'

<Helmet>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={imageUrl} />
  <meta property="og:type" content="video.movie" />
  <meta property="og:url" content={url} />
  <meta property="og:locale" content={locale === 'es' ? 'es_ES' : 'en_US'} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={imageUrl} />
  <link rel="canonical" href={url} />
</Helmet>
```

---

## 📝 Cómo Crear Nuevas Vistas

### Patrón General para Páginas de Contenido

#### 1. Importar dependencias necesarias
```typescript
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { mediaApi } from '../lib/api'  // o genresApi, etc
import { useLocalizedContent } from '../lib/i18n/content'
```

#### 2. Configurar estado y hooks
```typescript
export function MyPage() {
  const { slug } = useParams<{ slug: string }>()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getMediaTitle, getMediaSynopsis, locale } = useLocalizedContent()
```

#### 3. Cargar datos con locale
```typescript
useEffect(() => {
  async function loadData() {
    if (!slug) return
    try {
      const region = locale === 'en' ? 'US' : 'ES'
      const response = await mediaApi.getBySlug(slug, region)
      
      if (response.success && response.data) {
        setData(response.data)
      } else {
        setError('Contenido no encontrado')
      }
    } catch (error) {
      console.error('Error loading:', error)
      setError('Error al cargar')
    } finally {
      setLoading(false)
    }
  }
  loadData()
}, [slug, locale])
```

#### 4. Preparar datos para SEO
```typescript
if (loading) return <div>Cargando...</div>
if (error) return <div>{error}</div>
if (!data) return <div>Contenido no encontrado</div>

const title = locale === 'en'
  ? (data.seo_title_en || data.title_en || data.original_title)
  : (data.seo_title_es || data.title_es || data.original_title)
const description = locale === 'en'
  ? (data.seo_description_en || data.synopsis_en || data.synopsis_es || '')
  : (data.seo_description_es || data.synopsis_es || data.synopsis_en || '')
const imageUrl = data.poster_path ? `https://image.tmdb.org/t/p/w780${data.poster_path}` : ''
const url = `https://vimovies.com/${locale === 'en' ? 'ruta-en' : 'ruta-es'}/${data.slug}`
```

#### 5. Renderizar con Helmet
```typescript
return (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* ... más meta tags ... */}
    </Helmet>
    <div>
      {/* Contenido de la página */}
    </div>
  </>
)
```

---

## 🚧 Lo que Falta por Completar

### 1. Vistas Pendientes

#### SeriesPage - Agregar SEO
**Estado**: Tiene datos pero sin Helmet
**Tareas**:
- Agregar Helmet con meta tags
- Localizar title/description según locale
- Agregar schema.org para TVSeries

#### GenrePage - Agregar SEO
**Estado**: Tiene datos pero sin Helmet
**Tareas**:
- Agregar Helmet con meta tags
- Localizar title/description según locale
- Agregar schema.org para Collection

#### HomePage - Agregar SEO
**Estado**: Listado básico
**Tareas**:
- Agregar Helmet con meta tags generales
- Agregar listado de series también
- Mejorar diseño

#### Vistas por Crear
- **ArticlePage** (`/articulo/:slug`, `/article/:slug`): Artículos SEO
- **RankingPage** (`/ranking/:slug`): Listas curadas
- **PersonPage** (`/actor/:slug`, `/director/:slug`): Páginas de personas
- **SearchPage** (`/buscar`, `/search`): Página de búsqueda
- **NotFoundPage**: Página 404 personalizada

### 2. Componentes Reutilizables

#### LanguageSwitcher
**Ubicación**: No existe aún
**Tareas**:
- Crear componente para cambiar idioma
- Debe cambiar la URL manteniendo el slug
- Ejemplo: `/pelicula/eden-2025` → `/movie/eden-2025`

#### MediaCard
**Ubicación**: No existe aún
**Tareas**:
- Componente para tarjeta de película/serie
- Reutilizable en HomePage, GenrePage, etc.
- Con poster, título, año, rating

#### GenreTag
**Ubicación**: No existe aún
**Tareas**:
- Componente para tag de género
- Link a página del género
- Color según género o estilo consistente

#### LoadingSpinner
**Ubicación**: No existe aún
**Tareas**:
- Componente de carga visualmente atractivo
- Reemplazar los `<div>Cargando...</div>`

### 3. Mejoras de UX

#### Navegación
- Crear Header/Navbar con logo y navegación
- Agregar LanguageSwitcher en el header
- Breadcrumb para navegación jerárquica

#### Error Handling
- Página 404 personalizada
- Manejo de errores de API más elegante
- Retry mechanism para fallos de red

#### Performance
- Lazy loading de imágenes
- Infinite scroll para listados
- Skeleton screens mientras carga

### 4. SEO Avanzado

#### Schema.org
- Agregar schema.org en todas las páginas
- Implementar BreadcrumbList schema
- Implementar WebSite schema

#### Hreflang
- Agregar tags hreflang en Helmet
- Links alternativos para SEO internacional

#### Sitemap
- Verificar que el sitemap incluya todas las URLs
- Agregar sitemap frontend si es necesario

### 5. Estilos y Diseño

#### Sistema de Diseño
- Definir paleta de colores consistente
- Sistema de tipografía
- Espaciado y layout

#### Componentes UI
- Botones, inputs, selects estilizados
- Cards, modales, tooltips
- Responsive design (mobile-first)

#### Dark Mode
- Soporte para tema oscuro
- Toggle en el header
- Persistencia en localStorage

---

## 📚 Estructura de Archivos Recomendada

```
web/src/
├── components/
│   ├── common/
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── NotFound.tsx
│   ├── media/
│   │   ├── MediaCard.tsx
│   │   ├── MediaPoster.tsx
│   │   └── MediaRating.tsx
│   ├── genre/
│   │   ├── GenreTag.tsx
│   │   └── GenreList.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── LanguageSwitcher.tsx
├── pages/
│   ├── HomePage.tsx ✅
│   ├── MoviePage.tsx ✅
│   ├── SeriesPage.tsx ⚠️ (falta SEO)
│   ├── GenrePage.tsx ⚠️ (falta SEO)
│   ├── ArticlePage.tsx ❌
│   ├── RankingPage.tsx ❌
│   ├── PersonPage.tsx ❌
│   ├── SearchPage.tsx ❌
│   └── NotFoundPage.tsx ❌
├── hooks/
│   ├── useApi.ts (para manejo de errores y loading)
│   ├── useSEO.ts (para meta tags reutilizables)
│   └── useLanguageSwitch.ts (para cambiar idioma)
├── lib/
│   ├── api/ ✅
│   └── i18n/ ✅
├── store/ ✅
├── utils/
│   ├── format.ts (formatos de fecha, número, etc)
│   └── validation.ts (validaciones)
└── styles/
    ├── variables.scss
    ├── mixins.scss
    └── global.scss ✅
```

---

## 🎯 Roadmap Prioritario

### Fase 1: Completar Vistas Existentes (Alta Prioridad)
1. Agregar SEO a SeriesPage
2. Agregar SEO a GenrePage
3. Agregar SEO a HomePage

### Fase 2: Componentes Reutilizables (Media Prioridad)
1. Crear LanguageSwitcher
2. Crear MediaCard
3. Crear LoadingSpinner
4. Crear Header/Navbar

### Fase 3: Nuevas Vistas (Media Prioridad)
1. ArticlePage
2. RankingPage
3. SearchPage
4. NotFoundPage

### Fase 4: Mejoras de UX (Baja Prioridad)
1. Dark Mode
2. Infinite Scroll
3. Skeleton Screens
4. Breadcrumb

### Fase 5: SEO Avanzado (Media Prioridad)
1. Schema.org en todas las páginas
2. Hreflang tags
3. Sitemap verification

---

## 💡 Tips de Desarrollo

### 1. Siempre usar locale en las llamadas API
```typescript
// ✅ Correcto
const region = locale === 'en' ? 'US' : 'ES'
const response = await mediaApi.getBySlug(slug, region)

// ❌ Incorrecto
const response = await mediaApi.getBySlug(slug, 'ES') // Hardcodeado
```

### 2. Usar helpers de localización
```typescript
// ✅ Correcto
const title = getMediaTitle(movie)

// ❌ Incorrecto
const title = locale === 'en' ? movie.title_en : movie.title_es
```

### 3. Siempre agregar Helmet en páginas de contenido
```typescript
// ✅ Correcto
<Helmet>
  <title>{title}</title>
  <meta name="description" content={description} />
</Helmet>

// ❌ Incorrecto
// Sin Helmet - mala práctica para SEO
```

### 4. Manejar estados de loading y error
```typescript
// ✅ Correcto
if (loading) return <LoadingSpinner />
if (error) return <ErrorMessage message={error} />
if (!data) return <NotFound />

// ❌ Incorrecto
if (loading) return null // No muestra nada
if (error) return <div>Error</div> // No es amigable
```

---

## 🔗 Recursos Útiles

### Documentación
- Documentación de API: `Documentacion/API-ENDPOINTS.md`
- Arquitectura Frontend: `Documentacion/FRONTEND-ARCHITECTURE.md`
- SEO Arquitectura: `Documentacion/README-SEO-ARQUITECTURA.md`

### API Endpoints Disponibles
- Media: `/api/media/:slug`, `/api/media`, `/api/media/search`
- Genres: `/api/genres/:slug`, `/api/genres/:slug/media`, `/api/genres`
- (Más en Documentacion/API-ENDPOINTS.md)

---

## ✅ Checklist para Nueva Vista

- [ ] Importar dependencias (useEffect, useState, useParams, Helmet, API, useLocalizedContent)
- [ ] Configurar estado (data, loading, error)
- [ ] Implementar useEffect con locale
- [ ] Manejar loading y error
- [ ] Preparar datos para SEO (title, description, url, image)
- [ ] Agregar Helmet con meta tags completos
- [ ] Renderizar contenido localizado
- [ ] Agregar ruta en App.tsx (español e inglés)
- [ ] Probar en ambos idiomas
- [ ] Verificar meta tags en DevTools
- [ ] Probar con bot (curl)

---

¡Estás avanzando muy bien! La base está sólida. Sigue el patrón de MoviePage para las demás vistas y no olvides siempre usar los helpers de localización y agregar Helmet para SEO.
