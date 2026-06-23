import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError.js'


export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next(new AppError(`API route ${req.originalUrl} does not exist`, 404))
}