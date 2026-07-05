import mongoose from 'mongoose'

import { AppError } from '../../shared/errors/AppError.js'
import { StationModel } from '../stations/station.model.js'
import { DefectModel } from './defect.model.js'
import type { CreateDefectDto, UpdateDefectStatusDto } from './defect.validation.js'

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


export async function updateDefectStatus(
  defectId: string ,
  data: UpdateDefectStatusDto,
) {
  if (!mongoose.Types.ObjectId.isValid(defectId)) {
    throw new AppError('Invalid defect id', 400)
  }

  const defect = await DefectModel.findByIdAndUpdate(
    defectId,
    {
      status: data.status,
    },
    {
      new: true,
      runValidators: true,
    },
  ).populate('station')

  if (!defect) {
    throw new AppError('Defect not found', 404)
  }

  return defect
}