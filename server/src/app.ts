import express, { type Express } from 'express'
import cors from 'cors'

import { healthRouter } from './modules/health/health.routes.js'
import { notFoundHandler } from './shared/middlewares/notFoundHandler.js'
import { errorHandler } from './shared/middlewares/errorHandler.js'

export const app: Express = express()

app.use(cors())
app.use(express.json())

app.use('/api/health', healthRouter)

app.use(notFoundHandler)
app.use(errorHandler)