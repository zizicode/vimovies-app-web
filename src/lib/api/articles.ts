import apiClient from './client'
import type { ApiResponse, ApiPaginatedResponse, Article } from './types'

export const articlesApi = {
  // Listado general
  getAll: async (params?: {
    page?: number
    per_page?: number
    region?: string
    locale?: string
    status?: string
    intent?: string
    search?: string
  }) => {
    const response = await apiClient.get<ApiPaginatedResponse<Article>>('/articles', { params })
    return response.data
  },

  // Detalle por slug
  getBySlug: async (slug: string) => {
    const response = await apiClient.get<ApiResponse<Article>>(`/articles/${slug}`)
    return response.data
  },
}
