import { api } from './axios'

export const http = {
  get: <T>(url: string, params?: object) =>
    api.get<T>(url, { params }),

  post: <T>(url: string, body?: object) =>
    api.post<T>(url, body),

  patch: <T>(url: string, body?: object) =>
    api.patch<T>(url, body),

  put: <T>(url: string, body?: object) =>
    api.put<T>(url, body),

  delete: <T>(url: string) =>
    api.delete<T>(url),
}