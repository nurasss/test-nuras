import { Router } from 'express';
import { listWorkTypes } from '../controllers/workTypes.controller.js';

export const workTypesRouter = Router();

workTypesRouter.get('/', listWorkTypes);
