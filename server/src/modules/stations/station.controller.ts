import type {
  Request,
  Response,
  NextFunction,
} from 'express'

import { AppError } from '../../shared/errors/AppError.js'
import { createStationSchema } from './station.validation.js'
import * as stationService from './station.service.js'

export async function createStation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createStationSchema.parse(req.body)

    const station = await stationService.createStation(data)

    res.status(201).json({
      success: true,
      data: station,
    })
  } catch (error) {
    next(error)
  }
}

export async function getStations(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401)
    }

    const stations = await stationService.getStations(
      req.user,
    )

    res.json({
      success: true,
      data: stations,
    })
  } catch (error) {
    next(error)
  }
}