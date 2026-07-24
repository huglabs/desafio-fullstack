import type { UrlAnalytics } from '@/shared/types/analytics'
import { StatCard } from '@/shared/components/StatCard'
import { Skeleton } from '@/shared/components/ui/skeleton'

interface UrlAnalyticsStatsProps {
  analytics: UrlAnalytics | undefined
  clicksInLast7Days: number
  isLoading: boolean
}

export function UrlAnalyticsStats({
  analytics,
  clicksInLast7Days,
  isLoading,
}: UrlAnalyticsStatsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-28 w-full rounded-xl" />
        <Skeleton className="h-28 w-full rounded-xl" />
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <StatCard title="Total de cliques" value={analytics?.total_clicks ?? 0} />
      <StatCard title="Últimos 7 dias" value={clicksInLast7Days} />
    </div>
  )
}
