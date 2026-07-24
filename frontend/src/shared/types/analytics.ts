export interface AnalyticsDay {
  date: string
  clicks: number
}

export interface UrlAnalytics {
  total_clicks: number
  last_7_days: AnalyticsDay[]
}
