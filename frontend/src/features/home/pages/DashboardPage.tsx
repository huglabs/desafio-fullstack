import { useState } from 'react'

import { HomeChart } from '@/features/home/components/HomeChart'
import { HomeStats } from '@/features/home/components/HomeStats'
import { useHomeDashboard } from '@/features/home/hooks/useHomeDashboard'
import { PageHeader } from '@/shared/components/PageHeader'
import { RefreshButton } from '@/shared/components/RefreshButton'

export function DashboardPage() {
  const {
    data: dashboard,
    isLoading,
    isError,
    refreshDashboard,
  } = useHomeDashboard()
  const [isRefreshing, setIsRefreshing] = useState(false)

  async function handleRefresh() {
    setIsRefreshing(true)

    try {
      await refreshDashboard()
    } finally {
      setIsRefreshing(false)
    }
  }

  const isBusy = isLoading || isRefreshing

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHeader
        title="Home"
        description="Visão geral dos seus links e cliques."
        actions={
          <RefreshButton
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
            disabled={isLoading}
          />
        }
      />

      <HomeStats
        isLoading={isBusy}
        totalUrls={dashboard?.total_urls ?? 0}
        totalClicks={dashboard?.total_clicks ?? 0}
        clicksToday={dashboard?.clicks_today ?? 0}
      />

      <HomeChart
        last7Days={dashboard?.last_7_days}
        isLoading={isBusy}
        isError={isError}
      />
    </div>
  )
}
