import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { env } from '../../config/env.js'
import { AppError } from '../../shared/errors/AppError.js'
import { UserModel } from '../users/user.model.js'
import type { LoginDto } from './auth.validation.js'

export async function login(data: LoginDto) {
  const user = await UserModel.findOne({
    login: data.login,
  }).select('+passwordHash')

  if (!user) {
    throw new AppError('Invalid login or password', 401)
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.passwordHash,
  )

  if (!isPasswordValid) {
    throw new AppError('Invalid login or password', 401)
  }

  if (!user.isActive) {
    throw new AppError('User account is inactive', 403)
  }

  const accessToken = jwt.sign(
    {},
    env.JWT_SECRET,
    {
      subject: user.id,
      expiresIn: env.JWT_ACCESS_TOKEN_TTL,
      algorithm: 'HS256',
    },
  )

  return {
    accessToken,

    user: {
      _id: user._id,
      fullName: user.fullName,
      login: user.login,
      role: user.role,
      area: user.area,
      isActive: user.isActive,
    },
  }
}