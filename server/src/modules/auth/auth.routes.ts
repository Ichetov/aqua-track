import { Router } from 'express'
import type { Router as ExpressRouter } from 'express'

import { login } from './auth.controller.js'

export const authRouter: ExpressRouter = Router()

authRouter.post('/login', login)