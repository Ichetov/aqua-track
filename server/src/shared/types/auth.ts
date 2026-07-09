import type { Area, UserRole } from '../../modules/users/user.constants.js'

export type AuthUser = {
  _id: string
  fullName: string
  login: string
  role: UserRole
  area?: Area
  isActive: boolean
}