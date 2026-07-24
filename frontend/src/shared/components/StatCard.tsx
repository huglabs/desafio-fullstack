import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/skeleton'

interface StatCardProps {
  title: string
  value: string | number
  description?: string
}

export function StatCard({ title, value, description }: StatCardProps) {
  return (
    <Card className="border-border/70 bg-card/80 backdrop-blur-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-display text-3xl font-bold tracking-tight">{value}</p>
        {description && <p className="text-muted-foreground mt-1 text-xs">{description}</p>}
      </CardContent>
    </Card>
  )
}

export function StatCardSkeleton() {
  return (
    <Card className="border-border/70 bg-card/80 backdrop-blur-xl">
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-9 w-16" />
      </CardContent>
    </Card>
  )
}
