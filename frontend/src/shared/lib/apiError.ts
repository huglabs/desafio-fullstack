import { isAxiosError } from 'axios'

export type ApiFieldErrors = Record<string, string[]>

export interface ParsedApiError {
  message: string
  fieldErrors: ApiFieldErrors
  status?: number
}

export function parseApiError(error: unknown, fallback = 'Erro inesperado'): ParsedApiError {
  if (!isAxiosError(error)) {
    return { message: fallback, fieldErrors: {} }
  }

  const status = error.response?.status
  const data = error.response?.data as {
    message?: string
    errors?: Record<string, string[]>
  }

  const fieldErrors = data?.errors ?? {}
  const message =
    data?.message ||
    Object.values(fieldErrors)[0]?.[0] ||
    (status === 401 ? 'Credenciais inválidas.' : fallback)

  return { message, fieldErrors, status }
}

export function getApiErrorMessage(error: unknown, fallback = 'Erro inesperado'): string {
  return parseApiError(error, fallback).message
}
