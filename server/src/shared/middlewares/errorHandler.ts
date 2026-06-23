import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError.js'

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(error)

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