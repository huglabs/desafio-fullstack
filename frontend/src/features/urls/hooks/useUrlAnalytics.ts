import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { DASHBOARD_QUERY_KEY } from '@/features/home/hooks/useHomeDashboard'
import { urlService } from '@/features/urls/services/urlService'

export function urlAnalyticsQueryKey(urlId: number) {
  return ['urls', urlId, 'analytics'] as const
}

export function useUrlAnalytics(urlId: number | undefined) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: urlAnalyticsQueryKey(urlId ?? 0),
    queryFn: async () => {
      const response = await urlService.getAnalytics(urlId!)
      return response.data
    },
    enabled: urlId !== undefined && !Number.isNaN(urlId),
  })

  async function refreshAnalytics() {
    if (urlId === undefined || Number.isNaN(urlId)) {
      return undefined
    }

    const response = await urlService.getAnalytics(urlId, { refresh: true })
    queryClient.setQueryData(urlAnalyticsQueryKey(urlId), response.data)
    queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY })
    return response.data
  }

  return {
    ...query,
    refreshAnalytics,
  }
}
