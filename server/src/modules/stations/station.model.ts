import { Schema, model } from 'mongoose'


const stationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    area: {
      type: String,
      required: true,
      enum: ['area_1', 'area_2'],
    },

    address: {
      type: String,
      trim: true,
      default: '',
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export const StationModel = model('Station', stationSchema)