import express, { type Express } from 'express'
import cors from 'cors'
import { stationRouter } from './modules/stations/station.routes.js'
import { healthRouter } from './modules/health/health.routes.js'
import { notFoundHandler } from './shared/middlewares/notFoundHandler.js'
import { errorHandler } from './shared/middlewares/errorHandler.js'
import { defectRouter } from './modules/defects/defect.routes.js'
import { userRouter } from './modules/users/user.routes.js'
import { authRouter } from './modules/auth/auth.routes.js'

export const app: Express = express()

app.use(cors())
app.use(express.json())

app.use('/api/health', healthRouter)
app.use('/api/stations', stationRouter)
app.use('/api/defects', defectRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

app.use(notFoundHandler)
app.use(errorHandler)







