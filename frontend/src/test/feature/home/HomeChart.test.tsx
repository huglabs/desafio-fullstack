import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HomeChart } from '@/features/home/components/HomeChart'

describe('HomeChart', () => {
  it('mostra o gráfico com título quando há cliques', () => {
    render(
      <HomeChart
        isLoading={false}
        isError={false}
        last7Days={[
          { date: '2026-07-22', clicks: 4 },
          { date: '2026-07-23', clicks: 6 },
        ]}
      />,
    )

    expect(screen.getByText('Cliques por dia')).toBeInTheDocument()
    expect(screen.getByText('Últimos 7 dias — todas as suas URLs')).toBeInTheDocument()
  })

  it('mostra estado vazio sem cliques', () => {
    render(
      <HomeChart
        isLoading={false}
        isError={false}
        last7Days={[
          { date: '2026-07-22', clicks: 0 },
          { date: '2026-07-23', clicks: 0 },
        ]}
      />,
    )

    expect(screen.getByText('Nenhum clique registrado nos últimos 7 dias.')).toBeInTheDocument()
  })

  it('mostra erro quando a carga falha', () => {
    render(<HomeChart isLoading={false} isError last7Days={undefined} />)

    expect(screen.getByText('Não foi possível carregar o gráfico.')).toBeInTheDocument()
  })
})
