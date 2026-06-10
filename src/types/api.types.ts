export interface Pagination {
  page: number
  per_page: number
  total: number
  total_pages: number
}

export interface PaginatedResponse<T> {
  success: true
  data: T[]
  pagination: Pagination
}

export interface SingleResponse<T> {
  success: true
  data: T
}

export interface ErrorResponse {
  success: false
  error: string
  message: string
}