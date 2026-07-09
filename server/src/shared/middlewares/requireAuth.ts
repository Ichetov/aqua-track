import type { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'

import { env } from '../../config/env.js'
import type { Area } from '../../modules/users/user.constants.js'
import { UserModel } from '../../modules/users/user.model.js'
import { AppError } from '../errors/AppError.js'
import type { AuthUser } from '../types/auth.js'

export const requireAuth: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError('Authorization token is required', 401)
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      throw new AppError('Authorization token is required', 401)
    }

    const decoded = jwt.verify(token, env.JWT_SECRET)

    if (typeof decoded === 'string') {
      throw new AppError('Invalid token', 401)
    }

    const payload = decoded as JwtPayload

    if (!payload.sub) {
      throw new AppError('Invalid token', 401)
    }

    const user = await UserModel.findById(payload.sub)

    if (!user) {
      throw new AppError('User not found', 401)
    }

    if (!user.isActive) {
      throw new AppError('User account is inactive', 403)
    }

    const authUser: AuthUser = {
      _id: user.id,
      fullName: user.fullName,
      login: user.login,
      role: user.role as AuthUser['role'],
      isActive: user.isActive,
    }

    const area = user.area

    if (area) {
      authUser.area = area as Area
    }

    req.user = authUser

    next()
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      next(new AppError('Invalid or expired token', 401))
      return
    }

    next(error)
  }
}