# Vimovies UI Style Guide

> Fuente de verdad para el sistema de estilos de Vimovies.  
> Antes de crear o editar cualquier componente, consulta esta guía.

---

## 1. FONDOS — ¿Cuándo usar qué `$bg-*`?

### `$bg-root` (#f5f4f2)
- **Uso:** Fondo de página completa
- **Componentes que lo usan:**
  - `src/pages/Home/home.scss` → `.Home` (línea 7)
  - `src/pages/Home/home.scss` → `.Home__error` (línea 134)
- **Regla:** Es el fondo más claro de la jerarquía, usado solo en el root de la página

### `$bg-surface` (#ffffff)
- **Uso:** Tarjetas, contenedores principales, modales
- **Componentes que lo usan:**
  - `src/components/layout/topbar/topbar.scss` → `.topbar` (línea 8)
  - `src/components/layout/topbar/topbar.scss` → `.side-panel` (línea 190)
  - `src/components/recentArticles/RecentArticles.scss` → `.recent-articles` (línea 4)
  - `src/pages/Home/home.scss` → `.Home__error-content` (línea 140)
  - `src/components/recentArticles/RecentArticles.scss` → `.article-card` (línea 110)
- **Regla:** Para cualquier elemento que necesite resaltar del fondo root

### `$bg-raised` (#faf9f8)
- **Uso:** Inputs, items hover, subpaneles
- **Componentes que lo usan:**
  - `src/components/layout/topbar/topbar.scss` → `.side-panel__search-input` (línea 270)
- **Regla:** Fondo ligeramente más cálido que surface, para elementos interactivos

### `$bg-overlay` (#f0eeec)
- **Uso:** Tooltips, dropdowns, popovers
- **Componentes que lo usan:**
  - No encontrado en los componentes analizados (reservado para futuros componentes)
- **Regla:** Para elementos que flotan sobre surface pero no son modales

### `$bg-deep` (#e8e6e3)
- **Uso:** Separadores, skeleton loaders
- **Componentes que lo usan:**
  - No encontrado directamente, pero `$violet-deep` se usa para fondos oscuros
- **Regla:** Para elementos decorativos o de carga

### `$bg-sunken` (#dedad6)
- **Uso:** Estados desactivados, fondos inactivos
- **Componentes que lo usan:**
  - No encontrado en los componentes analizados
- **Regla:** Para comunicar estado no interactivo

---

## 2. TEXTO — ¿Cuándo usar qué `$text-*`?

### `$text-primary` (#16141f)
- **Uso:** Títulos, body principal, contenido prominente
- **Componentes que lo usan:**
  - `src/components/layout/footer/footer.scss` → `.footer` (línea 6)
  - `src/components/layout/footer/footer.scss` → `.footer__logo span` (línea 53)
  - `src/components/layout/footer/footer.scss` → `.footer__title` (línea 103)
  - `src/components/layout/topbar/topbar.scss` → `.identity em` (línea 57)
  - `src/components/movieTendencies/movieTendencies.scss` → `.tendencies__header h1` (línea 50)
  - `src/components/recentArticles/RecentArticles.scss` → `.recent-articles` (línea 5)
  - `src/components/recentArticles/RecentArticles.scss` → `.article-card__title` (línea 205)
- **Regla:** Para cualquier texto que sea el foco principal de atención

### `$text-secondary` (#4a4660)
- **Uso:** Subtítulos, labels activos, descripciones secundarias
- **Componentes que lo usan:**
  - `src/components/layout/footer/footer.scss` → `.footer__description` (línea 61)
  - `src/components/layout/footer/footer.scss` → `.footer__list a` (línea 120)
  - `src/components/layout/topbar/topbar.scss` → `.side-nav-link` (línea 324)
- **Regla:** Para texto que acompaña al primary pero no es el foco

### `$text-muted` (#8c88a3)
- **Uso:** Metadata, hints, fechas, placeholders
- **Componentes que lo usan:**
  - `src/components/layout/topbar/topbar.scss` → `.side-panel__close` (línea 244)
  - `src/components/layout/topbar/topbar.scss` → `.side-panel__empty span` (línea 314)
  - `src/pages/Home/home.scss` → `.Home__error-content p` (línea 154)
- **Regla:** Para información de apoyo o contexto

### `$text-hint` (#b8b5cc)
- **Uso:** Placeholders, texto decorativo, captions
- **Componentes que lo usan:**
  - `src/components/genreSection/GenreSection.scss` → `.genre-section__count` (línea 47)
  - `src/components/layout/topbar/topbar.scss` → `.side-panel__empty` (línea 304)
  - `src/components/layout/topbar/topbar.scss` → `.side-panel__search-input input::placeholder` (línea 291)
- **Regla:** Para texto muy sutil, casi decorativo

### `$text-disabled` (#ccc9dc)
- **Uso:** Texto desactivado, no interactivo
- **Componentes que lo usan:**
  - `src/components/layout/footer/footer.scss` → `.footer__social a` (línea 79)
- **Regla:** Para comunicar que un elemento no está disponible

### `$text-inverse` (#ffffff)
- **Uso:** Texto sobre fondos violeta o oscuros
- **Componentes que lo usan:**
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-title` (línea 241)
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-btn-primary` (línea 324)
  - `src/components/genreSection/GenreSection.scss` → `.genre-section` (línea 8)
  - `src/components/genreSection/GenreSection.scss` → `.genre-section__title` (línea 40)
  - `src/pages/Home/home.scss` → `.description_home` (línea 16)
- **Regla:** Solo sobre fondos oscuros (#0b0a10, $violet-deep, etc.)

### ⚠️ REGLA CRÍTICA: NUNCA usar `$gold-*` como texto
- **Por qué:** Gold es un color decorativo, no tiene suficiente contraste para lectura
- **Alternativa correcta:** Usar `$violet-soft` o `$text-primary` con iconos gold
- **Ejemplo correcto:** En `src/components/headerMovie/HeaderMovie.scss` línea 225, el badge de rating usa `color: $gold-soft` pero es un elemento decorativo, no texto de lectura

---

## 3. VIOLETA — ¿Cuándo usar qué nivel de la escala?

### `$violet-ghost` (#f9f2ff) / `$violet-bg` (#f4e8fe)
- **Uso:** Fondos sutiles de highlight, badges, secciones destacadas
- **Componentes que lo usan:**
  - `src/components/layout/topbar/topbar.scss` → `.side-panel__close:hover` (línea 249)
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-gradient` (línea 93) - como overlay
- **Regla:** Para fondos muy sutiles que necesitan un toque violeta

### `$violet-pale` (#e8c8fd) / `$violet-soft` (#c96dfa)
- **Uso:** Bordes violeta suaves, iconos, indicadores
- **Componentes que lo usan:**
  - `src/components/layout/topbar/topbar.scss` → `.action-btn` (línea 120, 122)
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-badge--genre` (línea 215)
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-title span` (línea 247)
- **Regla:** Para elementos que necesitan presencia violeta sin ser el foco principal

### `$violet` (#950FF5) / `$violet-mid` (#aa2ff7)
- **Uso:** CTAs, botones primarios, links, CTA principal
- **Componentes que lo usan:**
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-btn-primary` (línea 323)
  - `src/components/layout/footer/footer.scss` → `.footer__social a:hover` (línea 84)
  - `src/components/layout/footer/footer.scss` → `.footer__list a:hover` (línea 124)
  - `src/components/recentArticles/RecentArticles.scss` → `.recent-articles__view-all` (línea 85)
  - `src/components/movieGrid/MovieGrid.scss` → `.movie-grid__btn-more` (línea 100)
  - `$violet-mid` usado en hover de botones (línea 337 en HeaderMovie)
- **Regla:** El color primario de la marca, para acciones principales

### `$violet-rich` (#7c0dcc) / `$violet-deep` (#6b08b0)
- **Uso:** Estados activos, fondos de navegación, texto sobre fondos claros
- **Componentes que lo usan:**
  - `src/components/layout/topbar/topbar.scss` → `.identity em span` (línea 60)
  - `src/components/layout/topbar/topbar.scss` → `.nav-bar` (línea 69) - fondo de navegación
  - `src/components/layout/footer/footer.scss` → `.footer__bottom` (línea 142)
  - `src/components/genreSection/GenreSection.scss` → `.genre-section` (línea 10)
- **Regla:** Para estados más intensos o fondos oscuros con identidad violeta

### `$violet-hover-bg` (rgba(149, 15, 245, 0.06))
- **Uso:** Hover de nav items, elementos interactivos
- **Componentes que lo usan:**
  - `src/components/layout/topbar/topbar.scss` → `.side-nav-link:hover` (línea 333)
- **Regla:** Para hovers sutiles sobre fondos claros

### `$violet-active-bg` (rgba(149, 15, 245, 0.10))
- **Uso:** Active / selected backgrounds
- **Componentes que lo usan:**
  - `src/components/layout/topbar/topbar.scss` → `.side-nav-link.active` (línea 338)
- **Regla:** Para indicar selección activa

### `$violet-focus-ring` (rgba(149, 15, 245, 0.18))
- **Uso:** Focus de inputs, anillos de foco
- **Componentes que lo usan:**
  - `src/components/layout/topbar/topbar.scss` → `.side-panel__search-input:focus-within` (línea 278)
  - `src/components/genreSection/GenreFilterControls.scss` → `&:focus` (línea 54)
- **Regla:** Para accesibilidad, siempre acompañar con `outline: none`

### Bordes violeta (`$border-violet-*`)
- **`$border-violet` (rgba(149, 15, 245, 0.20)):** Borde suave
  - `src/components/layout/topbar/topbar.scss` → `.action-btn:hover` (línea 133)
- **`$border-violet-default` (rgba(149, 15, 245, 0.30)):** Borde visible
  - No encontrado en componentes analizados
- **`$border-violet-strong` (rgba(149, 15, 245, 0.50)):** Borde énfasis, focus
  - No encontrado en componentes analizados
- **`$border-violet-active` (rgba(149, 15, 245, 0.70)):** Borde activo, selected
  - No encontrado en componentes analizados
- **Regla:** Escalar según la necesidad de visibilidad del borde

---

## 4. GOLD — Reglas de uso decorativo

### Componentes donde aparece:
- **`src/components/headerMovie/HeaderMovie.scss`** → `.hm-badge--rating` (línea 224-227)
  - Usado para badge de rating con fondo `rgba($gold, 0.14)` y texto `$gold-soft`
- **`src/components/movieTendencies/movieTendencies.scss`** → `.populary` (línea 157)
  - Usado para badge de popularidad (aunque con un color hardcodeado `rgba(139, 92, 246, 0.9)` que debería ser violeta)

### Reglas de uso:
1. **SOLO para elementos decorativos:** ratings, estrellas, iconos destacados, barras de popularidad
2. **NUNCA como texto principal:** Gold no tiene suficiente contraste para lectura
3. **Usar con fondos oscuros:** Gold resiste mejor sobre fondos oscuros que sobre claros
4. **Variantes:**
   - `$gold`: Base para iconos y bordes
   - `$gold-soft`: Para texto decorativo muy grande o sobre fondos oscuros
   - `$gold-pale`: Fondos de badges
   - `$gold-bg`: Fondos tenues de stat cards

### Ejemplo de qué hacer en su lugar:
```scss
// ❌ INCORRECTO - Gold como texto
.rating-text {
  color: $gold; // No legible
}

// ✅ CORRECTO - Violeta como texto, gold como decoración
.rating-badge {
  background: rgba($gold, 0.14);
  color: $gold-soft; // Solo en elementos muy grandes o decorativos
  border: 1px solid rgba($gold, 0.28);
}

// ✅ MEJOR - Texto violeta, icono gold
.rating-item {
  color: $violet-soft;
  .icon {
    color: $gold;
  }
}
```

---

## 5. SOMBRAS — ¿Cuándo escalar la sombra?

### `$shadow-sm`
- **Uso:** Hover de items, elementos flotantes pequeños
- **Componentes que lo usan:**
  - No encontrado en componentes analizados (posiblemente en componentes más pequeños)
- **Regla:** Para elevación sutil, casi imperceptible

### `$shadow-md`
- **Uso:** Cards en reposo, elementos con elevación moderada
- **Componentes que lo usan:**
  - No encontrado directamente en los componentes analizados
- **Regla:** Para elementos que necesitan separarse del fondo sin ser dramáticos

### `$shadow-lg` / `$shadow-xl`
- **Uso:** Cards en hover, dropdowns, modales
- **Componentes que lo usan:**
  - `src/pages/Home/home.scss` → `.Home__error-content` (línea 142)
  - `src/components/genreSection/GenreSlider.scss` → `&__scroll-btn` (línea 24)
- **Regla:** Para elementos que necesitan destacarse claramente

### `$shadow-violet`
- **Uso:** Botones primarios violeta, CTAs, elementos con identidad de marca
- **Componentes que lo usan:**
  - `src/components/genreSection/GenreSection.scss` → `.genre-section__nav:hover` (línea 209)
- **Regla:** Solo para elementos violeta que necesitan glow de marca

### `$shadow-violet-lg`
- **Uso:** Elementos violeta con elevación dramática
- **Componentes que lo usan:**
  - No encontrado en componentes analizados
- **Regla:** Para CTAs muy prominentes o hero elements

---

## 6. RADIOS — ¿Qué radio para qué elemento?

### `$radius-xs` (3px)
- **Uso:** kbd, scrollbar thumb
- **Componentes que lo usan:**
  - No encontrado en componentes analizados
- **Regla:** Para elementos muy pequeños

### `$radius-sm` (4px)
- **Uso:** Poster thumbnails, small chips, elementos pequeños
- **Componentes que lo usan:**
  - `src/components/genreSection/GenreSlider.scss` → `&__badge` (línea 140)
- **Regla:** Para elementos que necesitan ser suaves pero no prominentes

### `$radius-md` (6px)
- **Uso:** Botones, inputs, nav items, badges
- **Componentes que lo usan:**
  - `src/components/layout/topbar/topbar.scss` → `.action-btn` (línea 119)
  - `src/components/layout/topbar/topbar.scss` → `.nav-link` (línea 90)
  - `src/components/layout/topbar/topbar.scss` → `.side-panel__close` (línea 241)
  - `src/components/layout/topbar/topbar.scss` → `.side-nav-link` (línea 327)
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-btn-primary` (línea 326)
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-btn-ghost` (línea 356)
  - `src/components/genreSection/GenreFilterControls.scss` → `&__input` (línea 34)
  - `src/components/genreSection/GenreFilterControls.scss` → `&__results-count` (línea 123)
  - `src/pages/Home/home.scss` → `.Home__retry-btn` (línea 164)
- **Regla:** El radio estándar para elementos interactivos

### `$radius-lg` (10px)
- **Uso:** Cards, panels, stat cards, posters en mobile
- **Componentes que lo usan:**
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-poster-wrap` (línea 123) - desktop
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-poster-wrap` (línea 170) - mobile
  - `src/components/movieGrid/MovieGrid.scss` → `.movie-grid__item` (línea 38)
  - `src/components/movieTendencies/movieTendencies.scss` → `.item_movies` (línea 118)
  - `src/components/recentArticles/RecentArticles.scss` → `.article-card__badge` (línea 160)
- **Regla:** Para contenedores de contenido y tarjetas

### `$radius-xl` (14px)
- **Uso:** Modales, hero sections, posters en desktop
- **Componentes que lo usan:**
  - `src/pages/Home/home.scss` → `.Home__error-content` (línea 141)
  - `src/pages/Home/home.scss` → `.Home__skeleton-poster` (línea 86)
- **Regla:** Para elementos grandes y prominentes

### `$radius-2xl` (20px)
- **Uso:** Imagen de película en detalle, cards muy grandes
- **Componentes que lo usan:**
  - `src/components/recentArticles/RecentArticles.scss` → `.article-card` (línea 111)
  - `src/components/recentArticles/RecentArticles.scss` → `.article-card-skeleton` (línea 254)
- **Regla:** Para elementos que necesitan ser muy suaves y modernos

### `$radius-full` (999px)
- **Uso:** Pills, avatars, tags redondeados, botones de acción pill
- **Componentes que lo usan:**
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-badge` (línea 209)
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-plat-chip` (línea 456)
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-controls` (línea 493)
  - `src/components/genreSection/GenreSection.scss` → `.genre-section__genre` (línea 114)
  - `src/components/genreSection/GenreSection.scss` → `.genre-section__nav` (línea 189)
  - `src/components/genreSection/GenreFilterControls.scss` → `&__input` (línea 34)
  - `src/components/genreSection/GenreFilterControls.scss` → `&__clear-btn` (línea 83)
  - `src/components/movieGrid/MovieGrid.scss` → `.movie-grid__btn-more` (línea 106)
  - `src/components/recentArticles/RecentArticles.scss` → `.recent-articles__view-all` (línea 89)
- **Regla:** Para elementos que necesitan ser completamente redondeados

---

## 7. TIPOGRAFÍA — Cuándo usar cada tamaño y peso

### Títulos de sección
- **Tamaños:** `$font-size-8xl` (40px), `$font-size-3xl` (20px), `$font-size-2xl` (18px)
- **Pesos:** `$font-weight-extrabold` (800), `$font-weight-bold` (700)
- **Familia:** `$font-display` (Syne)
- **Componentes:**
  - `src/components/genreSection/GenreSection.scss` → `.genre-section__title` (línea 36): `$font-size-8xl`, `$font-weight-extrabold`, `$font-display`
  - `src/components/movieTendencies/movieTendencies.scss` → `.tendencies__header h1` (línea 48): `2.2rem` (hardcodeado, debería ser `$font-size-5xl`), `$text-primary`
  - `src/components/recentArticles/RecentArticles.scss` → `.recent-articles h1` (línea 49): `3.5rem`, `$font-display`, `$font-weight-extrabold`
  - `src/pages/Home/home.scss` → `.Home__error-content h3` (línea 148): `$font-size-2xl`, `$font-display`, `$text-primary`

### Subtítulos
- **Tamaños:** `$font-size-xl` (15px), `$font-size-base` (14px)
- **Pesos:** `$font-weight-bold` (700), `$font-weight-semibold` (600)
- **Familia:** `$font-display` o `$font-body`
- **Componentes:**
  - `src/components/layout/footer/footer.scss` → `.footer__title` (línea 101): `$font-size-xl`, `$font-weight-bold`, `$font-display`
  - `src/components/recentArticles/RecentArticles.scss` → `.recent-articles__subtitle` (línea 31): `0.9rem`, `$font-weight-bold`, `$violet`

### Body / descripción
- **Tamaños:** `$font-size-body` (13.5px), `$font-size-base` (14px), `$font-size-lg` (15px)
- **Pesos:** `$font-weight-regular` (400)
- **Familia:** `$font-body` (DM Sans)
- **Componentes:**
  - `src/components/layout/footer/footer.scss` → `.footer__description` (línea 59): `$font-size-body`, `$text-secondary`, `$font-body`
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-synopsis` (línea 285): `$font-size-base`, `rgba(255, 255, 255, 0.58)`
  - `src/components/recentArticles/RecentArticles.scss` → `.article-card__excerpt` (línea 216): `1.05rem`, `#555` (hardcodeado)

### Labels, metadata, hints
- **Tamaños:** `$font-size-xs` (11px), `$font-size-sm` (12px), `$font-size-xs` (11px)
- **Pesos:** `$font-weight-semibold` (600), `$font-weight-bold` (700), `$font-weight-medium` (500)
- **Familia:** `$font-body`
- **Componentes:**
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-meta-item` (línea 266): `$font-size-sm`, `$font-weight-semibold`
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-plat-lbl` (línea 443): `10px` (hardcodeado, debería ser `$font-size-xs`), `$font-weight-bold`
  - `src/components/recentArticles/RecentArticles.scss` → `.article-card__meta` (línea 189): `0.85rem`, `$font-weight-medium`

### `$font-display` vs `$font-body`
- **`$font-display` (Syne):** Usado para:
  - Títulos principales
  - Logos
  - Encabezados de sección
  - Elementos que necesitan personalidad y protagonismo
- **`$font-body` (DM Sans):** Usado para:
  - Texto de cuerpo
  - Labels
  - Metadata
  - Navegación
  - Cualquier texto de lectura prolongada

---

## 8. ESPACIADO — Patrón de padding/gap por tipo de elemento

### Cards (padding interno)
- **Valores típicos:** `$space-8` (16px) a `$space-12` (24px)
- **Componentes:**
  - `src/components/recentArticles/RecentArticles.scss` → `.article-card__body` (línea 179): `2.5rem` (hardcodeado, debería ser `$space-12` o `$space-14`)
  - `src/components/recentArticles/RecentArticles.scss` → `.article-card__badge` (línea 159): `0.5rem 1.25rem`

### Secciones de página (padding vertical)
- **Valores típicos:** `$space-14` (28px) a `$space-16` (32px) o más
- **Componentes:**
  - `src/components/genreSection/GenreSection.scss` → `.genre-section` (línea 7): `$space-14 0 $space-10`
  - `src/components/recentArticles/RecentArticles.scss` → `.recent-articles` (línea 3): `6rem` (hardcodeado, debería ser `$space-24`)
  - `src/components/movieTendencies/movieTendencies.scss` → `.tendencies` (línea 13): `2rem` (hardcodeado, debería ser `$space-8`)

### Grids de películas (gap)
- **Valores típicos:** `$space-3` (6px) a `$space-6` (12px)
- **Componentes:**
  - `src/components/movieGrid/MovieGrid.scss` → `.movie-grid` (línea 26): `1rem` (hardcodeado, debería ser `$space-4`)
  - `src/components/movieGrid/MovieGrid.scss` → `.movie-grid` (línea 30): `1.5rem` (desktop, hardcodeado, debería ser `$space-6`)
  - `src/components/movieTendencies/movieTendencies.scss` → `.container_movie` (línea 101): `1.5rem` (hardcodeado)
  - `src/components/recentArticles/RecentArticles.scss` → `.recent-articles__grid` (línea 66): `2.5rem` (hardcodeado, debería ser `$space-10`)

### Nav items
- **Valores típicos:** `$space-2` (4px) a `$space-4` (8px) padding, `$space-2` (4px) gap
- **Componentes:**
  - `src/components/layout/topbar/topbar.scss` → `.nav-link` (línea 89): `$space-2 $space-4`
  - `src/components/layout/topbar/topbar.scss` → `.side-nav-link` (línea 326): `$space-4 $space-5`
  - `src/components/genreSection/GenreSection.scss` → `.genre-section__genre` (línea 115): `$space-3 $space-6`

### Botones
- **Valores típicos:** `$btn-padding-y` (8px) y `$btn-padding-x` (16px)
- **Componentes:**
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-btn-primary` (línea 327): `10px 20px`
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-btn-ghost` (línea 357): `9px 18px`
  - `src/pages/Home/home.scss` → `.Home__retry-btn` (línea 160): `0.8rem 2.5rem`
  - `src/components/recentArticles/RecentArticles.scss` → `.recent-articles__view-all` (línea 88): `1.25rem 3rem`

---

## 9. TRANSICIONES — Cuándo usar qué velocidad

### `$transition-speed-fast` (0.10s)
- **Uso:** Cambios de color rápidos, hover de texto
- **Componentes que lo usan:**
  - Definido en variables pero no encontrado directamente en componentes analizados
- **Regla:** Para cambios que necesitan ser instantáneos

### `$transition-speed-default` (0.12s)
- **Uso:** Transiciones estándar de UI
- **Componentes que lo usan:**
  - `src/components/layout/topbar/topbar.scss` → `.action-btn` (línea 124)
  - `src/components/layout/topbar/topbar.scss` → `.side-nav-link` (línea 328)
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-btn-primary` (línea 333)
  - `src/components/genreSection/GenreSection.scss` → `.genre-section__genre` (línea 128-133)
- **Regla:** Para la mayoría de las transiciones de UI

### `$transition-speed-medium` (0.15s)
- **Uso:** Cambios de opacity, shadow, transform
- **Componentes que lo usan:**
  - Definido en variables pero usado principalmente a través de `$transition-opacity`, `$transition-shadow`, `$transition-transform`
- **Regla:** Para transiciones que necesitan ser perceptibles pero no lentas

### `$transition-speed-slow` (0.20s)
- **Uso:** Animaciones complejas, transiciones de layout
- **Componentes que lo usan:**
  - `src/components/headerMovie/HeaderMovie.scss` → `.hm-slide` (línea 26): `0.85s` (hardcodeado, para transición de slide)
- **Regla:** Para animaciones de entrada/salida o cambios de layout significativos

### Transiciones compuestas predefinidas:
- **`$transition-default`:** `all $transition-speed-default $transition-easing-default`
- **`$transition-bg`:** `background-color $transition-speed-fast $transition-easing-default`
- **`$transition-border`:** `border-color $transition-speed-default $transition-easing-default`
- **`$transition-color`:** `color $transition-speed-fast $transition-easing-default`
- **`$transition-opacity`:** `opacity $transition-speed-medium $transition-easing-default`
- **`$transition-shadow`:** `box-shadow $transition-speed-medium $transition-easing-default`
- **`$transition-transform`:** `transform $transition-speed-medium $transition-easing-out`

---

## 10. BREAKPOINTS — Patrón de responsive del proyecto

### Breakpoints definidos:
- **`$bp-xs`:** 480px
- **`$bp-sm`:** 640px
- **`$bp-md`:** 768px
- **`$bp-lg`:** 1024px
- **`$bp-xl`:** 1280px
- **`$bp-2xl`:** 1440px

### Patrón de responsive:
- **Enfoque:** Desktop-first (media queries `max-width`)
- **Breakpoints más usados:**
  - `$bp-md` (768px) - Tablet/mobile boundary
  - `$bp-sm` (640px) - Mobile
  - `$bp-lg` (1024px) - Desktop grande

### Ejemplos de uso:
```scss
// Footer - 3 breakpoints
@media (max-width: $bp-lg) { grid-template-columns: 1fr 1fr; }
@media (max-width: $bp-sm) { grid-template-columns: 1fr; }

// Topbar - breakpoint personalizado
$panel-breakpoint: 510px;
@media (max-width: $panel-breakpoint) { display: flex; }

// Home - tablet breakpoint
@media (max-width: $bp-md) { flex-direction: column; }

// RecentArticles - 2 breakpoints
@media (max-width: $bp-lg) { grid-template-columns: repeat(2, 1fr); }
@media (max-width: $bp-sm) { grid-template-columns: 1fr; }
```

### Recomendación:
- Usar siempre las variables `$bp-*` en lugar de valores numéricos hardcodeados
- Seguir el patrón desktop-first (max-width) para consistencia
- Considerar agregar breakpoint `$panel-breakpoint` (510px) a variables.scss si se usa en múltiples lugares

---

## 11. LAYOUT PATTERNS

### Contenedores principales
- **Patrón:**
  ```scss
  max-width: $content-max-w; // 1200px
  margin: 0 auto;
  padding: 0 $view-padding; // 28px
  ```
- **Componentes que lo usan:**
  - `src/components/layout/footer/footer.scss` → `.footer__container` (línea 9-11)
  - `src/components/layout/topbar/topbar.scss` → `.content_topbar` (línea 23-25)
  - `src/components/genreSection/GenreSection.scss` → `.genre-section__container` (línea 16-18)

### Grids
- **Patrón de grids de películas:**
  - Mobile: 2 columnas
  - Desktop: auto-fill con minmax(180px, 1fr)
- **Componentes:**
  - `src/components/movieGrid/MovieGrid.scss` → `.movie-grid` (línea 25-31)

### Flex patterns
- **Horizontal con gap:** Muy común para alinear elementos
- **Vertical con gap:** Para stacks de contenido
- **Center alignment:** Para headers y hero sections

---

## ⚠️ Inconsistencias encontradas

### Colores hardcodeados en lugar de variables:

1. **`src/components/movieGrid/MovieGrid.scss`**
   - Línea 3: `$violet-primary: #8b5cf6;` → Debería usar `$violet` (#950FF5)
   - Línea 4: `$violet-hover: #7c3aed;` → Debería usar `$violet-mid` (#aa2ff7)
   - Línea 5: `$bg-card-dark: #1e293b;` → Debería usar una variable de fondo oscuro
   - Línea 40: `background-color: $bg-card-dark;` → Variable local no estándar
   - Línea 80: `color: #ffffff;` → Debería usar `$text-inverse`
   - Línea 100: `background-color: $violet-primary;` → Variable local
   - Línea 112: `background-color: $violet-hover;` → Variable local

2. **`src/components/movieTendencies/movieTendencies.scss`**
   - Línea 2: `$content-max-w: 1200px;` → Ya existe en variables.scss
   - Línea 3: `$view-padding: 0 2rem;` → Ya existe en variables.scss como `$view-padding: 28px;`
   - Línea 4: `$font-weight-semibold: 600;` → Ya existe en variables.scss
   - Línea 5: `$background-card: black;` → Debería usar variable estándar
   - Línea 48: `font-size: 2.2rem;` → Debería usar `$font-size-5xl` (24px) o similar
   - Línea 121: `box-shadow: 0 10px 20px $border-violet;` → Incorrecto, `$border-violet` es un color de borde, no sombra
   - Línea 157: `background: rgba(139, 92, 246, 0.9);` → Hardcodeado, debería usar `$violet` con opacidad
   - Línea 207-212: Gradiente con colores hardcodeados → Debería usar variables
   - Línea 227: `color: #d1d5db;` → Debería usar `$text-muted` o similar
   - Línea 241: `color: #a3a3a3;` → Debería usar `$text-muted`

3. **`src/components/genreSection/GenreSection.scss`**
   - Línea 10: `background-color: #0b0a10;` → Hardcodeado, debería usar variable de fondo oscuro
   - Línea 80: `background: linear-gradient(to left, $violet-deep transparent);` → Sintaxis incorrecta, falta coma

4. **`src/components/genreSection/GenreFilterControls.scss`**
   - Línea 32: `background: rgba(0, 0, 0, 0.5);` → Hardcodeado
   - Línea 52: `background: rgba(0, 0, 0, 0.7);` → Hardcodeado
   - Línea 54: `border-color: rgba(149, 15, 245, 0.5);` → Debería usar `$border-violet-strong`
   - Línea 81: `background: rgba(255, 255, 255, 0.15);` → Hardcodeado

5. **`src/components/recentArticles/RecentArticles.scss`**
   - Línea 51: `color: #1a1921;` → Debería usar `$text-primary`
   - Línea 97: `background: darken($violet, 10%);` → Debería usar `$violet-rich` o `$violet-deep`
   - Línea 113: `border: 1px solid rgba(0, 0, 0, 0.06);` → Debería usar `$border-subtle`
   - Línea 190: `color: #777;` → Debería usar `$text-muted` o `$text-secondary`
   - Línea 205: `color: #1a1921;` → Debería usar `$text-primary`
   - Línea 218: `color: #555;` → Debería usar `$text-secondary`
   - Línea 229: `border-top: 1px solid rgba(0, 0, 0, 0.05);` → Debería usar `$border-subtle`
   - Línea 238: `color: #1a1921;` → Debería usar `$text-primary`
   - Línea 251: `background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);` → Debería usar variables de fondo

6. **`src/components/headerMovie/HeaderMovie.scss`**
   - Línea 15: `background-color: #08070f;` → Hardcodeado, debería usar variable de fondo oscuro
   - Línea 43-44: Sombras hardcodeadas con `rgba(139, 92, 246, 0.5)` → Debería usar `$violet` con opacidad
   - Línea 64: `filter: blur(80px) brightness(0.22) saturate(1);` → Valores hardcodeados
   - Línea 76-89: Gradientes con colores hardcodeados → Deberían usar variables

7. **`src/pages/Home/home.scss`**
   - Línea 15: `background-color: $violet-deep;` → Correcto uso de variable
   - Línea 48: `background: #0b0a10;` → Hardcodeado, debería usar variable de fondo oscuro
   - Línea 64: `background: linear-gradient(90deg, #1a1a24 0%, #252535 50%, #1a1a24 100%);` → Hardcodeado

### Sombras o radios sin variables:
- La mayoría de los componentes usan correctamente `$shadow-*` y `$radius-*`
- Excepciones menores con valores numéricos en media queries personalizados

### Breakpoints con valores numéricos:
- `src/components/layout/topbar/topbar.scss`: `$panel-breakpoint: 510px;` (línea 3) → Debería agregarse a variables.scss
- `src/components/movieGrid/MovieGrid.scss`: `@media (min-width: 500px)` (línea 28) → Debería usar `$bp-sm` (640px) o definir un breakpoint específico

### Valores de espaciado hardcodeados:
- Muchos componentes usan valores en `rem` o `px` en lugar de `$space-*`
- Ejemplos: `padding: 2rem`, `gap: 1.5rem`, `margin: 0 auto` con valores numéricos

---

## Recomendaciones para futuros componentes:

1. **Siempre usar variables de colores:** Nunca hardcodear valores hexadecimales
2. **Usar variables de espaciado:** Reemplazar `rem` y `px` por `$space-*`
3. **Usar variables de breakpoints:** Reemplazar valores numéricos por `$bp-*`
4. **Seguir el patrón desktop-first:** Usar `max-width` en media queries
5. **Usar transiciones predefinidas:** Preferir `$transition-*` sobre valores custom
6. **Usar sombras predefinidas:** Preferir `$shadow-*` sobre custom box-shadow
7. **Usar radios predefinidos:** Preferir `$radius-*` sobre valores numéricos
8. **Validar contraste de Gold:** Nunca usar gold como texto principal
9. **Usar `$text-inverse` sobre fondos oscuros:** En lugar de `#ffffff` hardcodeado
10. **Documentar excepciones:** Si es necesario usar un valor hardcodeado, agregar comentario explicando por qué
