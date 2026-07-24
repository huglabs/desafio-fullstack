import type { AnalyticsDay } from '@/shared/types/analytics'

export interface HomeDashboard {
  total_urls: number
  total_clicks: number
  clicks_today: number
  last_7_days: AnalyticsDay[]
}
