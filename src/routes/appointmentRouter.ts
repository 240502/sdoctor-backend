import { Router } from 'express';
import { container } from 'tsyringe';
import { AppointmentController } from '../controllers/appointment.controller';
import { authenticate } from '../middlewares/authMiddleware';
const appointmentRouter = Router();
const appointmentController = container.resolve(AppointmentController);

appointmentRouter.get(
    '/get-by-id/:id',
    appointmentController.getAppointmentById.bind(appointmentController),
);

appointmentRouter.post(
    '/get-by-type',
    appointmentController.getAppointmentByType.bind(appointmentController),
);

appointmentRouter.get(
    '/get-total-patient-in-day/:doctorId',
    appointmentController.getTotalPatientInDay.bind(appointmentController),
);

appointmentRouter.get(
    '/get-total-appointments-completed/:doctorId',
    appointmentController.getTotalAppointmentsCompleted.bind(
        appointmentController,
    ),
);

appointmentRouter.post(
    '/create',
    appointmentController.orderAppointment.bind(appointmentController),
);

appointmentRouter.put(
    '/update-appointment-status',
    appointmentController.updateAppointmentStatus.bind(appointmentController),
);

appointmentRouter.post(
    '/get-appointment-at-invoice',
    appointmentController.getAppointmentAtInvoice.bind(appointmentController),
);

appointmentRouter.get(
    '/get-appointment-by-uuid',
    appointmentController.getAppointmentByUuid.bind(appointmentController),
);

appointmentRouter.get(
    '/get-appointment-with-options',
    appointmentController.getAppointmentWithOptions.bind(appointmentController),
);

appointmentRouter.get(
    '/get-waitting-patients-count/:doctorId',
    appointmentController.getWaitingPatientsCount.bind(appointmentController),
);

appointmentRouter.get(
    '/get-appointments-in-day/:doctorId',
    appointmentController.getAppointmentsInDay.bind(appointmentController),
);
export default appointmentRouter;
