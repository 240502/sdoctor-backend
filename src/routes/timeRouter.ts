import { Router } from 'express';
import { container } from 'tsyringe';
import { TimeController } from '../controllers/timeController';
const timeRouter = Router();
const timeController = container.resolve(TimeController);
timeRouter.get(
    '/get-by-id/:id',
    timeController.getTimeById.bind(timeController),
);

timeRouter.post(
    '/get-by-type',
    timeController.getTimeByTimeType.bind(timeController),
);
export default timeRouter;
