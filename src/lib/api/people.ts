import apiClient from './client'
import type { ApiResponse, ApiPaginatedResponse, Person } from './types'

export const peopleApi = {
  // Listado con paginación
  list: async (params?: {
    page?: number
    per_page?: number
    search?: string
  }) => {
    const response = await apiClient.get<any>('/people/search', {
      params: {
        q: params?.search || '*',
        page: params?.page || 1,
        limit: params?.per_page || 20
      }
    })
    return response.data
  },

  // Detalle por slug
  getBySlug: async (slug: string) => {
    const response = await apiClient.get<ApiResponse<any>>(`/people/${slug}`)
    return response.data
  },

  // Búsqueda
  search: async (query: string) => {
    const response = await apiClient.get<ApiResponse<Person[]>>('/people/search', {
      params: { q: query }
    })
    return response.data
  },
}
