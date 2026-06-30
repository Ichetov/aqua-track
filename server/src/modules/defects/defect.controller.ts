import type { Request, Response, NextFunction } from 'express'

import { createDefectSchema } from './defect.validation.js'
import * as defectService from './defect.service.js'

export async function createDefect(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createDefectSchema.parse(req.body)

    const defect = await defectService.createDefect(data)

    res.status(201).json({
      success: true,
      data: defect,
    })
  } catch (error) {
    next(error)
  }
}

export async function getDefects(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const defects = await defectService.getDefects()

    res.json({
      success: true,
      data: defects,
    })
  } catch (error) {
    next(error)
  }
}