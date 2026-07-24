import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { UrlPagination } from '@/features/urls/components/UrlPagination'

const metaBase = {
  current_page: 2,
  last_page: 4,
  per_page: 10,
  total: 35,
  from: 11,
  to: 20,
}

describe('UrlPagination', () => {
  it('não renderiza quando há apenas uma página', () => {
    const { container } = render(
      <UrlPagination
        meta={{ ...metaBase, current_page: 1, last_page: 1, total: 5, from: 1, to: 5 }}
        onPageChange={vi.fn()}
      />,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('mostra o intervalo e a página atual', () => {
    render(<UrlPagination meta={metaBase} onPageChange={vi.fn()} />)

    expect(screen.getByText('Mostrando 11–20 de 35')).toBeInTheDocument()
    expect(screen.getByText('Página 2 de 4')).toBeInTheDocument()
  })

  it('chama onPageChange ao clicar em próxima', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()

    render(<UrlPagination meta={metaBase} onPageChange={onPageChange} />)

    await user.click(screen.getByRole('button', { name: /próxima/i }))

    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('chama onPageChange ao clicar em anterior', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()

    render(<UrlPagination meta={metaBase} onPageChange={onPageChange} />)

    await user.click(screen.getByRole('button', { name: /anterior/i }))

    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  it('desabilita anterior na primeira página', () => {
    render(
      <UrlPagination
        meta={{ ...metaBase, current_page: 1, from: 1, to: 10 }}
        onPageChange={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: /anterior/i })).toBeDisabled()
  })
})
