import { container } from 'tsyringe';
import { Router } from 'express';
import { WorkingHoursController } from '../controllers/working_hours.controller';
import { authenticate } from '../middlewares/authMiddleware';

const workingHoursRouter = Router();
const workingHoursController = container.resolve(WorkingHoursController);

workingHoursRouter.post(
    '/create',
    authenticate,
    workingHoursController.createWorkingHours.bind(workingHoursController),
);
workingHoursRouter.delete(
    '/delete/:id',
    authenticate,
    workingHoursController.deleteWorkingHours.bind(workingHoursController),
);

workingHoursRouter.put(
    '/update/',
    authenticate,
    workingHoursController.updateMedicalEquipment.bind(workingHoursController),
);

workingHoursRouter.get(
    '/get-working-hours-by-clinicid/:clinicId',
    workingHoursController.getWorkingHoursByClinicId.bind(
        workingHoursController,
    ),
);
export default workingHoursRouter;
