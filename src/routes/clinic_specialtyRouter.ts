import { container } from 'tsyringe';
import { Router } from 'express';
import { ClinicSpecialtyController } from '../controllers/clinic_specialty.controller';
import { authenticate } from '../middlewares/authMiddleware';

const clinicSpecialtyRouter = Router();
const clinicSpecialtyController = container.resolve(ClinicSpecialtyController);

clinicSpecialtyRouter.post(
    '/create',
    authenticate,
    clinicSpecialtyController.createClinicSpecialty.bind(
        clinicSpecialtyController,
    ),
);

clinicSpecialtyRouter.put(
    '/update',
    authenticate,
    clinicSpecialtyController.updateClinicSpecialty.bind(
        clinicSpecialtyController,
    ),
);

clinicSpecialtyRouter.delete(
    '/delete/:id',
    authenticate,
    clinicSpecialtyController.deleteClinicSpecialty.bind(
        clinicSpecialtyController,
    ),
);

clinicSpecialtyRouter.get(
    '/get-clinic-specialty-by-clinicid/:clinicId',
    clinicSpecialtyController.getClinicSpecialtyByClinicId.bind(
        clinicSpecialtyController,
    ),
);
export default clinicSpecialtyRouter;
