import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { DASHBOARD_QUERY_KEY } from '@/features/home/hooks/useHomeDashboard'
import { urlAnalyticsQueryKey } from '@/features/urls/hooks/useUrlAnalytics'
import { urlService } from '@/features/urls/services/urlService'
import type { CreateUrlPayload } from '@/features/urls/types/url'
import { getApiErrorMessage } from '@/shared/lib/apiError'

export const URLS_QUERY_KEY = ['urls'] as const

export function urlsQueryKey(page: number, perPage = 10) {
  return [...URLS_QUERY_KEY, { page, perPage }] as const
}

export function urlDetailQueryKey(urlId: number) {
  return [...URLS_QUERY_KEY, 'detail', urlId] as const
}

export function useUrls(page = 1, perPage = 10) {
  return useQuery({
    queryKey: urlsQueryKey(page, perPage),
    queryFn: async () => {
      const response = await urlService.list({ page, per_page: perPage })
      return {
        urls: response.data.data,
        meta: response.data.meta,
      }
    },
  })
}

export function useUrl(urlId: number | undefined) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: urlDetailQueryKey(urlId ?? 0),
    queryFn: async () => {
      const response = await urlService.get(urlId!)
      return response.data.data
    },
    enabled: urlId !== undefined && !Number.isNaN(urlId),
  })

  async function refreshUrl() {
    if (urlId === undefined || Number.isNaN(urlId)) {
      return undefined
    }

    const response = await urlService.get(urlId, { refresh: true })
    queryClient.setQueryData(urlDetailQueryKey(urlId), response.data.data)
    return response.data.data
  }

  return {
    ...query,
    refreshUrl,
  }
}

export function useCreateUrl() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateUrlPayload) => {
      const response = await urlService.create(payload)
      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: URLS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY })
      toast.success('URL criada com sucesso')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Não foi possível criar a URL'))
    },
  })
}

export function useDeleteUrl() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await urlService.delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: URLS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY })
      toast.success('URL excluída com sucesso')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Não foi possível excluir a URL'))
    },
  })
}
