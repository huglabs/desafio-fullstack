import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
})

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Nome obrigatório'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
    password_confirmation: z.string().min(1, 'Confirmação obrigatória'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas não coincidem',
    path: ['password_confirmation'],
  })

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
