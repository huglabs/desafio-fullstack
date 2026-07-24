import type { ReactNode } from 'react'

import { ThemeToggle } from '@/shared/components/ThemeToggle'
import { cn } from '@/shared/lib/utils'

interface AppShellProps {
  children: ReactNode
  className?: string
  gridClassName?: string
}

export function AppShell({ children, className, gridClassName }: AppShellProps) {
  return (
    <div
      className={cn(
        'auth-shell relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-10',
        className,
      )}
    >
      <div
        className={cn(
          'auth-grid pointer-events-none absolute inset-0 opacity-60 dark:opacity-30',
          gridClassName,
        )}
      />

      <div className="absolute top-4 right-4 z-20 sm:top-6 sm:right-6">
        <ThemeToggle />
      </div>

      {children}
    </div>
  )
}
