import type {
  Request,
  Response,
  NextFunction,
} from 'express'

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