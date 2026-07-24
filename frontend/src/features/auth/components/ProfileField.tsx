import { Skeleton } from '@/shared/components/ui/skeleton'

interface ProfileFieldProps {
  label: string
  value: string
}

export function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-base">{value}</p>
    </div>
  )
}

export function ProfileFieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-5 w-48" />
    </div>
  )
}
