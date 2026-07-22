import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { AuthErrorAlert } from '@/features/auth/components/AuthErrorAlert'
import { useLogin } from '@/features/auth/hooks/useAuth'
import { loginSchema, type LoginFormData } from '@/features/auth/types/schemas'
import { Button } from '@/shared/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { parseApiError, type ApiFieldErrors } from '@/shared/lib/apiError'

export function LoginForm() {
  const navigate = useNavigate()
  const login = useLogin()
  const [apiMessage, setApiMessage] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<ApiFieldErrors>({})

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    setApiMessage(null)
    setFieldErrors({})

    try {
      await login.mutateAsync(data)
      navigate('/dashboard')
    } catch (error) {
      const parsed = parseApiError(error, 'Não foi possível entrar')

      setApiMessage(parsed.message)
      setFieldErrors(parsed.fieldErrors)

      for (const [field, messages] of Object.entries(parsed.fieldErrors)) {
        if (field in form.getValues()) {
          form.setError(field as keyof LoginFormData, {
            type: 'server',
            message: messages[0],
          })
        }
      }
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {apiMessage && <AuthErrorAlert message={apiMessage} fieldErrors={fieldErrors} />}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="seu@email.com" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={login.isPending}>
          {login.isPending ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </Form>
  )
}
