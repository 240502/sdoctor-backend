import { container } from 'tsyringe';

import { Router } from 'express';
import { DegreesController } from '../controllers/degrees.controller';

const degreesRouter = Router();
const degreesController = container.resolve(DegreesController);
degreesRouter.get(
    '/get-all-degrees',
    degreesController.getAllDegrees.bind(degreesController),
);

export default degreesRouter;
