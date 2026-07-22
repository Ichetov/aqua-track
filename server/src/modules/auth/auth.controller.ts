import type {
  Request,
  Response,
  NextFunction,
} from 'express'

import { AppError } from '../../shared/errors/AppError.js'
import { loginSchema } from './auth.validation.js'
import * as authService from './auth.service.js'

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = loginSchema.parse(req.body)

    const result = await authService.login(data)

    res.json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export async function getMe(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401)
    }

    res.json({
      success: true,
      data: req.user,
    })
  } catch (error) {
    next(error)
  }
}