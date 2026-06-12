// Tipos de respuesta de la API
export interface ApiResponse<T> {
  success: boolean
  data: T
}

export interface ApiPaginatedResponse<T> {
  success: boolean
  data: T[]
  meta: {
    page: number
    per_page: number
    total: number
    pages: number
  }
}

export interface ApiError {
  success: false
  error: string
}

// Tipos de dominio
export interface Media {
  id: number
  slug: string
  title_es: string
  title_en: string
  original_title: string
  synopsis_es: string
  synopsis_en: string
  poster_path: string
  backdrop_path: string
  release_date: string
  runtime_minutes: number
  media_type: 'movie' | 'tv'
  editorial_rating: number | null
  editorial_review_es: string | null
  editorial_review_en: string | null
  editorial_verdict_es: string | null
  editorial_verdict_en: string | null
  tmdb_popularity: number
  genres: Genre[]
  credits: Credit[]
  ratings: Rating[]
  watch_providers: WatchProvider[]
  videos: Video[]
  faqs: FAQ[]
  status: string
  created_at: string
  updated_at: string
}

export interface Rating {
  id?: string
  media_id?: string
  source: string
  score: number
  vote_count?: number
  raw_score?: string
  fetched_at?: string
}

export interface WatchPlatform {
  id: number
  slug: string
  name_en: string
  name_es: string
  logo_url: string | null
  platform_type: string
  affiliate_url_en: string | null
  affiliate_url_es: string | null
}

export interface WatchProvider {
  id: string
  media_id: string
  platform_id: number
  region_code: string

  is_streaming: boolean
  is_rent: boolean
  is_buy: boolean

  rent_price_usd: number | null
  buy_price_usd: number | null

  watch_url: string
  affiliate_url: string | null

  platform: WatchPlatform
}

export interface Video {
  external_key: string
  video_site: string
  video_type: string
  title: string
}

export interface FAQ {
  id?: string
  question_es: string
  question_en?: string
  answer_es: string
  answer_en?: string
  display_order?: number
}

export interface MediaMinimal {
  id: number
  slug: string
  title_es: string
  title_en: string
  poster_path: string
  release_date: string
  editorial_rating?: number | null
}

export interface MediaMention {
  media_id: string
  mention_type: 'primary' | 'supporting' | 'mentioned'
  display_order?: number
  media?: MediaMinimal
}

export interface Tag {
  id: number
  slug: string
  name_es: string
  name_en: string
}

export interface Genre {
  id: number
  tmdb_id: number
  slug: string
  name_es: string
  name_en: string
  description_es?: string
  description_en?: string
  cover_image_url?: string
  status: string
  sitemap_priority?: string
  seo_title_es?: string
  seo_title_en?: string
  seo_description_es?: string
  seo_description_en?: string
}

export interface Credit {
  id: number
  person_id: number
  media_id: number
  role: string
  character?: string
  character_name?: string
  cast_order?: number
  order: number
  name?: string
  profile_path?: string | null
  person?: {
    id: number
    name: string
    slug: string
    profile_path?: string | null
  }
}

export interface Article {
  id: string
  slug: string
  author_id: string
  category_id: number
  title_es: string
  title_en?: string
  excerpt_es: string
  excerpt_en?: string
  content_es: string
  content_en?: string
  cover_image_url?: string
  intent: 'informational' | 'navigational' | 'transactional' | 'seasonal'
  primary_keyword_es?: string
  secondary_keywords?: string[]
  status: 'draft' | 'published' | 'archived' | 'scheduled'
  locale: 'es' | 'en'
  published_at?: string
  created_at?: string
  updated_at?: string
  faqs?: FAQ[]
  mentions?: MediaMention[]
  tags?: Tag[]
  sitemap_priority: 'critical' | 'high' | 'medium' | 'low' | 'minimal'
}

export interface Person {
  id: number
  slug: string
  name: string
  biography_es: string
  biography_en: string
  profile_path: string
  birth_date: string
  death_date?: string
  place_of_birth: string
  popularity: number
  tmdb_popularity?: number
  status: string
}
