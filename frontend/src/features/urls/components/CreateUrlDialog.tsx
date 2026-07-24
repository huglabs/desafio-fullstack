import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ExpiresAtField } from '@/features/urls/components/ExpiresAtField'
import { useCreateUrl } from '@/features/urls/hooks/useUrls'
import { createUrlSchema, type CreateUrlFormData } from '@/features/urls/types/schemas'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { PasswordInput } from '@/shared/components/ui/password-input'
import { parseApiError } from '@/shared/lib/apiError'

interface CreateUrlDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateUrlDialog({ open, onOpenChange }: CreateUrlDialogProps) {
  const createUrl = useCreateUrl()

  const form = useForm<CreateUrlFormData>({
    resolver: zodResolver(createUrlSchema),
    defaultValues: {
      original_url: '',
      expires_at: '',
      password: '',
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createUrl.mutateAsync({
        original_url: data.original_url,
        expires_at: data.expires_at ? new Date(data.expires_at).toISOString() : null,
        password: data.password || null,
      })
      form.reset()
      onOpenChange(false)
    } catch (error) {
      const parsed = parseApiError(error, 'Não foi possível criar a URL')
      for (const [field, messages] of Object.entries(parsed.fieldErrors)) {
        if (field in form.getValues()) {
          form.setError(field as keyof CreateUrlFormData, {
            type: 'server',
            message: messages[0],
          })
        }
      }
    }
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nova URL</DialogTitle>
          <DialogDescription>
            Cole a URL original. Expiração e senha são opcionais.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="original_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL original</FormLabel>
                  <FormControl>
                    <Input placeholder="https://exemplo.com/pagina" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expires_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expira em (opcional)</FormLabel>
                  <ExpiresAtField
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={createUrl.isPending}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha de acesso (opcional)</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Proteger link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={createUrl.isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={createUrl.isPending}>
                {createUrl.isPending ? 'Criando...' : 'Criar URL'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
