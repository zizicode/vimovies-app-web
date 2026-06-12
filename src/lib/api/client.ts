import axios from 'axios'

// En desarrollo usar localhost, en producción usar ruta relativa para que Vercel rewrite funcione
const API_URL = import.meta.env.MODE === 'development'
  ? (import.meta.env.VITE_API_URL || 'http://localhost:3000/api')
  : '/api'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    })
    return Promise.reject(error)
  }
)

export default apiClient
