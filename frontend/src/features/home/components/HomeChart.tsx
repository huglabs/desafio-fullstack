import { formatAnalyticsChartData } from '@/features/urls/lib/analytics'
import type { AnalyticsDay } from '@/shared/types/analytics'
import { chartColors } from '@/shared/design-token'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/components/ui/chart'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const chartConfig = {
  clicks: {
    label: 'Cliques',
    color: chartColors.primary,
  },
}

interface HomeChartProps {
  last7Days: AnalyticsDay[] | undefined
  isLoading: boolean
  isError: boolean
}

export function HomeChart({ last7Days, isLoading, isError }: HomeChartProps) {
  if (isLoading) {
    return <Skeleton className="h-[220px] w-full rounded-xl" />
  }

  if (isError) {
    return (
      <Card className="border-border/70 bg-card/80 backdrop-blur-xl">
        <CardContent className="text-muted-foreground py-10 text-center text-sm">
          Não foi possível carregar o gráfico.
        </CardContent>
      </Card>
    )
  }

  const chartData = formatAnalyticsChartData(last7Days ?? [])

  return (
    <Card className="border-border/70 bg-card/80 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="font-display text-lg">Cliques por dia</CardTitle>
        <CardDescription>Últimos 7 dias — todas as suas URLs</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.every((point) => point.clicks === 0) ? (
          <p className="text-muted-foreground py-16 text-center text-sm">
            Nenhum clique registrado nos últimos 7 dias.
          </p>
        ) : (
          <ChartContainer config={chartConfig} className="h-[220px] w-full">
            <BarChart data={chartData} margin={{ left: -20, right: 8 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="clicks" fill="var(--color-clicks)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
