import { http } from '../api/https'
import { endpoints } from '../api/endpoint'

import type {
    Genre
} from '../types'

import type {
  PaginatedResponse,
  SingleResponse,
} from '../types/api.types'

export const GenresService = {
  getAll(params?: Record<string, unknown>) {
    return http.get<PaginatedResponse<Genre>>(
      endpoints.genres.list,
      params
    )
  },

  getBySlug(slug: string) {
    return http.get<SingleResponse<Genre>>(
      endpoints.genres.detail(slug)
    )
  },
}