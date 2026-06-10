import apiClient from './client'
import type { ApiResponse } from './types'

export interface StatsResponse {
  movies: {
    total: number
    published: number
    draft: number
    archived: number
  }
  articles: {
    total: number
    published: number
    draft: number
    archived: number
  }
  people: number
  genres: number
  platforms: number
  lastUpdated: string
}

export const statsApi = {
  getStats: async () => {
    const response = await apiClient.get<ApiResponse<StatsResponse>>('/stats')
    return response.data
  }
}
