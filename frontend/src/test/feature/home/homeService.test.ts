import { beforeEach, describe, expect, it, vi } from 'vitest'

const getMock = vi.fn()

vi.mock('@/shared/lib/api', () => ({
  default: {
    get: (...args: unknown[]) => getMock(...args),
  },
}))

describe('homeService', () => {
  beforeEach(() => {
    getMock.mockReset()
  })

  it('busca o resumo do dashboard', async () => {
    getMock.mockResolvedValue({
      data: {
        total_urls: 3,
        total_clicks: 40,
        clicks_today: 2,
        last_7_days: [],
      },
    })

    const { homeService } = await import('@/features/home/services/homeService')
    const response = await homeService.getDashboard()

    expect(getMock).toHaveBeenCalledWith('/dashboard', { params: undefined })
    expect(response.data.total_urls).toBe(3)
  })
})
