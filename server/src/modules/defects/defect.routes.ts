import { Router } from 'express'

import { createDefect, getDefects } from './defect.controller.js'
import type { Router as ExpressRouter } from 'express'
import { updateDefectStatus } from './defect.controller.js'

export const defectRouter: ExpressRouter = Router()

defectRouter.get('/', getDefects)
defectRouter.post('/', createDefect)
defectRouter.patch('/:defectId/status', updateDefectStatus)