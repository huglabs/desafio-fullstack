import { ArrowLeft, Copy, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { Url } from '@/features/urls/types/url'
import { RefreshButton } from '@/shared/components/RefreshButton'
import { Button } from '@/shared/components/ui/button'

interface UrlDetailsHeaderProps {
  url: Url
  isRefreshing: boolean
  onRefresh: () => void
  onCopy: () => void
}

export function UrlDetailsHeader({ url, isRefreshing, onRefresh, onCopy }: UrlDetailsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-3">
        <Button asChild variant="ghost" className="text-muted-foreground h-auto px-0">
          <Link to="/urls">
            <ArrowLeft />
            Voltar
          </Link>
        </Button>
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Analytics</h1>
          <p className="text-muted-foreground mt-1 text-sm break-all sm:text-base">{url.original_url}</p>
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-2 sm:w-auto">
        <RefreshButton isRefreshing={isRefreshing} onRefresh={onRefresh} />
        <Button variant="outline" onClick={onCopy} className="flex-1 sm:flex-none">
          <Copy />
          Copiar
        </Button>
        <Button asChild variant="outline" className="flex-1 sm:flex-none">
          <a href={url.short_url} target="_blank" rel="noreferrer">
            <ExternalLink />
            Abrir curta
          </a>
        </Button>
      </div>
    </div>
  )
}
