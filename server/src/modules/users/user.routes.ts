import { Router } from 'express'
import type { Router as ExpressRouter } from 'express'
import {
  createUser,
  getUsers,
} from './user.controller.js'

export const userRouter: ExpressRouter = Router()

userRouter.get('/', getUsers)
userRouter.post('/', createUser)