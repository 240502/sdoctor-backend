import { Router } from 'express';
import { container } from 'tsyringe';
import { AppointmentStatusController } from '../controllers/appointment_status.controller';
const appointmentStatusController = container.resolve(
    AppointmentStatusController,
);

const appointmentStatusRouter = Router();

appointmentStatusRouter.get(
    '/get-all',
    /**
     * @swagger
     * tags:
     *   - Appointment Status
     * /appointment-status/get-all:
     *   get:
     *     tags: [Appointment Status]
     *     responses:
     *       200:
     *         description: Danh sách trạng thái lịch hẹn
     */
    appointmentStatusController.getAllAppointmentStatus.bind(
        appointmentStatusController,
    ),
);

export default appointmentStatusRouter;
