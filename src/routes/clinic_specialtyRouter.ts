import { container } from 'tsyringe';
import { Router } from 'express';
import { ClinicSpecialtyController } from '../controllers/clinic_specialty.controller';

const clinicSpecialtyRouter = Router();
const clinicSpecialtyController = container.resolve(ClinicSpecialtyController);

clinicSpecialtyRouter.get(
    '/create',
    clinicSpecialtyController.createClinicSpecialty.bind(
        clinicSpecialtyController,
    ),
);

export default clinicSpecialtyRouter;
