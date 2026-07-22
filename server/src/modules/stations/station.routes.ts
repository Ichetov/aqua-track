
import { Router } from 'express'
import type { Router as ExpressRouter } from 'express'
import { requireAuth } from '../../shared/middlewares/requireAuth.js'
import { requireRole } from '../../shared/middlewares/requireRole.js'
import {
  createStation,
  getStations,
} from './station.controller.js'

export const stationRouter: ExpressRouter = Router()

stationRouter.use(requireAuth)

stationRouter.get('/', getStations)

stationRouter.post(
  '/',
  requireRole('workshop_manager'),
  createStation,
)