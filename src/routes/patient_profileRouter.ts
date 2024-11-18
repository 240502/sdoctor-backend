import { Router } from 'express';
import { container } from 'tsyringe';
import { PatientProfileController } from '../controllers/patient_profileController';

const patientProfileRouter = Router();
const patientProfileController = container.resolve(PatientProfileController);

patientProfileRouter.post(
    '/create',
    patientProfileController.createPatientProfile.bind(
        patientProfileController,
    ),
);

patientProfileRouter.put(
    '/update',
    patientProfileController.updatePatientProfile.bind(
        patientProfileController,
    ),
);
patientProfileRouter.delete(
    '/delete/:phone',
    patientProfileController.deletePatientProfile.bind(
        patientProfileController,
    ),
);
patientProfileRouter.get(
    '/get-by-uuid/:uuid',
    patientProfileController.getPatientProfileByUuid.bind(
        patientProfileController,
    ),
);
export default patientProfileRouter;
