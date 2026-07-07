import { Schema, model } from 'mongoose'

import { AREAS, USER_ROLES } from './user.constants.js'

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    login: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      required: true,
      enum: USER_ROLES,
    },

    area: {
      type: String,
      enum: AREAS,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

export const UserModel = model('User', userSchema)