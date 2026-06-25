import { StationModel } from './station.model.js'
import type { CreateStationDto } from './station.validation.js'

export async function createStation(data: CreateStationDto) {
  const station = await StationModel.create(data)

  return station
}

export async function getStations() {
  const stations = await StationModel.find().sort({ createdAt: -1 })

  return stations
}