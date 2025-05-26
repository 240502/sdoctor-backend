import { Router } from 'express';

import { container } from 'tsyringe';
import { DoctorServiceController } from '../controllers/doctor_service.controller';
import { authenticate } from '../middlewares/authMiddleware';

const doctorServiceRouter = Router();
const doctorServiceController = container.resolve(DoctorServiceController);

doctorServiceRouter.post(
    '/create',
    authenticate,
    doctorServiceController.createDoctorService.bind(doctorServiceController),
);

doctorServiceRouter.put(
    '/update',
    authenticate,
    doctorServiceController.updateDoctorService.bind(doctorServiceController),
);

doctorServiceRouter.delete(
    '/delete/:id',
    authenticate,
    doctorServiceController.deleteDoctorService.bind(doctorServiceController),
);
doctorServiceRouter.get(
    '/get-doctor-services/:doctorId',
    doctorServiceController.getDoctorServices.bind(doctorServiceController),
);

export default doctorServiceRouter;
