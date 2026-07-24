import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DeleteUrlAlert } from '@/features/urls/components/DeleteUrlAlert'
import type { Url } from '@/features/urls/types/url'

const url: Url = {
  id: 1,
  original_url: 'https://exemplo.com',
  slug: 'abc12345',
  short_url: 'http://localhost:8000/abc12345',
  expires_at: null,
  has_password: false,
  created_at: '2026-07-24T10:00:00.000Z',
}

describe('DeleteUrlAlert', () => {
  it('mostra o link que será excluído', () => {
    render(
      <DeleteUrlAlert
        url={url}
        open
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
        isPending={false}
      />,
    )

    expect(screen.getByText('Excluir URL?')).toBeInTheDocument()
    expect(
      screen.getByText(`O link ${url.short_url} será removido permanentemente.`),
    ).toBeInTheDocument()
  })

  it('chama onConfirm ao confirmar exclusão', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()

    render(
      <DeleteUrlAlert
        url={url}
        open
        onOpenChange={vi.fn()}
        onConfirm={onConfirm}
        isPending={false}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Excluir' }))

    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('mostra estado de carregamento no botão', () => {
    render(<DeleteUrlAlert url={url} open onOpenChange={vi.fn()} onConfirm={vi.fn()} isPending />)

    expect(screen.getByRole('button', { name: 'Excluindo...' })).toBeDisabled()
  })
})
