import { Router } from 'express';
import { container } from 'tsyringe';
import { ScheduleController } from '../controllers/scheduleController';
import { authenticate } from '../middlewares/authMiddleware';
const scheduleRouter = Router();
const scheduleController = container.resolve(ScheduleController);

scheduleRouter.post(
    '/create',
    authenticate,
    scheduleController.createSchedule.bind(scheduleController),
);

scheduleRouter.put(
    '/update',
    authenticate,
    scheduleController.updateSchedule.bind(scheduleController),
);

scheduleRouter.delete(
    '/delete/:id',
    authenticate,
    scheduleController.deleteSchedule.bind(scheduleController),
);
scheduleRouter.post(
    '/view',
    scheduleController.viewSchedule.bind(scheduleController),
);

scheduleRouter.post(
    '/view-for-client',
    scheduleController.viewScheduleForClient.bind(scheduleController),
);

scheduleRouter.post(
    '/view-for-doctor',
    scheduleController.viewScheduleForDoctor.bind(scheduleController),
);
export default scheduleRouter;
