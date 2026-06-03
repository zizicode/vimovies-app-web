/**
 * i18n.types.ts
 * Tipos centrales del sistema de traducción de Vimovies
 */

// ─── Idiomas soportados ────────────────────────────────────────────────────────

export const SUPPORTED_LOCALES = ["es", "en"] as const
export type Locale = typeof SUPPORTED_LOCALES[number]
export const DEFAULT_LOCALE: Locale = "es"

// ─── Estructura del árbol de traducción ───────────────────────────────────────
// Refleja exactamente el shape de los JSON en /locales/es/ y /locales/en/

export interface TranslationTree {
  app: {
    title: string
    subtitle: string
    language: string
    country: string
    locale: string
    welcome: string
    change_language: string
  }

  common: {
    actions: {
      search: string
      filter: string
      clear: string
      close: string
      back: string
      share: string
      save: string
      cancel: string
      confirm: string
      load_more: string
      see_all: string
      copy_link: string
    }
    labels: {
      year: string
      duration: string
      genre: string
      rating: string
      platform: string
      language: string
      country: string
      director: string
      cast: string
      synopsis: string
      trailer: string
      score: string
    }
    nav: {
      home: string
      movies: string
      series: string
      genres: string
      platforms: string
      articles: string
      rankings: string
      where_to_watch: string
      search: string
    }
    meta: {
      site_name: string
      tagline: string
    }
    states: {
      loading: string
      error: string
      empty: string
      no_results: string
    }
  }

  home: {
    hero: {
      title: string
      subtitle: string
      search_placeholder: string
    }
    sections: {
      trending: string
      new_releases: string
      popular_genres: string
      featured_rankings: string
      editors_pick: string
    }
  }

  movie: {
    meta: {
      title: string           // "{{title}} ({{year}}) — Vimovies"
      description: string     // "Descubre dónde ver {{title}}..."
    }
    sections: {
      where_to_watch: string
      similar: string
      reviews: string
      faqs: string
      cast: string
      crew: string
      trailers: string
    }
    info: {
      original_title: string
      release_date: string
      runtime: string
      year: string
      budget: string
      revenue: string
      status: string
      production: string
    }
    status: {
      released: string
      in_production: string
      post_production: string
      rumored: string
    }
    watch: {
      streaming: string
      rent: string
      buy: string
      free: string
      not_available: string
    }
  }

  series: {
    meta: {
      title: string
      description: string
    }
    sections: {
      seasons: string
      episodes: string
      where_to_watch: string
      similar: string
      cast: string
    }
    info: {
      seasons_count: string    // "{{count}} temporada" / "{{count}} temporadas"
      episodes_count: string
      episode_runtime: string
      network: string
      status: string
    }
    status: {
      airing: string
      ended: string
      canceled: string
      pilot: string
    }
  }

  person: {
    meta: {
      title: string
      description: string
    }
    sections: {
      biography: string
      filmography: string
      known_for: string
      awards: string
    }
    labels: {
      born: string
      birthplace: string
      died: string
      age: string
      department: string
    }
  }

  genre: {
    meta: {
      title: string           // "Mejores películas de {{genre}} — Vimovies"
      description: string
    }
    labels: {
      movies_in_genre: string  // "{{count}} películas de {{genre}}"
      filter_by: string
    }
  }

  platform: {
    meta: {
      title: string
      description: string
    }
    sections: {
      available: string
      catalog: string
    }
    labels: {
      subscribe: string
      visit: string
      price_from: string
    }
  }

  article: {
    meta: {
      title: string
      description: string
    }
    labels: {
      written_by: string
      published_at: string
      updated_at: string
      read_time: string       // "{{minutes}} min de lectura"
      related: string
      movies_mentioned: string
      share: string
    }
    categories: {
      reviews: string
      rankings: string
      news: string
      guides: string
      where_to_watch: string
      best_of: string
    }
  }

  ranking: {
    meta: {
      title: string
      description: string
    }
    labels: {
      position: string
      score: string
      updated: string
    }
  }

  search: {
    placeholder: string
    results: string             // "{{count}} resultados para \"{{query}}\""
    no_results: string
    suggestions: string
    recent: string
    filters: {
      title: string
      year: string
      rating: string
      genre: string
      platform: string
      type: string
      type_movie: string
      type_series: string
      apply: string
      reset: string
    }
  }

  where_to_watch: {
    meta: {
      title: string            // "Dónde ver {{platform}} — Catálogo completo"
      description: string
    }
    labels: {
      available_on: string
      how_to_watch: string
      subscription: string
      rent_or_buy: string
    }
  }

  best_of: {
    meta: {
      title: string            // "Mejores películas de {{year}}"
      description: string
    }
  }

  admin: {
    nav: {
      dashboard: string
      media: string
      articles: string
      sync: string
      genres: string
      platforms: string
      people: string
      lists: string
      settings: string
      logout: string
    }
    dashboard: {
      title: string
      stats: {
        total_movies: string
        total_series: string
        total_articles: string
        total_visits: string
      }
    }
    sync: {
      title: string
      start: string
      stop: string
      pause: string
      status: {
        idle: string
        running: string
        paused: string
        done: string
        error: string
      }
    }
    table: {
      id: string
      title: string
      type: string
      status: string
      created_at: string
      actions: string
      edit: string
      delete: string
      publish: string
      unpublish: string
    }
  }

  errors: {
    not_found: {
      title: string
      description: string
      cta: string
    }
    server_error: {
      title: string
      description: string
    }
    offline: {
      title: string
      description: string
    }
  }

  legal: {
    privacy: string
    terms: string
    cookies: string
    about: string
    contact: string
  }
}

// ─── Tipo helper para acceder a claves anidadas (dot notation) ────────────────
// Permite usar t("movie.sections.cast") con autocompletado total

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
