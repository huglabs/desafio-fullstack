import api from '@/shared/lib/api'
import type { AuthResponse, MeResponse } from '@/features/auth/types/auth'
import type { LoginFormData, RegisterFormData } from '@/features/auth/types/schemas'

export const authService = {
  login(data: LoginFormData) {
    return api.post<AuthResponse>('/login', data)
  },

  register(data: RegisterFormData) {
    return api.post<AuthResponse>('/register', data)
  },

  logout() {
    return api.post('/logout')
  },

  me() {
    return api.get<MeResponse>('/me')
  },
}
