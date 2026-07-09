import { Router } from 'express'

import { requireAuth } from '../../shared/middlewares/requireAuth.js'
import { requireRole } from '../../shared/middlewares/requireRole.js'
import { createUser, getUsers } from './user.controller.js'
import type { Router as ExpressRouter } from 'express'

export const userRouter: ExpressRouter = Router()

userRouter.get(
  '/',
  requireAuth,
  requireRole('workshop_manager'),
  getUsers,
)

userRouter.post(
  '/',
  requireAuth,
  requireRole('workshop_manager'),
  createUser,
)