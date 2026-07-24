import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AuthErrorAlert } from '@/features/auth/components/AuthErrorAlert'

describe('AuthErrorAlert', () => {
  it('mostra a mensagem principal', () => {
    render(<AuthErrorAlert message="Não foi possível entrar" />)

    expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível entrar')
  })

  it('lista erros de campo diferentes da mensagem principal', () => {
    render(
      <AuthErrorAlert
        message="Dados inválidos"
        fieldErrors={{
          email: ['E-mail já cadastrado'],
          password: ['Dados inválidos'],
        }}
      />,
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Dados inválidos')
    expect(alert).toHaveTextContent('E-mail já cadastrado')
    expect(within(alert).getAllByText('Dados inválidos')).toHaveLength(1)
  })
})
