import { describe, expect, it } from 'vitest'

import {
  getAuthRedirectPath,
  isPublicAuthRequest,
  shouldHandleUnauthorized,
} from '@/shared/lib/sessionGuard'

describe('sessionGuard', () => {
  it('identifica rotas públicas de auth', () => {
    expect(isPublicAuthRequest('/login')).toBe(true)
    expect(isPublicAuthRequest('/register')).toBe(true)
    expect(isPublicAuthRequest('/me')).toBe(false)
    expect(isPublicAuthRequest('/urls/1/analytics')).toBe(false)
  })

  it('só força logout em 401 fora de login/registro', () => {
    expect(shouldHandleUnauthorized('/login')).toBe(false)
    expect(shouldHandleUnauthorized('/register')).toBe(false)
    expect(shouldHandleUnauthorized('/dashboard')).toBe(true)
    expect(shouldHandleUnauthorized('/urls')).toBe(true)
  })

  it('evita redirect quando já está em /auth', () => {
    expect(getAuthRedirectPath('/auth')).toBeNull()
    expect(getAuthRedirectPath('/dashboard')).toBe('/auth')
  })
})
