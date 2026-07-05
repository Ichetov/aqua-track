import { z } from 'zod'

export const defectStatusSchema = z.enum([
  'new',
  'in_progress',
  'resolved',
])

export const createDefectSchema = z.object({
  stationId: z.string().min(1, 'Station is required'),

  title: z.string().trim().min(1, 'Title is required'),

  description: z.string().trim().min(1, 'Description is required'),

  nodeType: z.enum(['pump', 'fan', 'heating', 'valve', 'electric', 'other']),
})

export const updateDefectStatusSchema = z.object({
  status: defectStatusSchema,
})

export type CreateDefectDto = z.infer<typeof createDefectSchema>

export type UpdateDefectStatusDto = z.infer<
  typeof updateDefectStatusSchema
>