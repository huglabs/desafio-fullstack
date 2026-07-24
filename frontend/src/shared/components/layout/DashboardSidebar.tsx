import { DashboardNavContent } from '@/shared/components/layout/DashboardNavContent'
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import { cn } from '@/shared/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DashboardSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function DashboardSidebar({ collapsed, onToggle }: DashboardSidebarProps) {
  return (
    <aside
      className={cn(
        'border-border/70 bg-card/80 hidden h-svh shrink-0 flex-col border-r backdrop-blur-xl transition-[width] duration-300 lg:flex',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      <div
        className={cn(
          'flex h-16 shrink-0 items-center px-2',
          collapsed ? 'justify-center' : 'justify-between gap-2 px-3',
        )}
      >
        {!collapsed && (
          <p className="font-display truncate text-lg font-bold tracking-tight">
            Encurtador<span className="text-primary">Links</span>
          </p>
        )}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onToggle}
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
          className="size-10 shrink-0"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <Separator className="opacity-60" />

      <DashboardNavContent collapsed={collapsed} />
    </aside>
  )
}
