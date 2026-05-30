import type { Request, Response, NextFunction } from 'express';
import { getWorkTypes } from '../services/workTypes.service.js';

export async function listWorkTypes(_req: Request, res: Response, next: NextFunction) {
  try {
    const workTypes = await getWorkTypes();
    res.json(workTypes);
  } catch (error) {
    next(error);
  }
}
