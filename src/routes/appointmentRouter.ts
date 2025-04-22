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
    '/get-appointment-in-day/:doctorId',
    appointmentController.getAppointmentInDay.bind(appointmentController),
);

appointmentRouter.get(
    '/get-total-patient-in-day/:doctorId',
    appointmentController.getTotalPatientInDay.bind(appointmentController),
);

appointmentRouter.get(
    '/get-total-patient-examined-in-day/:doctorId',
    authenticate,
    appointmentController.getTotalPatientExaminedInDay.bind(
        appointmentController,
    ),
);

appointmentRouter.post(
    '/get-total-appointment-by-week',
    authenticate,
    appointmentController.getTotalAppointmentByWeek.bind(appointmentController),
);

appointmentRouter.get(
    '/get-recent-patient-ordered',
    authenticate,
    appointmentController.getRecentPatientOrdered.bind(appointmentController),
);
appointmentRouter.get(
    '/get-recent-patient-examined',
    authenticate,
    appointmentController.getRecentPatientExamined.bind(appointmentController),
);

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
    '/update-appointment-status',
    appointmentController.updateAppointmentStatus.bind(appointmentController),
);

appointmentRouter.post(
    '/viewForPatient',
    appointmentController.ViewAppointment.bind(appointmentController),
);

appointmentRouter.post(
    '/get-appointment-at-invoice',
    appointmentController.getAppointmentAtInvoice.bind(appointmentController),
);

appointmentRouter.get(
    '/get-appointment-by-uuid',
    appointmentController.getAppointmentByUuid.bind(appointmentController),
);
export default appointmentRouter;
