import { Lock } from 'lucide-react'
import type { ReactNode } from 'react'

import type { Url } from '@/features/urls/types/url'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'

interface UrlInfoCardProps {
  url: Url
}

export function UrlInfoCard({ url }: UrlInfoCardProps) {
  return (
    <Card className="border-border/70 bg-card/80 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="font-display text-lg">Informações</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <InfoRow label="Slug" value={url.slug} />
        <InfoRow label="Link curto" value={url.short_url} />
        <InfoRow
          label="Expira em"
          value={
            url.expires_at ? new Date(url.expires_at).toLocaleString('pt-BR') : 'Sem expiração'
          }
        />
        <InfoRow
          label="Proteção"
          value={
            url.has_password ? (
              <span className="inline-flex items-center gap-1">
                <Lock className="size-3.5" /> Com senha
              </span>
            ) : (
              'Pública'
            )
          }
        />
      </CardContent>
    </Card>
  )
}

function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">{label}</p>
      <p className="mt-1 text-sm break-all">{value}</p>
    </div>
  )
}
