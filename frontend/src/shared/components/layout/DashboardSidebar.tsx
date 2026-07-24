import { useLogout } from '@/features/auth/hooks/useAuth'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip'
import { cn } from '@/shared/lib/utils'
import { ChevronLeft, ChevronRight, Home, Link2, LogOut, UserCircle } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface DashboardSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function DashboardSidebar({ collapsed, onToggle }: DashboardSidebarProps) {
  const user = useAuthStore((state) => state.user)
  const logout = useLogout()

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'flex h-svh shrink-0 flex-col border-r border-border/70 bg-card/80 backdrop-blur-xl transition-[width] duration-300',
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

        <nav className={cn('flex flex-1 flex-col gap-1', collapsed ? 'items-center p-2' : 'p-3')}>
          <SidebarNavItem to="/dashboard" icon={Home} label="Home" collapsed={collapsed} />
          <SidebarNavItem to="/urls" icon={Link2} label="URLs" collapsed={collapsed} />
        </nav>

        <div className={cn(collapsed ? 'p-2' : 'p-3', 'pt-0')}>
          <Separator className="mb-3 opacity-60" />

          {!collapsed && user && (
            <div className="mb-2 rounded-xl bg-muted/50 px-3 py-2">
              <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
          )}

          <div className={cn('flex flex-col gap-1', collapsed && 'items-center')}>
            <SidebarNavItem to="/me" icon={UserCircle} label="Meu perfil" collapsed={collapsed} />
            <SidebarAction
              icon={LogOut}
              label={logout.isPending ? 'Saindo...' : 'Sair'}
              collapsed={collapsed}
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
            />
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}

function SidebarNavItem({
  to,
  icon: Icon,
  label,
  collapsed,
}: {
  to: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  collapsed: boolean
}) {
  const link = (
    <NavLink
      to={to}
      aria-label={label}
      className={({ isActive }) =>
        cn(
          'inline-flex items-center rounded-xl text-sm font-medium transition-colors',
          collapsed ? 'size-10 justify-center' : 'h-11 w-full gap-3 px-3',
          isActive
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-foreground/80 hover:bg-accent hover:text-accent-foreground',
        )
      }
    >
      <Icon className="size-5 shrink-0" aria-hidden />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  )

  if (!collapsed) {
    return link
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex">{link}</span>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

function SidebarAction({
  icon: Icon,
  label,
  collapsed,
  onClick,
  disabled,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  collapsed: boolean
  onClick: () => void
  disabled?: boolean
}) {
  const button = (
    <Button
      type="button"
      variant="ghost"
      aria-label={label}
      className={cn(
        'text-foreground/80 hover:bg-accent hover:text-accent-foreground',
        collapsed ? 'size-10 shrink-0 px-0' : 'h-11 w-full justify-start gap-3 px-3',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="size-5 shrink-0" aria-hidden />
      {!collapsed && <span>{label}</span>}
    </Button>
  )

  if (!collapsed) {
    return button
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex">{button}</span>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}
