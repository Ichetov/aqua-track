import type { RequestHandler } from 'express'

import type { UserRole } from '../../modules/users/user.constants.js'
import { AppError } from '../errors/AppError.js'

export function requireRole(...allowedRoles: UserRole[]): RequestHandler {
  return (req, res, next) => {
    if (!req.user) {
      next(new AppError('Authentication required', 401))
      return
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(new AppError('Forbidden', 403))
      return
    }

    next()
  }
}