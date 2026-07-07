import bcrypt from 'bcryptjs'

import { AppError } from '../../shared/errors/AppError.js'
import { UserModel } from './user.model.js'
import type { CreateUserDto } from './user.validation.js'

export async function createUser(data: CreateUserDto) {
  const existingUser = await UserModel.exists({
    login: data.login,
  })

  if (existingUser) {
    throw new AppError('User with this login already exists', 409)
  }

  if (data.role === 'workshop_manager' && data.area) {
    throw new AppError(
      'Workshop manager must not belong to a specific area',
      400,
    )
  }

  if (data.role !== 'workshop_manager' && !data.area) {
    throw new AppError(
      'Area is required for area managers and workers',
      400,
    )
  }

  const passwordHash = await bcrypt.hash(data.password, 12)

  const user = await UserModel.create({
    fullName: data.fullName,
    login: data.login,
    passwordHash,
    role: data.role,
      ...(data.area !== undefined
      ? { area: data.area }
      : {})
  })

  return {
    _id: user._id,
    fullName: user.fullName,
    login: user.login,
    role: user.role,
    area: user.area,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

export async function getUsers() {
  const users = await UserModel.find().sort({
    createdAt: -1,
  })

  return users
}