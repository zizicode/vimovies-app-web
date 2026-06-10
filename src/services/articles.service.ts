import { http } from '../api/https'
import { endpoints } from '../api/endpoint'

import type {
  Article,
} from '../types'

import type {
  PaginatedResponse,
  SingleResponse,
} from '../types/api.types'

export const ArticlesService = {
  getAll(params?: Record<string, unknown>) {
    return http.get<PaginatedResponse<Article>>(
      endpoints.articles.list,
      params
    )
  },

  getBySlug(slug: string) {
    return http.get<SingleResponse<Article>>(
      endpoints.articles.detail(slug)
    )
  },
}
