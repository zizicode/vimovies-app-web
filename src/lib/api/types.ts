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
  editorial_rating: number
  tmdb_popularity: number
  genres: Genre[]
  credits: Credit[]
  status: string
  created_at: string
  updated_at: string
}

export interface Genre {
  id: number
  slug: string
  name_es: string
  name_en: string
  description_es?: string
  description_en?: string
  status: string
}

export interface Credit {
  id: number
  person_id: number
  media_id: number
  role: string
  name: string
  character?: string
  order: number
}

export interface Article {
  id: number
  slug: string
  title_es: string
  title_en: string
  excerpt_es: string
  excerpt_en: string
  content_es: string
  content_en: string
  cover_image_url: string
  status: string
  published_at: string
  updated_at: string
  tags: string[]
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
  status: string
}
