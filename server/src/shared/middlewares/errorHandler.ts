import type { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

import { AppError } from '../errors/AppError.js'

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(error)

  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    })

    return
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    })

    return
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  })
}