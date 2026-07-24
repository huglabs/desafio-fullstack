import { RefreshCw } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'

interface RefreshButtonProps {
  isRefreshing: boolean
  onRefresh: () => void
  disabled?: boolean
}

export function RefreshButton({ isRefreshing, onRefresh, disabled }: RefreshButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onRefresh}
      disabled={disabled || isRefreshing}
      aria-busy={isRefreshing}
    >
      <RefreshCw className={isRefreshing ? 'animate-spin' : undefined} />
      {isRefreshing ? 'Atualizando...' : 'Atualizar'}
    </Button>
  )
}
