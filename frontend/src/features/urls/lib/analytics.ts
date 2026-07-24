import type { AnalyticsDay, UrlAnalytics } from '@/shared/types/analytics'

export function sumLast7DaysClicks(last7Days: AnalyticsDay[]): number {
  return last7Days.reduce((total, day) => total + day.clicks, 0)
}

export function formatAnalyticsChartData(last7Days: AnalyticsDay[]) {
  return last7Days.map((day) => ({
    day: new Date(`${day.date}T00:00:00`).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    }),
    clicks: day.clicks,
  }))
}

export function hasAnalyticsData(analytics: UrlAnalytics | undefined): boolean {
  if (!analytics) return false
  return analytics.total_clicks > 0 || analytics.last_7_days.some((day) => day.clicks > 0)
}
