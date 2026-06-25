import { Router } from 'express'

import { createStation, getStations } from './station.controller.js'

import type { Router as ExpressRouter } from 'express'

export const stationRouter: ExpressRouter = Router()
stationRouter.get('/', getStations)
stationRouter.post('/', createStation)