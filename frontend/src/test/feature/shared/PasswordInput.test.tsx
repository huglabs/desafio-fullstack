import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { PasswordInput } from '@/shared/components/ui/password-input'

describe('PasswordInput', () => {
  it('inicia ocultando a senha', () => {
    render(<PasswordInput aria-label="Senha" />)

    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password')
    expect(screen.getByRole('button', { name: 'Exibir senha' })).toBeInTheDocument()
  })

  it('alterna entre exibir e ocultar a senha', async () => {
    const user = userEvent.setup()
    render(<PasswordInput aria-label="Senha" />)

    await user.click(screen.getByRole('button', { name: 'Exibir senha' }))

    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'text')
    expect(screen.getByRole('button', { name: 'Ocultar senha' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Ocultar senha' }))

    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password')
  })
})
