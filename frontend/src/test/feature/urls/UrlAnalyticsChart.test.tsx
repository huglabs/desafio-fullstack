import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { UrlAnalyticsChart } from '@/features/urls/components/UrlAnalyticsChart'

describe('UrlAnalyticsChart', () => {
  it('mostra o título do gráfico quando há cliques', () => {
    render(
      <UrlAnalyticsChart
        isLoading={false}
        isError={false}
        analytics={{
          total_clicks: 5,
          last_7_days: [
            { date: '2026-07-22', clicks: 2 },
            { date: '2026-07-23', clicks: 3 },
          ],
        }}
      />,
    )

    expect(screen.getByText('Cliques por dia')).toBeInTheDocument()
    expect(screen.getByText('Últimos 7 dias')).toBeInTheDocument()
  })

  it('mostra estado vazio quando não há cliques', () => {
    render(
      <UrlAnalyticsChart
        isLoading={false}
        isError={false}
        analytics={{
          total_clicks: 0,
          last_7_days: [
            { date: '2026-07-22', clicks: 0 },
            { date: '2026-07-23', clicks: 0 },
          ],
        }}
      />,
    )

    expect(screen.getByText('Nenhum clique registrado nos últimos 7 dias.')).toBeInTheDocument()
  })

  it('mostra mensagem de erro quando a carga falha', () => {
    render(<UrlAnalyticsChart isLoading={false} isError analytics={undefined} />)

    expect(
      screen.getByText('Não foi possível carregar os analytics desta URL.'),
    ).toBeInTheDocument()
  })
})
