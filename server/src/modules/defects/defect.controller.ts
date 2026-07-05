import type { Request, Response, NextFunction } from 'express'

import { createDefectSchema, updateDefectStatusSchema } from './defect.validation.js'
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


type UpdateDefectStatusParams = {
  defectId: string
}

export async function updateDefectStatus(
  req: Request<UpdateDefectStatusParams>,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = updateDefectStatusSchema.parse(req.body)

    const defect = await defectService.updateDefectStatus(
      req.params.defectId,
      data,
    )

    res.json({
      success: true,
      data: defect,
    })
  } catch (error) {
    next(error)
  }
}