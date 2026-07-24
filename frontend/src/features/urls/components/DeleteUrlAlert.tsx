import type { Url } from '@/features/urls/types/url'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog'
import { Button } from '@/shared/components/ui/button'

interface DeleteUrlAlertProps {
  url: Url | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isPending: boolean
}

export function DeleteUrlAlert({
  url,
  open,
  onOpenChange,
  onConfirm,
  isPending,
}: DeleteUrlAlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir URL?</AlertDialogTitle>
          <AlertDialogDescription>
            {url
              ? `O link ${url.short_url} será removido permanentemente.`
              : 'Esta ação não pode ser desfeita.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <Button variant="destructive" onClick={onConfirm} disabled={isPending}>
            {isPending ? 'Excluindo...' : 'Excluir'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
