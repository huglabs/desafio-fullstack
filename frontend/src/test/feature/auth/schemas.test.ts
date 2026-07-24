import { describe, expect, it } from 'vitest'

import { loginSchema, registerSchema } from '@/features/auth/types/schemas'

describe('schemas de auth', () => {
  describe('login', () => {
    it('aceita e-mail e senha válidos', () => {
      const result = loginSchema.safeParse({
        email: 'teste@email.com',
        password: 'senha123',
      })

      expect(result.success).toBe(true)
    })

    it('rejeita e-mail inválido', () => {
      const result = loginSchema.safeParse({
        email: 'nao-e-email',
        password: 'senha123',
      })

      expect(result.success).toBe(false)
    })

    it('exige senha', () => {
      const result = loginSchema.safeParse({
        email: 'teste@email.com',
        password: '',
      })

      expect(result.success).toBe(false)
    })
  })

  describe('registro', () => {
    it('aceita dados válidos com senhas iguais', () => {
      const result = registerSchema.safeParse({
        name: 'Luis',
        email: 'luis@email.com',
        password: 'senha123',
        password_confirmation: 'senha123',
      })

      expect(result.success).toBe(true)
    })

    it('rejeita senhas diferentes', () => {
      const result = registerSchema.safeParse({
        name: 'Luis',
        email: 'luis@email.com',
        password: 'senha1234',
        password_confirmation: 'outra-senha',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(
          result.error.issues.some((issue) => issue.path.includes('password_confirmation')),
        ).toBe(true)
      }
    })

    it('exige senha com pelo menos 8 caracteres', () => {
      const result = registerSchema.safeParse({
        name: 'Luis',
        email: 'luis@email.com',
        password: 'curta',
        password_confirmation: 'curta',
      })

      expect(result.success).toBe(false)
    })
  })
})
