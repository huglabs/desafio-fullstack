import { StatCard, StatCardSkeleton } from '@/shared/components/StatCard'

interface HomeStatsProps {
  totalUrls: number
  totalClicks: number
  clicksToday: number
  isLoading: boolean
}

export function HomeStats({ totalUrls, totalClicks, clicksToday, isLoading }: HomeStatsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard title="Total de URLs" value={totalUrls} />
      <StatCard title="Total de cliques" value={totalClicks} />
      <StatCard title="Cliques hoje" value={clicksToday} />
    </div>
  )
}
