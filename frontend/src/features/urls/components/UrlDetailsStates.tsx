import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'

export function UrlNotFoundState() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 text-center">
      <p className="font-display text-2xl font-semibold">URL não encontrada</p>
      <Button asChild variant="outline">
        <Link to="/urls">
          <ArrowLeft />
          Voltar às URLs
        </Link>
      </Button>
    </div>
  )
}

export function UrlDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-32 w-full" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
      <Skeleton className="h-72 w-full" />
    </div>
  )
}
