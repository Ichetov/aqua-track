import { z } from 'zod'

import { AREAS, USER_ROLES } from './user.constants.js'

const passwordSchema = z
  .string()
  .min(8, 'Password must contain at least 8 characters')
  .refine(
    (password) => Buffer.byteLength(password, 'utf8') <= 72,
    'Password is too long',
  )

export const createUserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must contain at least 2 characters'),

  login: z
    .string()
    .trim()
    .min(3, 'Login must contain at least 3 characters')
    .max(50, 'Login must contain no more than 50 characters')
    .transform((login) => login.toLowerCase()),

  password: passwordSchema,

  role: z.enum(USER_ROLES),

  area: z.enum(AREAS).optional(),
})

export type CreateUserDto = z.infer<typeof createUserSchema>