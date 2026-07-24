import { AxiosError } from 'axios'
import { describe, expect, it } from 'vitest'

import { getApiErrorMessage, parseApiError } from '@/shared/lib/apiError'

function createAxiosError(status: number, data: unknown) {
  const error = new AxiosError('Erro da API')
  error.response = {
    status,
    data,
    statusText: 'Error',
    headers: {},
    config: { headers: {} } as never,
  }
  return error
}

describe('parseApiError', () => {
  it('usa a mensagem padrão para erros desconhecidos', () => {
    const result = parseApiError(new Error('boom'), 'Falha genérica')

    expect(result.message).toBe('Falha genérica')
    expect(result.fieldErrors).toEqual({})
  })

  it('extrai mensagem e erros de campo da API', () => {
    const result = parseApiError(
      createAxiosError(422, {
        message: 'Dados inválidos',
        errors: {
          email: ['E-mail já cadastrado'],
        },
      }),
    )

    expect(result.message).toBe('Dados inválidos')
    expect(result.status).toBe(422)
    expect(result.fieldErrors.email).toEqual(['E-mail já cadastrado'])
  })

  it('usa mensagem de credenciais inválidas em 401 sem body', () => {
    const result = parseApiError(createAxiosError(401, {}))

    expect(result.message).toBe('Credenciais inválidas.')
  })

  it('getApiErrorMessage retorna só o texto', () => {
    expect(getApiErrorMessage(createAxiosError(500, { message: 'Servidor fora' }))).toBe(
      'Servidor fora',
    )
  })
})
