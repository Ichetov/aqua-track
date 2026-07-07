import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),

  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),

  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET must contain at least 32 characters'),

  JWT_ACCESS_TOKEN_TTL: z
    .enum(['15m', '30m', '1h'])
    .default('15m'),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('Invalid environment variables')
  console.error(parsedEnv.error.flatten().fieldErrors)

  process.exit(1)
}

export const env = parsedEnv.data