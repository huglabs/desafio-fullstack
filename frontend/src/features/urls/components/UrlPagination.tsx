import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { PaginationMeta } from '@/features/urls/types/url'
import { Button } from '@/shared/components/ui/button'

interface UrlPaginationProps {
  meta: PaginationMeta
  onPageChange: (page: number) => void
  isLoading?: boolean
}

export function UrlPagination({ meta, onPageChange, isLoading }: UrlPaginationProps) {
  if (meta.last_page <= 1) {
    return null
  }

  const from = meta.from ?? 0
  const to = meta.to ?? 0

  return (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-muted-foreground text-center text-sm sm:text-left">
        Mostrando {from}–{to} de {meta.total}
      </p>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex-1 sm:flex-none"
          disabled={isLoading || meta.current_page <= 1}
          onClick={() => onPageChange(meta.current_page - 1)}
        >
          <ChevronLeft />
          Anterior
        </Button>
        <span className="min-w-20 text-center text-sm font-medium">
          {meta.current_page}/{meta.last_page}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex-1 sm:flex-none"
          disabled={isLoading || meta.current_page >= meta.last_page}
          onClick={() => onPageChange(meta.current_page + 1)}
        >
          Próxima
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
