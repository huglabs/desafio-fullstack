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

export function UrlDetailsHeader({
  url,
  isRefreshing,
  onRefresh,
  onCopy,
}: UrlDetailsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-3">
        <Button asChild variant="ghost" className="h-auto px-0 text-muted-foreground">
          <Link to="/urls">
            <ArrowLeft />
            Voltar
          </Link>
        </Button>
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="mt-1 break-all text-muted-foreground">{url.original_url}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <RefreshButton isRefreshing={isRefreshing} onRefresh={onRefresh} />
        <Button variant="outline" onClick={onCopy}>
          <Copy />
          Copiar
        </Button>
        <Button asChild variant="outline">
          <a href={url.short_url} target="_blank" rel="noreferrer">
            <ExternalLink />
            Abrir curta
          </a>
        </Button>
      </div>
    </div>
  )
}
