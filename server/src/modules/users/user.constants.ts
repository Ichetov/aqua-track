export const USER_ROLES = [
  'workshop_manager',
  'area_manager',
  'worker',
] as const

export const AREAS = ['area_1', 'area_2'] as const

export type UserRole = (typeof USER_ROLES)[number]
export type Area = (typeof AREAS)[number]