import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { authService } from '@/features/auth/services/authService'
import { useAuthStore } from '@/features/auth/stores/authStore'
import type { LoginFormData, RegisterFormData } from '@/features/auth/types/schemas'

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await authService.login(data)
      return response.data
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token)
      queryClient.setQueryData(['me'], { user: data.user })
    },
  })
}

export function useRegister() {
  const setAuth = useAuthStore((state) => state.setAuth)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await authService.register(data)
      return response.data
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token)
      queryClient.setQueryData(['me'], { user: data.user })
    },
  })
}

export function useLogout() {
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      try {
        await authService.logout()
      } catch {
        // Limpa sessão local mesmo se a API falhar
      }
    },
    onSettled: () => {
      clearAuth()
      queryClient.clear()
    },
  })
}

export function useMe() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const setUser = useAuthStore((state) => state.setUser)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const response = await authService.me()
        setUser(response.data.user)
        return response.data
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          clearAuth()
        }
        throw error
      }
    },
    enabled: isAuthenticated,
    retry: false,
  })
}
