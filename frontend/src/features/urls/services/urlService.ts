import type { UrlAnalytics } from '@/features/urls/types/analytics'
import type {
  CreateUrlPayload,
  ListUrlsParams,
  UrlListResponse,
  UrlResponse,
} from '@/features/urls/types/url'
import api from '@/shared/lib/api'

type RequestOptions = {
  refresh?: boolean
}

export const urlService = {
  list(params: ListUrlsParams = {}) {
    return api.get<UrlListResponse>('/urls', {
      params: {
        page: params.page ?? 1,
        per_page: params.per_page ?? 10,
        ...(params.refresh ? { refresh: 1 } : {}),
      },
    })
  },

  get(id: number, { refresh = false }: RequestOptions = {}) {
    return api.get<UrlResponse>(`/urls/${id}`, {
      params: refresh ? { refresh: 1 } : undefined,
    })
  },

  create(payload: CreateUrlPayload) {
    return api.post<UrlResponse>('/urls', payload)
  },

  delete(id: number) {
    return api.delete<{ message: string }>(`/urls/${id}`)
  },

  getAnalytics(id: number, { refresh = false }: RequestOptions = {}) {
    return api.get<UrlAnalytics>(`/urls/${id}/analytics`, {
      params: refresh ? { refresh: 1 } : undefined,
    })
  },
}
