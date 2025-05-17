import { container } from 'tsyringe';
import { Router } from 'express';
import { WorkingHoursController } from '../controllers/working_hours.controller';

const workingHoursRouter = Router();
const workingHoursController = container.resolve(WorkingHoursController);

workingHoursRouter.get(
    '/create',
    workingHoursController.createWorkingHours.bind(workingHoursController),
);

export default workingHoursRouter;
