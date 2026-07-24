import { formatAnalyticsChartData } from '@/features/urls/lib/analytics'
import type { UrlAnalytics } from '@/features/urls/types/analytics'
import { chartColors } from '@/shared/design-token'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/components/ui/chart'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const chartConfig = {
  clicks: {
    label: 'Cliques',
    color: chartColors.primary,
  },
}

interface UrlAnalyticsChartProps {
  analytics: UrlAnalytics | undefined
  isLoading: boolean
  isError: boolean
}

export function UrlAnalyticsChart({ analytics, isLoading, isError }: UrlAnalyticsChartProps) {
  if (isLoading) {
    return <Skeleton className="h-[280px] w-full rounded-xl" />
  }

  if (isError) {
    return (
      <Card className="border-border/70 bg-card/80 backdrop-blur-xl">
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          Não foi possível carregar os analytics desta URL.
        </CardContent>
      </Card>
    )
  }

  const chartData = formatAnalyticsChartData(analytics?.last_7_days ?? [])

  return (
    <Card className="border-border/70 bg-card/80 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="font-display text-lg">Cliques por dia</CardTitle>
        <CardDescription>Últimos 7 dias</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.every((point) => point.clicks === 0) ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Nenhum clique registrado nos últimos 7 dias.
          </p>
        ) : (
          <ChartContainer config={chartConfig} className="h-[280px] w-full">
            <AreaChart data={chartData} margin={{ left: -20, right: 8 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="var(--color-clicks)"
                fill="var(--color-clicks)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
