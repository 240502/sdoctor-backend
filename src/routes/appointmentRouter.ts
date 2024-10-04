import { Router } from 'express';
import { container } from 'tsyringe';
import { AppointmentController } from '../controllers/appointmentController';
import { authenticate } from '../middlewares/authMiddleware';
import { Server } from 'socket.io';
import { AppointmentService } from '../services/appointmentService';
const appointmentRouter = Router();
const appointmentController = container.resolve(AppointmentController);
appointmentRouter.post(
    '/create',
    appointmentController.orderAppointment.bind(appointmentController),
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

appointmentRouter.put(
    '/cancel/:id',
    appointmentController.cancelAppointment.bind(appointmentController),
);

appointmentRouter.post(
    '/viewForPatient',
    appointmentController.ViewAppointment.bind(appointmentController),
);

export default appointmentRouter;
