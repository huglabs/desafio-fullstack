import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HomeStats } from '@/features/home/components/HomeStats'

describe('HomeStats', () => {
  it('mostra os totais quando carregado', () => {
    render(
      <HomeStats
        isLoading={false}
        totalUrls={12}
        totalClicks={340}
        clicksToday={8}
      />,
    )

    expect(screen.getByText('Total de URLs')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('Total de cliques')).toBeInTheDocument()
    expect(screen.getByText('340')).toBeInTheDocument()
    expect(screen.getByText('Cliques hoje')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
  })

  it('não mostra os valores enquanto carrega', () => {
    const { container } = render(
      <HomeStats isLoading totalUrls={12} totalClicks={340} clicksToday={8} />,
    )

    expect(screen.queryByText('Total de URLs')).not.toBeInTheDocument()
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0)
  })
})
