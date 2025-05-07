import { Router } from 'express';
import { container } from 'tsyringe';
import { authenticate } from '../middlewares/authMiddleware';
import { DoctorExpertisesController } from '../controllers/doctor_expertises.controller';

const doctorExpertisesRouter = Router();
const doctorExpertisesController = container.resolve(
    DoctorExpertisesController,
);
doctorExpertisesRouter.post(
    '/create',
    authenticate,
    doctorExpertisesController.createDoctorExpertises.bind(
        doctorExpertisesController,
    ),
);

export default doctorExpertisesRouter;
