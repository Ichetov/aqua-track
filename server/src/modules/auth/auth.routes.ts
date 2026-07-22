
import { Router } from 'express'

import type { Router as ExpressRouter } from 'express'

import { requireAuth } from '../../shared/middlewares/requireAuth.js'
import {
  getMe,
  login,
} from './auth.controller.js'

export const authRouter: ExpressRouter = Router()

authRouter.post('/login', login)

authRouter.get('/me', requireAuth, getMe)