import * as React from 'react'

import { cn } from '@/shared/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('bg-muted/80 animate-pulse rounded-xl', className)} {...props} />
}

export { Skeleton }
