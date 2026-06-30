import mongoose from 'mongoose'

import { AppError } from '../../shared/errors/AppError.js'
import { StationModel } from '../stations/station.model.js'
import { DefectModel } from './defect.model.js'
import type { CreateDefectDto } from './defect.validation.js'

export async function createDefect(data: CreateDefectDto) {
  if (!mongoose.Types.ObjectId.isValid(data.stationId)) {
    throw new AppError('Invalid station id', 400)
  }

  const station = await StationModel.findById(data.stationId)

  if (!station) {
    throw new AppError('Station not found', 404)
  }

  const defect = await DefectModel.create({
    station: data.stationId,
    title: data.title,
    description: data.description,
    nodeType: data.nodeType,
  })

  return defect
}

export async function getDefects() {
  const defects = await DefectModel.find()
    .populate('station')
    .sort({ createdAt: -1 })

  return defects
}