import { http } from '../api/https'
import { endpoints } from '../api/endpoint'

import type {
  Platform,
} from '../types'

import type {
  PaginatedResponse,
  SingleResponse,
} from '../types/api.types'

export const PlatformsService = {
  getAll(params?: Record<string, unknown>) {
    return http.get<PaginatedResponse<Platform>>(
      endpoints.platforms.list,
      params
    )
  },

  getBySlug(slug: string) {
    return http.get<SingleResponse<Platform>>(
      endpoints.platforms.detail(slug)
    )
  },
}
