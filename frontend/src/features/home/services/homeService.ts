import type { HomeDashboard } from '@/features/home/types/dashboard'
import api from '@/shared/lib/api'

type GetDashboardParams = {
  refresh?: boolean
}

export const homeService = {
  getDashboard({ refresh = false }: GetDashboardParams = {}) {
    return api.get<HomeDashboard>('/dashboard', {
      params: refresh ? { refresh: 1 } : undefined,
    })
  },
}
