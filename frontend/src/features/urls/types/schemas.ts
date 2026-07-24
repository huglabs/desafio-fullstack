import { z } from 'zod'

export const createUrlSchema = z.object({
  original_url: z
    .url('A URL deve ser válida')
    .min(1, 'Informe a URL original'),
  expires_at: z.string().optional(),
  password: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 4, {
      message: 'A senha deve ter pelo menos 4 caracteres',
    }),
})

export type CreateUrlFormData = z.infer<typeof createUrlSchema>
