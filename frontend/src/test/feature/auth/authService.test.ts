import { beforeEach, describe, expect, it, vi } from 'vitest'

const getMock = vi.fn()
const postMock = vi.fn()

vi.mock('@/shared/lib/api', () => ({
  default: {
    get: (...args: unknown[]) => getMock(...args),
    post: (...args: unknown[]) => postMock(...args),
  },
}))

describe('authService', () => {
  beforeEach(() => {
    getMock.mockReset()
    postMock.mockReset()
  })

  it('envia login para a API', async () => {
    postMock.mockResolvedValue({ data: { token: 'abc', user: { id: 1 } } })

    const { authService } = await import('@/features/auth/services/authService')
    await authService.login({ email: 'a@b.com', password: 'senha123' })

    expect(postMock).toHaveBeenCalledWith('/login', {
      email: 'a@b.com',
      password: 'senha123',
    })
  })

  it('envia registro para a API', async () => {
    postMock.mockResolvedValue({ data: { token: 'abc', user: { id: 1 } } })

    const { authService } = await import('@/features/auth/services/authService')
    await authService.register({
      name: 'Luis',
      email: 'luis@email.com',
      password: 'senha1234',
      password_confirmation: 'senha1234',
    })

    expect(postMock).toHaveBeenCalledWith(
      '/register',
      expect.objectContaining({
        name: 'Luis',
        email: 'luis@email.com',
      }),
    )
  })

  it('busca o usuário autenticado em /me', async () => {
    getMock.mockResolvedValue({ data: { user: { id: 1, name: 'Luis' } } })

    const { authService } = await import('@/features/auth/services/authService')
    await authService.me()

    expect(getMock).toHaveBeenCalledWith('/me')
  })

  it('chama logout', async () => {
    postMock.mockResolvedValue({ data: { message: 'ok' } })

    const { authService } = await import('@/features/auth/services/authService')
    await authService.logout()

    expect(postMock).toHaveBeenCalledWith('/logout')
  })
})
