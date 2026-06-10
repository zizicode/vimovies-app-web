/**
 * i18n.types.ts
 * Tipos centrales del sistema de traducción de Vimovies
 */

// ─── Idiomas soportados ────────────────────────────────────────────────────────

export const SUPPORTED_LOCALES = ["es", "en"] as const
export type Locale = typeof SUPPORTED_LOCALES[number]
export const DEFAULT_LOCALE: Locale = "es"

// ─── Estructura del árbol de traducción ───────────────────────────────────────

export interface TranslationTree {
  nav: {
    topbar: {
      links: {
        home: string
        movies: string
        genres: string
        whereToWatch: string
        premieres: string
        blog: string
      }
      actions: {
        changeLanguage: string
        search: string
        searchInput: string
      }
    }
  }

  common: {
    actions: {
      search: string
      clear: string
    }
    labels: {
      results: string
    }
  }

  search: {
    placeholder: string
    results: string
  }

  genre: {
    loading: string
    notFound: string
    error: string
    contentNotFound: string
    allMovies: string
    allMoviesDescription: string
    search: {
      placeholder: string
    }
    pagination: {
      previous: string
      next: string
    }
    results: {
      showing: string
      of: string
      movies: string
    }
    noResults: {
      search: string
      empty: string
    }
  }

  person: {
    loading: string
    notFound: string
    error: string
    biography: string
    born: string
    birthplace: string
    known_for: string
    as_actor: string
    as_director: string
    as_writer: string
    no_movies: string
  }

  article: {
    loading: string
    notFound: string
    error: string
    read_more: string
    published: string
    related: string
  }

  series: {
    loading: string
    notFound: string
    error: string
    seasons: string
    episodes: string
    status: string
    first_air: string
  }

  media: {
    loading: string
    notFound: string
    error: string
    rating: string
    genres: string
    cast: string
    director: string
    trailer: string
    where_to_watch: string
    runtime: string
    release_date: string
    overview: string
    faqs: string
    minutes: string
    votes: string
    streaming: string
    rent: string
    buy: string
    editorial_review: string
  }

  movies: {
    title: string
    search: {
      placeholder: string
    }
    filters: {
      genre: string
      year: string
      sortBy: string
      allGenres: string
      allYears: string
      popularity: string
      releaseDate: string
      rating: string
    }
    error: string
    retry: string
    pagination: {
      previous: string
      next: string
    }
    results: {
      showing: string
      of: string
      movies: string
    }
    noResults: {
      search: string
      empty: string
    }
  }
}

// ─── Tipo helper para acceder a claves anidadas (dot notation) ────────────────

type DotNotation<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends string
    ? Prefix extends "" ? `${string & K}` : `${Prefix}.${string & K}`
    : T[K] extends object
    ? DotNotation<T[K], Prefix extends "" ? `${string & K}` : `${Prefix}.${string & K}`>
    : never
}[keyof T]

export type TranslationKey = DotNotation<TranslationTree>

// ─── Variables de interpolación ───────────────────────────────────────────────
export type InterpolationVars = Record<string, string | number>