import { Router } from 'express';
import { container } from 'tsyringe';
import { MedicalPackageController } from '../controllers/medical_package.controller';
import { authenticate } from '../middlewares/authMiddleware';

const medicalPackageRouter = Router();
const medicalPackageController = container.resolve(MedicalPackageController);

medicalPackageRouter.post(
    '/create',
    authenticate,
    medicalPackageController.createService.bind(medicalPackageController),
);
medicalPackageRouter.put(
    '/update',
    authenticate,
    medicalPackageController.updateService.bind(medicalPackageController),
);
medicalPackageRouter.delete(
    '/delete/:id',
    authenticate,
    medicalPackageController.deleteService.bind(medicalPackageController),
);
medicalPackageRouter.post(
    '/view',
    medicalPackageController.getMedicalPackagesWithPaginationAndOptions.bind(
        medicalPackageController,
    ),
);
medicalPackageRouter.get(
    '/get-by-id/:id',
    medicalPackageController.getServiceById.bind(medicalPackageController),
);
medicalPackageRouter.get(
    '/get-common-medical-package',
    medicalPackageController.getCommonMedicalPackage.bind(
        medicalPackageController,
    ),
);

medicalPackageRouter.get(
    '/get-medical-package-by-clinicid/:clinicId',
    medicalPackageController.getMedicalPackageByClinicId.bind(
        medicalPackageController,
    ),
);
medicalPackageRouter.put(
    '/update-view/:id',
    medicalPackageController.updateViewService.bind(medicalPackageController),
);

export default medicalPackageRouter;
