import { Router } from 'express';
import { container } from 'tsyringe';
import { PatientProfileController } from '../controllers/patient_profile.controller';

const patientProfileRouter = Router();
const patientProfileController = container.resolve(PatientProfileController);

patientProfileRouter.post(
    '/create',
    patientProfileController.createPatientProfile.bind(
        patientProfileController,
    ),
);

patientProfileRouter.post(
    '/get-by-phone-or-email',
    patientProfileController.getProfileByPhoneOrEmail.bind(
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
    '/delete/:uuid',
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
