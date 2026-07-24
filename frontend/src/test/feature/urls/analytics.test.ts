import { describe, expect, it } from 'vitest'

import {
  formatAnalyticsChartData,
  hasAnalyticsData,
  sumLast7DaysClicks,
} from '@/features/urls/lib/analytics'

describe('helpers de analytics', () => {
  const last7Days = [
    { date: '2026-07-18', clicks: 4 },
    { date: '2026-07-19', clicks: 7 },
    { date: '2026-07-20', clicks: 0 },
  ]

  it('soma os cliques dos últimos 7 dias', () => {
    expect(sumLast7DaysClicks(last7Days)).toBe(11)
  })

  it('formata as datas para o gráfico', () => {
    const chartData = formatAnalyticsChartData(last7Days)

    expect(chartData).toHaveLength(3)
    expect(chartData[0]).toMatchObject({ clicks: 4 })
    expect(chartData[0].day).toBeTruthy()
  })

  it('indica quando não há dados de analytics', () => {
    expect(hasAnalyticsData(undefined)).toBe(false)
    expect(
      hasAnalyticsData({
        total_clicks: 0,
        last_7_days: [{ date: '2026-07-18', clicks: 0 }],
      }),
    ).toBe(false)
  })

  it('indica quando há dados de analytics', () => {
    expect(
      hasAnalyticsData({
        total_clicks: 2,
        last_7_days: [{ date: '2026-07-18', clicks: 2 }],
      }),
    ).toBe(true)
  })
})
