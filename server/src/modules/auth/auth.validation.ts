import { z } from 'zod'

export const loginSchema = z.object({
  login: z
    .string()
    .trim()
    .min(1, 'Login is required')
    .transform((login) => login.toLowerCase()),

  password: z.string().min(1, 'Password is required'),
})

export type LoginDto = z.infer<typeof loginSchema>