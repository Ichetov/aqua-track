import { Router } from 'express'

import { createDefect, getDefects } from './defect.controller.js'
import type { Router as ExpressRouter } from 'express'

export const defectRouter: ExpressRouter = Router()

defectRouter.get('/', getDefects)
defectRouter.post('/', createDefect)