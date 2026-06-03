# Arquitectura SSR/SEO para Vimovies

## Visión General

Este documento explica la arquitectura existente en `api-control` para servir diferentes tipos de contenido según si el visitante es un bot (crawler) o un usuario regular.

## Estado Actual

La API en `api-control` **YA TIENE IMPLEMENTADA** la lógica de:
- ✅ Detección de bots por User-Agent
- ✅ Generación de HTML estático para películas, series, artículos, géneros y rankings
- ✅ Sitemaps dinámicos desde Supabase
- ✅ Detección de idioma (es/en) desde múltiples fuentes
- ✅ Metadata SEO y structured data (JSON-LD)

## Flujo de Arquitectura Actual

```
┌─────────────────────────────────────────────────────────────────┐
│                    Solicitud del Visitante                       │
│                 vimovies.com/pelicula/inception                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                ┌────────────────────────┐
                │  API Hono (localhost)  │
                │  localeMiddleware      │  ← Detecta idioma
                └────────────┬───────────┘
                             │
                             ▼
                ┌────────────────────────┐
                │  botMiddleware         │  ← Detecta si es bot
                └────┬───────────────┬───┘
                     │               │
                     │ Bot           │ Usuario
                     ▼               ▼
        ┌──────────────────┐  ┌──────────────────┐
        │  /render/...     │  │  SPA (React App) │
        │  (render.routes) │  │  (Frontend web/) │
        │  Genera HTML     │  │  index.html      │
        └────────┬─────────┘  └────────┬─────────┘
                 │                     │
                 ▼                     ▼
        ┌──────────────────┐  ┌──────────────────┐
        │  HTML completo   │  │  React renderiza │
        │  con SEO, JSON-LD│  │  vía API JSON    │
        │  (sin JS necesario)│  │                 │
        └──────────────────┘  └──────────────────┘
```

## Flujo de Solicitudes

### Para Bots (Googlebot, Bingbot, etc.)

1. **Solicitud**: Bot accede a `vimovies.com/pelicula/inception`
2. **Detección de idioma**: `localeMiddleware` detecta locale desde:
   - Path: `/es/pelicula/...` o `/en/pelicula/...`
   - Query: `?region=ES` o `?region=US`
   - Accept-Language header
   - User-Agent (para bots específicos)
3. **Detección de bot**: `botMiddleware` detecta si es bot por User-Agent:
   - `googlebot`, `bingbot`, `twitterbot`, `facebookexternalhit`, `linkedinbot`
4. **Redirección interna**: Si es bot y ruta de contenido, redirige a:
   - `/render/pelicula/:slug?region=ES`
   - Headers incluyen `X-Bot-Request: true` y `X-Locale: es`
5. **Generación de HTML**: `renderRoutes` genera HTML con:
   - SEO meta tags (title, description, OG tags, Twitter cards)
   - Structured data (JSON-LD) para Movie, TVSeries, Article, etc.
   - Contenido renderizado (sin necesidad de JS)
   - URLs canónicas correctas según idioma
6. **Respuesta**: Retorna HTML completo

### Para Usuarios Regulares

1. **Solicitud**: Usuario accede a `vimovies.com/pelicula/inception`
2. **Detección de idioma**: Igual que para bots
3. **Middleware**: `botMiddleware` NO redirige (no es bot)
4. **SPA**: Sirve `index.html` del frontend (Vite build)
5. **Client-side**:
   - React app carga
   - Router detecta ruta `/pelicula/inception`
   - Componente hace fetch a API: `/api/movie/slug/inception`
   - API retorna JSON
   - React renderiza contenido dinámicamente

## Estructura Existente en api-control

### Middleware Implementados

**`src/middleware/bot.middleware.ts`**
```typescript
- Detecta bots por User-Agent: googlebot, bingbot, twitterbot, etc.
- Rutas de contenido: /pelicula/, /serie/, /actor/, /genero/, /articulo/, /ranking/
- Normaliza secciones: movie → pelicula, tv-show → serie, genre → genero
- Redirige a: /render/{section}/{slug}?region={region}
- Pasa headers: X-Bot-Request, X-Locale, X-Forwarded-For
```

**`src/middleware/locale.middleware.ts`**
```typescript
- Soporta: es, en
- Prioridades de detección:
  1. Path (/es/..., /en/...)
  2. Query param (?region=ES, ?region=US)
  3. Accept-Language header
  4. User-Agent (para bots específicos)
- Almacena locale en contexto: c.set('locale', detectedLocale)
```

### Rutas Implementadas

**`src/routes/render.routes.ts`**
- `/render/*` - Genera HTML estático para:
  - Películas (`/render/pelicula/:slug`)
  - Series (`/render/serie/:slug`)
  - Artículos (`/render/articulo/:slug`)
  - Géneros (`/render/genero/:slug`)
  - Rankings (`/render/ranking/:slug`)
- Incluye:
  - Template HTML base con todos los meta tags
  - Schema.org generators (Movie, TVSeries, Article, ItemList)
  - Soporte multiidioma para título y descripción
  - URLs canónicas correctas

**`src/routes/sitemap.routes.ts`**
- `/sitemap.xml` - Index de sitemaps
- `/sitemap-peliculas.xml` - Películas en español
- `/sitemap-peliculas-en.xml` - Películas en inglés
- `/sitemap-series.xml` - Series
- `/sitemap-actores.xml` - Actores
- `/sitemap-generos.xml` - Géneros
- `/sitemap-articulos.xml` - Artículos
- `/sitemap-plataformas.xml` - Plataformas
- `/sitemap-listas.xml` - Listas curadas
- `/robots.txt` - Robots.txt con sitemap reference

## Configuración del Frontend (web/)

### Estructura Sugerida para web/

```
web/
├── public/
│   └── (assets estáticos)
├── src/
│   ├── components/
│   │   ├── seo/
│   │   │   ├── MetaTags.tsx       # Componente de meta tags dinámicos
│   │   │   └── JsonLd.tsx         # Componente de structured data
│   │   └── (otros componentes)
│   ├── pages/
│   │   ├── MoviePage.tsx          # Página de detalle de película
│   │   ├── SeriesPage.tsx         # Página de detalle de serie
│   │   ├── HomePage.tsx           # Página de inicio
│   │   ├── GenrePage.tsx          # Listado de género
│   │   ├── ArticlePage.tsx        # Página de artículo
│   │   └── (otras páginas)
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts          # Cliente API para usuarios
│   │   │   └── types.ts           # Types de respuestas API
│   │   └── (otras utilidades)
│   ├── App.tsx
│   └── main.tsx
└── README-SSR-ARCHITECTURE.md     # Este archivo
```

### Endpoints API Existentes (para Usuarios - JSON)

```
GET /api/movie/slug/:slug          → Datos de película (JSON)
GET /api/genre/slug/:slug          → Datos de género (JSON)
GET /api/person/slug/:slug         → Datos de persona (JSON)
GET /api/article/slug/:slug        → Datos de artículo (JSON)
GET /api/curated-list/slug/:slug   → Datos de lista curada (JSON)
```

### Endpoints de Render (para Bots - HTML)

```
GET /render/pelicula/:slug         → HTML renderizado de película
GET /render/serie/:slug            → HTML renderizado de serie
GET /render/articulo/:slug         → HTML renderizado de artículo
GET /render/genero/:slug           → HTML renderizado de género
GET /render/ranking/:slug          → HTML renderizado de ranking
GET /sitemap.xml                   → XML Sitemap index
GET /robots.txt                    → Robots.txt
```

## Configuración de Cloudflare

### Opción 1: Cloudflare Tunnel (cloudflared) - Para desarrollo local

La API ya usa cloudflared. Configura el túnel para:

1. **Dominio principal**: `vimovies.com`
2. **Rutas de frontend**:
   - `/` → Servir archivos estáticos de `web/dist/`
   - `/assets/*` → Servir assets estáticos
3. **Rutas de API**:
   - `/api/*` → Proxy a `api-control` (puerto 3000)
   - `/render/*` → Proxy a `api-control` (puerto 3000)
   - `/sitemap.xml` → Proxy a `api-control`
   - `/robots.txt` → Proxy a `api-control`

### Opción 2: Vercel + Render (Producción) - Configuración Actual

**Frontend**: Vercel
- Sube la carpeta `web/` a Vercel
- Configura variables de entorno:
  - `VITE_API_URL=https://tu-api.onrender.com/api`
  - `VITE_RENDER_URL=https://tu-api.onrender.com/render`
- Vercel sirve el SPA React

**Backend**: Render
- Tu API Hono ya está en Render
- Tiene su propio dominio: `https://tu-api.onrender.com`
- Expone endpoints `/api/*` y `/render/*`

**Comunicación**:
```
Usuario → Vercel (vimovies.com) → Render API (JSON/HTML)
Bot → Vercel → Render API (/render/*) → HTML estático
```

### Opción 3: Cloudflare Workers (Más avanzado)

Usa Cloudflare Workers para:

1. **Detectar bot en el edge**
2. **Si es bot**:
   - Proxy a `/render/*` en tu API
   - Cache respuesta HTML
3. **Si es usuario**:
   - Servir archivos estáticos del frontend
   - Cache assets

```javascript
// Ejemplo de Worker
export default {
  async fetch(request) {
    const url = new URL(request.url)
    const userAgent = request.headers.get('user-agent') || ''
    const isBot = /googlebot|bingbot|twitterbot/i.test(userAgent)
    const isContentRoute = /^\/(pelicula|serie|actor|genero|articulo|ranking)\//.test(url.pathname)

    if (isBot && isContentRoute) {
      // Proxy a API para render
      const apiUrl = `https://api.vimovies.com/render${url.pathname}`
      return fetch(apiUrl, request)
    }

    // Servir frontend estático
    return fetch(request)
  }
}
```

## Tecnologías Necesarias en el Frontend

### Routing Cliente
- **React Router v6** - Para navegación client-side
- Configura rutas que coincidan con las rutas de contenido:
  ```typescript
  <Route path="/pelicula/:slug" element={<MoviePage />} />
  <Route path="/serie/:slug" element={<SeriesPage />} />
  <Route path="/genero/:slug" element={<GenrePage />} />
  <Route path="/articulo/:slug" element={<ArticlePage />} />
  ```

### Cliente API
- **Axios** o **Fetch API** - Para hacer peticiones a la API
```typescript
// src/lib/api/client.ts
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
})
```

### SEO Components
- **MetaTags dinámicos**: Actualizar document.title y meta tags en navegación
- **JsonLd**: Inyectar structured data cuando sea necesario

## Pasos de Implementación en el Frontend

### Fase 1: Configuración Básica
1. Instalar React Router v6
2. Configurar rutas que coincidan con las rutas de contenido de la API
3. Crear cliente API para fetch de datos

### Fase 2: Páginas de Contenido
1. Crear `MoviePage.tsx`:
   - Fetch datos desde `/api/movie/slug/:slug`
   - Renderizar información de película
   - Incluir MetaTags dinámicos
2. Crear páginas similares para series, géneros, artículos, etc.

### Fase 3: Página de Inicio
1. Crear `HomePage.tsx`:
   - Fetch datos de películas populares, nuevas, etc.
   - Incluir enlaces a otras páginas para crawling
   - Asegurar que la API tenga endpoint `/render/` para home (falta implementar)

### Fase 4: Integración con Cloudflare
1. Configurar cloudflared para servir frontend estático
2. Configurar proxy de rutas API a `api-control`
3. Probar que bots reciben HTML y usuarios reciben SPA

### Fase 5: Monitoreo
1. Verificar en Google Search Console que páginas se indexan
2. Probar con Rich Results Test de Google
3. Monitorear logs de la API para ver requests de bots

## Lo que Falta Implementar

### En api-control
- [ ] Endpoint `/render/` para página de inicio (home)
- [ ] Endpoint `/render/` para páginas de actores/personas
- [ ] Endpoint `/render/` para páginas de plataformas
- [ ] Caché de HTML generado (Redis o filesystem)
- [ ] Más templates HTML con contenido más rico (no solo título y descripción)

### En web/ (frontend)
- [ ] Instalar y configurar React Router
- [ ] Crear todas las páginas de contenido
- [ ] Implementar cliente API
- [ ] Componentes SEO dinámicos
- [ ] Build de producción y deploy

## Consideraciones SEO

### Metadata que ya genera la API
- ✅ Title optimizado
- ✅ Description
- ✅ OG Tags (title, description, image, type, url, locale)
- ✅ Twitter Cards
- ✅ Canonical URL
- ✅ JSON-LD (Movie, TVSeries, Article, ItemList)

### Internal Linking
- Asegurar que el frontend incluya enlaces a:
  - Páginas de géneros desde películas
  - Películas relacionadas
  - Actores/directores
  - Artículos relacionados
- Esto ayuda a Google a descubrir y crawlear tu sitio

### URLs Multiidioma
- Español: `/pelicula/inception`, `/genero/accion`
- Inglés: `/movie/inception`, `/genre/action`
- La API normaliza automáticamente en `botMiddleware`

## Optimización de Performance

### Caching
- **HTML generado**: Cachear por 1 hora en Cloudflare
- **JSON API**: Cachear por 5 minutos
- **Assets estáticos**: Cachear por 1 año
- **Supabase queries**: Considerar Redis para caché de BD

### Imágenes
- Usar WebP cuando sea posible
- Lazy loading en el frontend
- Optimizar tamaños con Cloudflare Image Resizing

## Testing de Bot Behavior

### Probar localmente con curl
```bash
# Probar como Googlebot (debería recibir HTML)
curl -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
  http://localhost:3000/pelicula/inception

# Probar como usuario normal (debería recibir SPA)
curl http://localhost:5173/pelicula/inception
```

### Herramientas de Testing
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Google Search Console**: Monitoreo de indexación
- **Screaming Frog**: Crawlear sitio como bot

## Referencias

- Documentación existente en `api-control/`
- `api-control/src/middleware/bot.middleware.ts` - Lógica de detección de bots
- `api-control/src/routes/render.routes.ts` - Generación de HTML
- `api-control/src/routes/sitemap.routes.ts` - Sitemaps
- `api-control/src/middleware/locale.middleware.ts` - Detección de idioma
