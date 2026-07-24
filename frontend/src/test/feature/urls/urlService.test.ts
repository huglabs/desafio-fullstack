import { beforeEach, describe, expect, it, vi } from 'vitest'

const getMock = vi.fn()
const postMock = vi.fn()
const deleteMock = vi.fn()

vi.mock('@/shared/lib/api', () => ({
  default: {
    get: (...args: unknown[]) => getMock(...args),
    post: (...args: unknown[]) => postMock(...args),
    delete: (...args: unknown[]) => deleteMock(...args),
  },
}))

describe('urlService', () => {
  beforeEach(() => {
    getMock.mockReset()
    postMock.mockReset()
    deleteMock.mockReset()
  })

  it('lista URLs com página e per_page', async () => {
    getMock.mockResolvedValue({
      data: {
        data: [],
        meta: { current_page: 2, last_page: 3, per_page: 10, total: 25, from: 11, to: 20 },
      },
    })

    const { urlService } = await import('@/features/urls/services/urlService')
    await urlService.list({ page: 2, per_page: 10 })

    expect(getMock).toHaveBeenCalledWith('/urls', {
      params: { page: 2, per_page: 10 },
    })
  })

  it('busca analytics de uma URL', async () => {
    getMock.mockResolvedValue({
      data: {
        total_clicks: 10,
        last_7_days: [{ date: '2026-07-18', clicks: 3 }],
      },
    })

    const { urlService } = await import('@/features/urls/services/urlService')
    const response = await urlService.getAnalytics(42)

    expect(getMock).toHaveBeenCalledWith('/urls/42/analytics', { params: undefined })
    expect(response.data.total_clicks).toBe(10)
  })

  it('busca uma URL pelo id', async () => {
    getMock.mockResolvedValue({
      data: { data: { id: 7, slug: 'abc12345' } },
    })

    const { urlService } = await import('@/features/urls/services/urlService')
    await urlService.get(7)

    expect(getMock).toHaveBeenCalledWith('/urls/7', { params: undefined })
  })

  it('cria uma URL', async () => {
    postMock.mockResolvedValue({
      data: { data: { id: 1, original_url: 'https://example.com' } },
    })

    const { urlService } = await import('@/features/urls/services/urlService')
    await urlService.create({ original_url: 'https://example.com' })

    expect(postMock).toHaveBeenCalledWith('/urls', {
      original_url: 'https://example.com',
    })
  })

  it('exclui uma URL', async () => {
    deleteMock.mockResolvedValue({ data: { message: 'ok' } })

    const { urlService } = await import('@/features/urls/services/urlService')
    await urlService.delete(9)

    expect(deleteMock).toHaveBeenCalledWith('/urls/9')
  })
})
