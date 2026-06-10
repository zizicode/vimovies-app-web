import apiClient from './client'
import type { ApiResponse, Genre } from './types'

export interface GenreStats {
  genre_id: number
  slug: string
  name_es: string
  name_en: string
  media_count: number
}

export interface GenreWithMediaResponse {
  genre: Genre
  media: Array<{
    id: string | number
    slug: string
    title_es: string | null
    title_en: string | null
    poster_path: string | null
    backdrop_path: string | null
    release_date: string | null
    tmdb_popularity: number | null
    editorial_rating: number | null
    status: string
    noindex: boolean
  }>
  pagination: {
    page: number
    per_page: number
    total: number
    pages: number
  }
}

export const genresApi = {
  // Listado de géneros
  list: async () => {
    const response = await apiClient.get<ApiResponse<Genre[]>>('/genres')
    return response.data
  },

  // Estadísticas de géneros (conteo de películas por género)
  getStats: async () => {
    const response = await apiClient.get<ApiResponse<GenreStats[]>>('/genres/stats')
    return response.data
  },

  // Detalle por slug
  getBySlug: async (slug: string) => {
    const response = await apiClient.get<ApiResponse<Genre>>(`/genres/${slug}`)
    return response.data
  },

  // Género con sus películas/series con paginación y búsqueda
  getWithMedia: async (
    slug: string,
    page = 1,
    per_page = 20,
    search?: string
  ) => {
    const response = await apiClient.get<ApiResponse<GenreWithMediaResponse>>(
      `/genres/${slug}/media`,
      { params: { page, per_page, search } }
    )
    return response.data
  },
}
