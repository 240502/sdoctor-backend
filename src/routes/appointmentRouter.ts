import { Router } from 'express';
import { container } from 'tsyringe';
import { AppointmentController } from '../controllers/appointmentController';
import { authenticate } from '../middlewares/authMiddleware';
const appointmentRouter = Router();
const appointmentController = container.resolve(AppointmentController);

appointmentRouter.post(
    '/create',
    appointmentController.createAppointment.bind(appointmentController),
);
appointmentRouter.post(
    '/getQuantityRejectedAppointmentByYearAndMonth',
    authenticate,
    appointmentController.getQuantityRejectedAppointmentByYearAndMonth.bind(
        appointmentController,
    ),
);

appointmentRouter.post(
    '/getAllAppointmentByYearAndMonth',
    authenticate,
    appointmentController.getAllAppointmentByYearAndMonth.bind(
        appointmentController,
    ),
);

export default appointmentRouter;
