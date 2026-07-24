import { UrlAnalyticsChart } from '@/features/urls/components/UrlAnalyticsChart'
import { UrlAnalyticsStats } from '@/features/urls/components/UrlAnalyticsStats'
import { UrlDetailsHeader } from '@/features/urls/components/UrlDetailsHeader'
import { UrlDetailsSkeleton, UrlNotFoundState } from '@/features/urls/components/UrlDetailsStates'
import { UrlInfoCard } from '@/features/urls/components/UrlInfoCard'
import { useUrlDetailsPage } from '@/features/urls/hooks/useUrlDetailsPage'
import { sumLast7DaysClicks } from '@/features/urls/lib/analytics'

export function UrlDetailsPage() {
  const {
    url,
    analytics,
    isUrlLoading,
    isAnalyticsLoading,
    isUrlError,
    isAnalyticsError,
    isRefreshing,
    handleRefresh,
    copyLink,
  } = useUrlDetailsPage()

  if (isUrlLoading) {
    return <UrlDetailsSkeleton />
  }

  if (isUrlError || !url) {
    return <UrlNotFoundState />
  }

  const clicksInLast7Days = analytics ? sumLast7DaysClicks(analytics.last_7_days) : 0

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <UrlDetailsHeader
        url={url}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        onCopy={copyLink}
      />

      <UrlInfoCard url={url} />

      <UrlAnalyticsStats
        analytics={analytics}
        clicksInLast7Days={clicksInLast7Days}
        isLoading={isAnalyticsLoading}
      />

      <UrlAnalyticsChart
        analytics={analytics}
        isLoading={isAnalyticsLoading}
        isError={isAnalyticsError}
      />
    </div>
  )
}
