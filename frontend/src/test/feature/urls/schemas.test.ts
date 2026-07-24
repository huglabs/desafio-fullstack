import { describe, expect, it } from 'vitest'

import { createUrlSchema } from '@/features/urls/types/schemas'

describe('schemas de URLs', () => {
  it('aceita URL válida', () => {
    const result = createUrlSchema.safeParse({
      original_url: 'https://exemplo.com/pagina',
    })

    expect(result.success).toBe(true)
  })

  it('rejeita URL inválida', () => {
    const result = createUrlSchema.safeParse({
      original_url: 'nao-e-url',
    })

    expect(result.success).toBe(false)
  })

  it('aceita senha opcional com 4 ou mais caracteres', () => {
    const result = createUrlSchema.safeParse({
      original_url: 'https://exemplo.com',
      password: '1234',
    })

    expect(result.success).toBe(true)
  })

  it('rejeita senha opcional curta demais', () => {
    const result = createUrlSchema.safeParse({
      original_url: 'https://exemplo.com',
      password: '123',
    })

    expect(result.success).toBe(false)
  })
})
