import { Router } from 'express';
import { container } from 'tsyringe';
import { AppointmentController } from '../controllers/appointmentController';
import { authenticate } from '../middlewares/authMiddleware';
const appointmentRouter = Router();
const appointmentController = container.resolve(AppointmentController);

appointmentRouter.post(
    '/get-by-type',
    appointmentController.getAppointmentByType.bind(appointmentController),
);

appointmentRouter.put(
    '/confirm/:id',
    appointmentController.confirmAppointment.bind(appointmentController),
);
appointmentRouter.post(
    '/get-appointment-in-day',
    authenticate,
    appointmentController.getAppointmentInDay.bind(appointmentController),
);

appointmentRouter.get(
    '/get-total-patient-in-day/:id',
    authenticate,
    appointmentController.getTotalPatientInDay.bind(appointmentController),
);

appointmentRouter.get(
    '/get-total-patient-examined-in-day/:id',
    authenticate,
    appointmentController.getTotalPatientExaminedInDay.bind(
        appointmentController,
    ),
);

appointmentRouter.post(
    '/get-total-price-by-week',
    authenticate,
    appointmentController.getTotalPriceAppointmentByWeek.bind(
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
    '/cancel',
    appointmentController.cancelAppointment.bind(appointmentController),
);

appointmentRouter.post(
    '/viewForPatient',
    appointmentController.ViewAppointment.bind(appointmentController),
);

export default appointmentRouter;
