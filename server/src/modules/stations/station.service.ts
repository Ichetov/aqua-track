import { AppError } from '../../shared/errors/AppError.js'
import type { AuthUser } from '../../shared/types/auth.js'
import { StationModel } from './station.model.js'
import type { CreateStationDto } from './station.validation.js'

export async function createStation(data: CreateStationDto) {
  const station = await StationModel.create(data)

  return station
}

export async function getStations(currentUser: AuthUser) {
  if (currentUser.role === 'workshop_manager') {
    return StationModel.find().sort({
      name: 1,
    })
  }

  if (!currentUser.area) {
    throw new AppError('User area is not assigned', 403)
  }

  return StationModel.find({
    area: currentUser.area,
  }).sort({
    name: 1,
  })
}