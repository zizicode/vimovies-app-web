import { http } from '../api/https'
import { endpoints } from '../api/endpoint'

import type {
  Media,
  MediaDetail,
} from '../types'

import type {
  PaginatedResponse,
  SingleResponse,
} from '../types/api.types'

export const MoviesService = {
  getAll(params?: Record<string, unknown>) {
    return http.get<PaginatedResponse<Media>>(
      endpoints.media.list,
      params
    )
  },

  getBySlug(slug: string) {
    return http.get<SingleResponse<MediaDetail>>(
      endpoints.media.detail(slug)
    )
  },

  search(query: string) {
    return http.get<PaginatedResponse<Media>>(
      endpoints.media.search,
      { q: query }
    )
  },
}