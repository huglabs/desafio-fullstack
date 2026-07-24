import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { homeService } from '@/features/home/services/homeService'

export const DASHBOARD_QUERY_KEY = ['dashboard'] as const

export function useHomeDashboard() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: async () => {
      const response = await homeService.getDashboard()
      return response.data
    },
  })

  async function refreshDashboard() {
    const response = await homeService.getDashboard({ refresh: true })
    queryClient.setQueryData(DASHBOARD_QUERY_KEY, response.data)
    toast.success('Dados atualizados')
    return response.data
  }

  return {
    ...query,
    refreshDashboard,
  }
}
