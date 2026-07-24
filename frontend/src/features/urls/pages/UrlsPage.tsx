import { Plus } from 'lucide-react'
import { useState } from 'react'

import { CreateUrlDialog } from '@/features/urls/components/CreateUrlDialog'
import { DeleteUrlAlert } from '@/features/urls/components/DeleteUrlAlert'
import { UrlDataTable } from '@/features/urls/components/UrlDataTable'
import { UrlPagination } from '@/features/urls/components/UrlPagination'
import { useDeleteUrl, useUrls } from '@/features/urls/hooks/useUrls'
import type { Url } from '@/features/urls/types/url'
import { PageHeader } from '@/shared/components/PageHeader'
import { Button } from '@/shared/components/ui/button'

const PER_PAGE = 10

export function UrlsPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching } = useUrls(page, PER_PAGE)
  const deleteUrl = useDeleteUrl()
  const [createOpen, setCreateOpen] = useState(false)
  const [urlToDelete, setUrlToDelete] = useState<Url | null>(null)

  const urls = data?.urls ?? []
  const meta = data?.meta

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHeader
        title="URLs"
        description="Crie, liste e gerencie seus links curtos."
        actions={
          <Button onClick={() => setCreateOpen(true)} className="w-full sm:w-auto">
            <Plus />
            Nova URL
          </Button>
        }
      />

      <div className="space-y-4">
        <UrlDataTable urls={urls} isLoading={isLoading} onDelete={setUrlToDelete} />

        {meta && (
          <UrlPagination
            meta={meta}
            isLoading={isFetching}
            onPageChange={(nextPage) => setPage(nextPage)}
          />
        )}
      </div>

      <CreateUrlDialog open={createOpen} onOpenChange={setCreateOpen} />

      <DeleteUrlAlert
        url={urlToDelete}
        open={urlToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setUrlToDelete(null)
        }}
        isPending={deleteUrl.isPending}
        onConfirm={async () => {
          if (!urlToDelete) return
          await deleteUrl.mutateAsync(urlToDelete.id)
          setUrlToDelete(null)
          if (urls.length === 1 && page > 1) {
            setPage((current) => current - 1)
          }
        }}
      />
    </div>
  )
}
