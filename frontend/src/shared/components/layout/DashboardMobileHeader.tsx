import { DashboardNavContent } from '@/shared/components/layout/DashboardNavContent'
import { ThemeToggle } from '@/shared/components/ThemeToggle'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { Menu, X } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface DashboardMobileHeaderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DashboardMobileHeader({ open, onOpenChange }: DashboardMobileHeaderProps) {
  const location = useLocation()

  useEffect(() => {
    onOpenChange(false)
  }, [location.pathname, onOpenChange])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="border-border/70 bg-card/90 fixed inset-x-0 top-0 z-40 border-b backdrop-blur-xl lg:hidden">
        <div className="flex h-14 items-center gap-3 px-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => onOpenChange(!open)}
            className="size-10 shrink-0"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>

          <p className="font-display min-w-0 flex-1 truncate text-base font-bold tracking-tight">
            Encurtador<span className="text-primary">Links</span>
          </p>

          <ThemeToggle />
        </div>
      </header>

      {open ? (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 top-14 z-40 bg-black/40 lg:hidden"
          onClick={() => onOpenChange(false)}
        />
      ) : null}

      <div
        className={cn(
          'border-border/70 bg-card/95 fixed inset-x-0 top-14 z-50 max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b shadow-lg transition-all duration-200 lg:hidden',
          open ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible -translate-y-2 opacity-0',
        )}
        aria-hidden={!open}
      >
        <DashboardNavContent onNavigate={() => onOpenChange(false)} />
      </div>
    </>
  )
}
