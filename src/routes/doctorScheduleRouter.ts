import { Router } from 'express';
import { container } from 'tsyringe';
import { DoctorScheduleController } from '../controllers/scheduleController';
import { authenticate } from '../middlewares/authMiddleware';
const doctorScheduleRouter = Router();
const scheduleController = container.resolve(DoctorScheduleController);

doctorScheduleRouter.post(
    '/create',
    authenticate,
    scheduleController.createSchedule.bind(scheduleController),
);

doctorScheduleRouter.put(
    '/update',
    authenticate,
    scheduleController.updateSchedule.bind(scheduleController),
);

doctorScheduleRouter.delete(
    '/delete/:id',
    authenticate,
    scheduleController.deleteSchedule.bind(scheduleController),
);
doctorScheduleRouter.post(
    '/view',
    scheduleController.viewSchedule.bind(scheduleController),
);

doctorScheduleRouter.post(
    '/view-for-client',
    scheduleController.viewScheduleForClient.bind(scheduleController),
);

doctorScheduleRouter.post(
    '/view-for-doctor',
    scheduleController.viewScheduleForDoctor.bind(scheduleController),
);
export default doctorScheduleRouter;
