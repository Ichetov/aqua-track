import type {
  Request,
  Response,
  NextFunction,
} from 'express'

import { createUserSchema } from './user.validation.js'
import * as userService from './user.service.js'

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createUserSchema.parse(req.body)

    const user = await userService.createUser(data)

    res.status(201).json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await userService.getUsers()

    res.json({
      success: true,
      data: users,
    })
  } catch (error) {
    next(error)
  }
}