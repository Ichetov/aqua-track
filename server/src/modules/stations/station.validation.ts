import { z } from 'zod'

export const createStationSchema = z.object({
  name: z.string().trim().min(1, 'Station name is required'),

  area: z.enum(['area_1', 'area_2']),

address: z.string().trim().default(''),
})

export type CreateStationDto = z.infer<typeof createStationSchema>