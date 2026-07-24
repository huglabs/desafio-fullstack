import axios, { type AxiosError } from 'axios'

import { useAuthStore } from '@/features/auth/stores/authStore'
import { getAuthRedirectPath, shouldHandleUnauthorized } from '@/shared/lib/sessionGuard'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && shouldHandleUnauthorized(error.config?.url)) {
      useAuthStore.getState().clearAuth()

      const redirectPath = getAuthRedirectPath(window.location.pathname)
      if (redirectPath) {
        window.location.assign(redirectPath)
      }
    }

    return Promise.reject(error)
  },
)

export default api
