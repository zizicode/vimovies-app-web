import apiClient from './client'
import type { ApiResponse, ApiPaginatedResponse, Genre } from './types'

export const genresApi = {
  // Listado de géneros
  list: async () => {
    const response = await apiClient.get<ApiResponse<Genre[]>>('/genres')
    return response.data
  },

  // Detalle por slug
  getBySlug: async (slug: string) => {
    const response = await apiClient.get<ApiResponse<Genre>>(`/genres/${slug}`)
    return response.data
  },

  // Género con sus películas/series
  getWithMedia: async (slug: string, page = 1, per_page = 20) => {
    const response = await apiClient.get<ApiPaginatedResponse<Media>>(
      `/genres/${slug}/media`,
      { params: { page, per_page } }
    )
    return response.data
  },
}
