import { injectable } from 'tsyringe';
import { container } from 'tsyringe';
import { ScheduleDetailsController } from '../controllers/schedule_details.controller';
import { Router } from 'express';

const scheduleDetailRouter = Router();
const scheduleDetailsController = container.resolve(ScheduleDetailsController);

scheduleDetailRouter.get(
    '/get-by-schedule-id/:scheduleId',
    scheduleDetailsController.getScheduleDetailsByScheduleId.bind(
        scheduleDetailsController,
    ),
);
scheduleDetailRouter.put(
    '/update-available/:scheduleDetailId',
    scheduleDetailsController.updateAvailableScheduleDetails.bind(
        scheduleDetailsController,
    ),
);
scheduleDetailRouter.post(
    '/create',
    scheduleDetailsController.createScheduleDetails.bind(
        scheduleDetailsController,
    ),
);

scheduleDetailRouter.post(
    '/delete',
    scheduleDetailsController.deleteScheduleDetails.bind(
        scheduleDetailsController,
    ),
);

export default scheduleDetailRouter;
