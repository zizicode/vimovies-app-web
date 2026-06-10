import apiClient from './client'
import type { ApiResponse, ApiPaginatedResponse, Media } from './types'

export const mediaApi = {
  // Listado de películas/series
  list: async (params?: {
    page?: number
    per_page?: number
    media_type?: 'movie' | 'tv'
    sort_by?: 'tmdb_popularity' | 'release_date' | 'editorial_rating'
    sort_order?: 'asc' | 'desc'
    genre_id?: number
    search?: string
    region?: string
  }) => {
    const response = await apiClient.get<ApiPaginatedResponse<Media>>('/media', { params })
    return response.data
  },

  // Detalle por slug
  getBySlug: async (slug: string) => {
    const response = await apiClient.get<ApiResponse<Media>>(`/media/${slug}`)
    return response.data
  },

  // Por género
  getByGenre: async (genreSlug: string, page = 1, per_page = 20, region?: string) => {
    const response = await apiClient.get<ApiPaginatedResponse<Media>>(
      `/media/genre/${genreSlug}`,
      { params: { page, per_page, region } }
    )
    return response.data
  },

  // Búsqueda
  search: async (query: string, limit = 10, region?: string) => {
    const response = await apiClient.get<ApiResponse<Media[]>>('/media/search', {
      params: { q: query, limit, region }
    })
    return response.data
  },
}
