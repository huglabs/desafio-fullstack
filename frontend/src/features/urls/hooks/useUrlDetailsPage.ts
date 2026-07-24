import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { useUrlAnalytics } from '@/features/urls/hooks/useUrlAnalytics'
import { useUrl } from '@/features/urls/hooks/useUrls'

function parseUrlId(rawUrlId: string | undefined): number | undefined {
  if (rawUrlId === undefined) {
    return undefined
  }

  const parsed = Number(rawUrlId)
  return Number.isNaN(parsed) ? undefined : parsed
}

export function useUrlDetailsPage() {
  const { urlId: rawUrlId } = useParams<{ urlId: string }>()
  const parsedUrlId = parseUrlId(rawUrlId)

  const {
    data: url,
    isLoading: isUrlLoading,
    isError: isUrlError,
    refreshUrl,
  } = useUrl(parsedUrlId)

  const {
    data: analytics,
    isLoading: isAnalyticsLoading,
    isError: isAnalyticsError,
    refreshAnalytics,
  } = useUrlAnalytics(parsedUrlId)

  const [isRefreshing, setIsRefreshing] = useState(false)

  async function handleRefresh() {
    setIsRefreshing(true)

    try {
      await Promise.all([refreshUrl(), refreshAnalytics()])
      toast.success('Dados atualizados')
    } finally {
      setIsRefreshing(false)
    }
  }

  async function copyLink() {
    if (!url) {
      return
    }

    try {
      await navigator.clipboard.writeText(url.short_url)
      toast.success('Link copiado')
    } catch {
      toast.error('Não foi possível copiar')
    }
  }

  return {
    url,
    analytics,
    parsedUrlId,
    isUrlLoading,
    isAnalyticsLoading,
    isUrlError,
    isAnalyticsError,
    isRefreshing,
    handleRefresh,
    copyLink,
  }
}
