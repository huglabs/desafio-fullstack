import { useMe } from '@/features/auth/hooks/useAuth'
import { DashboardSidebar } from '@/shared/components/layout/DashboardSidebar'
import { ThemeToggle } from '@/shared/components/ThemeToggle'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)

  useMe()

  return (
    <div className="auth-shell flex min-h-svh">
      <div className="auth-grid pointer-events-none fixed inset-0 opacity-40 dark:opacity-20" />

      <DashboardSidebar collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
          <ThemeToggle />
        </div>

        <main className={cn('flex-1 overflow-y-auto p-4 pt-16 sm:p-6 sm:pt-16 lg:p-8 lg:pt-16')}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
