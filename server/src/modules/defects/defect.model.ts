import { Schema, model } from 'mongoose'

const defectSchema = new Schema(
  {
    station: {
      type: Schema.Types.ObjectId,
      ref: 'Station',
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    nodeType: {
      type: String,
      required: true,
      enum: ['pump', 'fan', 'heating', 'valve', 'electric', 'other'],
    },

    status: {
      type: String,
      required: true,
      enum: ['new', 'in_progress', 'resolved'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  },
)

export const DefectModel = model('Defect', defectSchema)