import { Router } from 'express';
import { container } from 'tsyringe';
import { AppointmentStatusController } from '../controllers/appointment_statusController';

const appointmentStatusController = container.resolve(
    AppointmentStatusController,
);

const appointmentStatusRouter = Router();

appointmentStatusRouter.get(
    '/get-all',
    appointmentStatusController.getAllAppointmentStatus.bind(
        appointmentStatusController,
    ),
);

export default appointmentStatusRouter;
