# Sistema i18n de Vimovies

Sistema de internacionalización (i18n) completo para Vimovies con soporte para español e inglés, utilizando Zustand para gestión de estado y lazy loading de traducciones.

## 📁 Estructura

```
src/lib/i18n/
├── README.md                 # Este documento
├── I18nProvider.tsx          # Provider React para inicializar i18n
├── content.ts                # Helpers para contenido dinámico (API)
├── i18n.ts                   # Motor de traducción central
└── locales/                  # Archivos de traducción JSON
    ├── es/
    │   └── index.json       # Traducciones en español
    └── en/
        └── index.json       # Traducciones en inglés

src/
├── store/
│   └── locate.store.ts      # Store Zustand para gestión de idioma
├── types/
│   └── i18n.types.ts        # Tipos TypeScript para i18n
└── utils/
    └── locate.ts            # Detección de idioma (client/server)
```

## 🎯 Características

- **Soporte multi-idioma**: Español (es) e Inglés (en)
- **Lazy loading**: Carga de traducciones bajo demanda
- **Dot notation**: Acceso a claves anidadas con autocompletado
- **Interpolación**: Variables en traducciones `{{variable}}`
- **Pluralización**: Soporte para singular/plural automáticamente
- **Persistencia**: Guarda preferencia en localStorage y cookie
- **Detección automática**: Detecta idioma del navegador o servidor
- **Fallback**: Si falta una clave en inglés, usa español
- **TypeScript**: Totalmente tipado con autocompletado

## 🚀 Inicialización

### 1. Envolver la app con I18nProvider

En `App.tsx`:

```tsx
import { I18nProvider } from "@/lib/i18n/I18nProvider"

export default function App() {
  return (
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  )
}
```

### 2. Detección automática

El `I18nProvider` detecta automáticamente el idioma:
1. **Cookie** `locale` (si existe)
2. **Navigator language** del navegador
3. **Fallback** a español por defecto

## 📖 Uso en Componentes

### Hook principal: `useI18n()`

```tsx
import { useI18n } from "@/store/locate.store"

export function MyComponent() {
  const { t, locale, setLocale, isLoading } = useI18n()

  if (isLoading) return <div>Cargando idioma...</div>

  return (
    <div>
      <h1>{t("app.title")}</h1>
      <p>{t("app.subtitle")}</p>
      
      <button onClick={() => setLocale("en")}>English</button>
      <button onClick={() => setLocale("es")}>Español</button>
    </div>
  )
}
```

### Selectores específicos

Para evitar re-renders innecesarios:

```tsx
import { useLocale, useT, useSetLocale } from "@/store/locate.store"

export function MyComponent() {
  const locale = useLocale()           // Solo el idioma
  const t = useT()                     // Solo la función t()
  const setLocale = useSetLocale()     // Solo la acción
}
```

### Interpolación de variables

```tsx
// En el JSON:
// "movie.info.runtime": "{{minutes}} min"

t("movie.info.runtime", { minutes: 120 })
// → "120 min"
```

### Pluralización automática

```tsx
// En el JSON:
// "search.results": "{{count}} resultado para \"{{query}}\""
// "search.results_plural": "{{count}} resultados para \"{{query}}\""

t("search.results", { count: 1, query: "Inception" })
// → "1 resultado para "Inception""

t("search.results", { count: 5, query: "Inception" })
// → "5 resultados para "Inception""
```

## 🎨 Helper para contenido dinámico (API)

El helper `useLocalizedContent()` en `content.ts` facilita la localización de datos que vienen de la API (películas, géneros, etc.):

```tsx
import { useLocalizedContent } from "@/lib/i18n/content"

export function MoviePage() {
  const { getMediaTitle, getMediaSynopsis, getMediaPath, locale } = useLocalizedContent()

  return (
    <div>
      <h1>{getMediaTitle(movie)}</h1>
      <p>{getMediaSynopsis(movie)}</p>
      <Link to={getMediaPath(movie)}>Ver más</Link>
    </div>
  )
}
```

### Funciones disponibles:

- `t(es, en)` - Retorna valor según idioma actual
- `getMediaTitle(media)` - Título localizado de película/serie
- `getMediaSynopsis(media)` - Sinopsis localizada
- `getGenreName(genre)` - Nombre de género localizado
- `getGenreDescription(genre)` - Descripción de género localizada
- `getPath(spanishPath, englishPath)` - Path según idioma
- `getMediaPath(media)` - URL de película/serie según idioma

## 🔧 Agregar nuevas traducciones

### 1. Actualizar el tipo

En `src/types/i18n.types.ts`, agrega la clave en la interfaz `TranslationTree`:

```typescript
export interface TranslationTree {
  // ... existing keys
  myNewSection: {
    myKey: string
    anotherKey: string
  }
}
```

### 2. Agregar traducciones

En `src/lib/i18n/locales/es/index.json`:

```json
{
  "myNewSection": {
    "myKey": "Mi texto en español",
    "anotherKey": "Otro texto"
  }
}
```

En `src/lib/i18n/locales/en/index.json`:

```json
{
  "myNewSection": {
    "myKey": "My text in English",
    "anotherKey": "Another text"
  }
}
```

### 3. Usar en componentes

```tsx
const { t } = useI18n()
t("myNewSection.myKey")
```

## 🌐 Cambiar de idioma programáticamente

```tsx
import { useSetLocale } from "@/store/locate.store"

export function LanguageSwitcher() {
  const setLocale = useSetLocale()
  const locale = useLocale()

  return (
    <select 
      value={locale} 
      onChange={(e) => setLocale(e.target.value as "es" | "en")}
    >
      <option value="es">Español</option>
      <option value="en">English</option>
    </select>
  )
}
```

## 📊 Estructura de traducciones

Las traducciones están organizadas por secciones lógicas:

- `app` - Información general de la app
- `common` - Textos comunes reutilizables (acciones, etiquetas, navegación)
- `home` - Página de inicio
- `movie` - Páginas de películas
- `series` - Páginas de series
- `person` - Páginas de personas (actores, directores)
- `genre` - Páginas de géneros
- `platform` - Plataformas de streaming
- `article` - Artículos del blog
- `search` - Búsqueda y filtros
- `where_to_watch` - Dónde ver
- `admin` - Panel de administración
- `errors` - Páginas de error
- `legal` - Páginas legales

## 🔍 Detección de idioma (Server-Side)

Para detección en servidor (Next.js, Hono, Cloudflare Workers):

```typescript
import { detectLocaleFromHeaders } from "@/utils/locate"

// En un server component o API route
const locale = detectLocaleFromHeaders(request.headers, request.url)
// → { language: "es", country: "DO", locale: "es-DO", source: "cf-country", isBot: false, isGooglebot: false }
```

## 💾 Persistencia

El sistema persiste la preferencia de idioma en:

1. **localStorage** (clave: `vimovies_locale`) - Via Zustand persist
2. **Cookie** (clave: `locale`) - Para que el servidor pueda leerla

La cookie tiene expiración de 1 año y se actualiza automáticamente al cambiar de idioma.

## 🛠️ Troubleshooting

### Las traducciones no cargan

Verifica que:
1. El `I18nProvider` envuelve toda la app
2. Los archivos JSON en `locales/` son válidos
3. Las claves en el tipo `TranslationTree` coinciden con los JSON

### TypeScript error: clave no existe

Asegúrate de:
1. Agregar la clave en `src/types/i18n.types.ts`
2. La estructura coincida exactamente con los JSON

### El idioma no cambia

Verifica que:
1. El locale sea uno de los soportados (`"es"` o `"en"`)
2. No haya errores en la consola al cargar el JSON
3. El `isLoading` sea `false` antes de usar `t()`

## 📚 Referencias

- **Store**: `src/store/locate.store.ts` - Zustand store
- **Tipos**: `src/types/i18n.types.ts` - Definiciones TypeScript
- **Motor**: `src/lib/i18n/i18n.ts` - Motor de traducción
- **Detección**: `src/utils/locate.ts` - Detección client/server
