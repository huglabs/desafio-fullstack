import { useMe } from '@/features/auth/hooks/useAuth'
import { DashboardMobileHeader } from '@/shared/components/layout/DashboardMobileHeader'
import { DashboardSidebar } from '@/shared/components/layout/DashboardSidebar'
import { ThemeToggle } from '@/shared/components/ThemeToggle'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useMe()

  return (
    <div className="auth-shell flex min-h-svh flex-col lg:flex-row">
      <div className="auth-grid pointer-events-none fixed inset-0 opacity-40 dark:opacity-20" />

      <DashboardSidebar collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <DashboardMobileHeader open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />

        <div className="absolute top-4 right-4 z-20 hidden lg:block">
          <ThemeToggle />
        </div>

        <main className="flex-1 overflow-y-auto p-4 pt-[4.5rem] sm:p-6 sm:pt-[4.5rem] lg:p-8 lg:pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
