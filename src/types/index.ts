// ============================================================================
// # Frontend Types - Vimovies API
// Tipos de Datos Recibidos por el Frontend Público
// ============================================================================

import type { ContentStatus, MediaType } from "../enums/media.enum";
import type { SitemapPriority } from "../enums/sitemap.enum";

// ----------------------------------------------------------------------------
// 📦 BLOQUE 1: CORE DE CONTENIDO (MEDIA)
// ----------------------------------------------------------------------------

export interface Media {
  id: string;   // UUID
  tmdb_id: number;
  imdb_id?: string | null;
  media_type: MediaType;
  slug: string;

  original_title: string;
  original_language: string;
  release_date?: string | null;  // ISO date
  runtime_minutes?: number | null;
  tmdb_popularity?: number | null;

  title_es?: string | null;
  title_en?: string | null;

  synopsis_es?: string | null;
  synopsis_en?: string | null;

  editorial_review_es?: string | null;
  editorial_review_en?: string | null;
  editorial_rating?: number | null;
  editorial_verdict_es?: string | null;
  editorial_verdict_en?: string | null;

  poster_path?: string | null;
  backdrop_path?: string | null;
  logo_path?: string | null;

  seo_title_es?: string | null;
  seo_title_en?: string | null;
  seo_description_es?: string | null;
  seo_description_en?: string | null;
  og_image_url?: string | null;

  status: ContentStatus;
  is_prerendered: boolean;
  sitemap_priority: SitemapPriority;
  noindex: boolean;

  tmdb_last_synced_at?: string | null;
  created_at: string;
  updated_at: string;

  genre_ids: number[]
}
  
export interface MediaDetail extends Media {
  // Datos extendidos
  tagline?: string
  overview?: string
  budget?: number
  revenue?: number
  
  // Relaciones completas
  genres: Genre[]
  credits: FilmCredit[]
  videos: Video[]
  watch_providers: WatchProvider[]
  faqs: FAQ[]
}
  
// ----------------------------------------------------------------------------
// 🏷️ BLOQUE 2: CLASIFICACIÓN (GÉNEROS)
// ----------------------------------------------------------------------------

export interface Genre {
  id: number;
  tmdb_id: number;
  slug: string;
  name_es: string;
  name_en: string;
  seo_title_es?: string | null;
  seo_title_en?: string | null;
  seo_description_es?: string | null;
  seo_description_en?: string | null;
  description_es?: string | null;
  description_en?: string | null;
  cover_image_url?: string | null;
  sitemap_priority: SitemapPriority;
  created_at: string;
  updated_at: string;
}
  
// ----------------------------------------------------------------------------
// 👥 BLOQUE 3: REPARTO Y CRÉDITOS (PERSONAS)
// ----------------------------------------------------------------------------

export interface Person {
  id: number
  slug: string // "leonardo-dicaprio"
  name: string
  biography?: string
  birthday?: string
  deathday?: string
  place_of_birth?: string
  known_for_department: 'Acting' | 'Directing' | 'Writing' | 'Production'
  profile: string // URL imagen 500px
  tmdb_id: number
  tmdb_popularity: number
  gender: 0 | 1 | 2 | 3 // 0=Not specified, 1=Female, 2=Male, 3=Non-binary
  homepage?: string
  imdb_id?: string
  
  // Relaciones
  filmography?: FilmCredit[]
  known_for?: Media[]
  
  // SEO
  seo_title?: string
  seo_description?: string
  created_at: string
  updated_at: string
}
  
export interface FilmCredit {
  id: number
  media_id: number
  person_id: number
  media: Media
  role: string // "Director", "Actor", "Writer"
  character?: string // "Jack Dawson"
  order: number // Para ordenamiento
  is_main_cast: boolean
}
  
// ----------------------------------------------------------------------------
// 📺 BLOQUE 4: STREAMING Y DISPONIBILIDAD (PLATAFORMAS)
// ----------------------------------------------------------------------------

export interface Platform {
  id: number
  slug: string // "netflix"
  name: string
  description?: string
  logo: string // URL logo
  color: string // "#E50914"
  website?: string
  is_active: boolean
  media_count?: number
  
  // Catálogo
  catalog?: Media[]
  
  // SEO
  seo_title?: string
  seo_description?: string
  created_at: string
  updated_at: string
}
  
export interface WatchProvider {
  id: number
  media_id: number
  platform_id: number
  platform: Platform
  type: 'flatrate' | 'buy' | 'rent' | 'free'
  region: string // "ES", "US", "MX"
  link?: string
  added_at: string
}
  
// ----------------------------------------------------------------------------
// 🎥 BLOQUE 5: MULTIMEDIA ADJUNTA (VIDEOS)
// ----------------------------------------------------------------------------

export interface Video {
  id: number
  media_id: number
  name: string
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Behind the Scenes'
  site: 'YouTube' | 'Vimeo'
  key: string // Video ID en YouTube/Vimeo
  size: number // 480, 720, 1080
  official: boolean
  published_at: string
  language: string // "es", "en"
  order: number
}
  
// ----------------------------------------------------------------------------
// ✍️ BLOQUE 6: CONTENIDO EDITORIAL Y SEO (ARTÍCULOS Y FAQS)
// ----------------------------------------------------------------------------

export interface Article {
  id: string;
  slug: string;
  
  title_es: string;
  title_en?: string | null;
  
  excerpt_es: string;
  excerpt_en?: string | null;
  
  content_es: string;
  content_en?: string | null;
  
  cover_image_url?: string | null;
  
  published_at: string;
  reading_time_minutes?: number | null;
  intent: 'review' | 'news' | 'list' | 'guide' | 'interview';
  status: 'published' | 'draft' | 'archived';
  
  // SEO
  seo_title_es?: string | null;
  seo_title_en?: string | null;
  seo_description_es?: string | null;
  seo_description_en?: string | null;
  noindex: boolean;
  
  // Relaciones
  category_id?: number | null;
  author_id: string;
  
  authors?: {
    display_name: string;
    avatar_url?: string | null;
    slug: string;
  };
  
  article_categories?: {
    slug: string;
    name_es: string;
    name_en?: string | null;
  };

  faqs?: FAQ[];
  
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: number;
  question_es: string;
  question_en?: string | null;
  answer_es: string;
  answer_en?: string | null;
  display_order: number;
  
  created_at: string;
  updated_at: string;
}
  
// ----------------------------------------------------------------------------
// 📜 BLOQUE 7: CURACIÓN DE CONTENIDO (LISTAS)
// ----------------------------------------------------------------------------

export interface CuratedList {
  id: number
  slug: string
  title: string
  description: string
  type: 'ranking' | 'collection' | 'recommendation'
  category: string // "best-movies-2024", "horror-must-watch"
  items: CuratedListItem[]
  
  // SEO
  seo_title?: string
  seo_description?: string
  og_image?: string
  
  // Metadata
  author: string
  is_featured: boolean
  sort_order: number
  
  created_at: string
  updated_at: string
}
  
export interface CuratedListItem {
  id: number
  list_id: number
  media_id: number
  media: Media
  position: number
  comment?: string
}
  
// ----------------------------------------------------------------------------
// 🌐 BLOQUE 8: RESPUESTAS DE LA API (WRAPPERS)
// ----------------------------------------------------------------------------

export interface PaginatedResponse<T> {
  success: true
  data: T[]
  pagination: {
    page: number
    per_page: number
    total: number
    total_pages: number
  }
}
  
export interface SingleResponse<T> {
  success: true
  data: T
}
  
export interface ErrorResponse {
  success: false
  error: string
  message: string
}
  
// ----------------------------------------------------------------------------
// 🚀 EJEMPLOS DE USO EN FRONTEND (RESPUESTAS ESPECÍFICAS)
// ----------------------------------------------------------------------------
  
export interface MovieListResponse extends PaginatedResponse<Media> {}
export interface MovieDetailResponse extends SingleResponse<MediaDetail> {}
export interface SearchResponse extends PaginatedResponse<Media> {}