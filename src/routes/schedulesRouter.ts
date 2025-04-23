import { Router } from 'express';
import { container } from 'tsyringe';
import { ScheduleController } from '../controllers/schedule.controller';
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
    '/get-schedules-by-entityId',
    scheduleController.viewSchedules.bind(scheduleController),
);

scheduleRouter.put(
    '/update-schedule-status',
    scheduleController.updateScheduleStatus.bind(scheduleController),
);

scheduleRouter.get(
    '/get-schedule-by-entityid-for-doctor',
    scheduleController.getScheduleByEntityIdForDoctor.bind(scheduleController),
);

scheduleRouter.post(
    '/delete-schedules',
    scheduleController.deleteSchedules.bind(scheduleController),
);
export default scheduleRouter;
