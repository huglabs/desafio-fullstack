import { useLogout } from '@/features/auth/hooks/useAuth'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'
import { cn } from '@/shared/lib/utils'
import { Home, Link2, LogOut, UserCircle } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface DashboardNavContentProps {
  collapsed?: boolean
  onNavigate?: () => void
}

export function DashboardNavContent({ collapsed = false, onNavigate }: DashboardNavContentProps) {
  const user = useAuthStore((state) => state.user)
  const logout = useLogout()

  return (
    <TooltipProvider delayDuration={0}>
      <nav
        className={cn(
          'flex flex-col gap-1',
          !onNavigate && 'flex-1',
          collapsed ? 'items-center p-2' : 'p-3',
        )}
      >
        <SidebarNavItem
          to="/dashboard"
          icon={Home}
          label="Home"
          collapsed={collapsed}
          onNavigate={onNavigate}
        />
        <SidebarNavItem
          to="/urls"
          icon={Link2}
          label="URLs"
          collapsed={collapsed}
          onNavigate={onNavigate}
        />
      </nav>

      <div className={cn(collapsed ? 'p-2' : 'p-3', 'pt-0')}>
        <Separator className="mb-3 opacity-60" />

        {!collapsed && user && (
          <div className="bg-muted/50 mb-2 rounded-xl px-3 py-2">
            <p className="text-foreground truncate text-sm font-medium">{user.name}</p>
            <p className="text-muted-foreground truncate text-xs">{user.email}</p>
          </div>
        )}

        <div className={cn('flex flex-col gap-1', collapsed && 'items-center')}>
          <SidebarNavItem
            to="/me"
            icon={UserCircle}
            label="Meu perfil"
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
          <SidebarAction
            icon={LogOut}
            label={logout.isPending ? 'Saindo...' : 'Sair'}
            collapsed={collapsed}
            disabled={logout.isPending}
            onClick={() => {
              onNavigate?.()
              logout.mutate()
            }}
          />
        </div>
      </div>
    </TooltipProvider>
  )
}

function SidebarNavItem({
  to,
  icon: Icon,
  label,
  collapsed,
  onNavigate,
}: {
  to: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  collapsed: boolean
  onNavigate?: () => void
}) {
  const link = (
    <NavLink
      to={to}
      aria-label={label}
      onClick={onNavigate}
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
