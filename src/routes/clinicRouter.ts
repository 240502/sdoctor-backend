import { Router } from 'express';
import { container } from 'tsyringe';
import { ClinicController } from '../controllers/clinic.controller';
import { authenticate } from '../middlewares/authMiddleware';
const clinicRouter = Router();
const clinicController = container.resolve(ClinicController);

clinicRouter.post(
    '/create',
    authenticate,
    clinicController.createClinic.bind(clinicController),
);
clinicRouter.put(
    '/update',
    authenticate,
    clinicController.updateClinic.bind(clinicController),
);
clinicRouter.delete(
    '/delete/:id',
    authenticate,
    clinicController.deleteClinic.bind(clinicController),
);
clinicRouter.get(
    '/get-by-id/:id',
    clinicController.getClinicById.bind(clinicController),
);
clinicRouter.post(
    '/get-clinic-with-pagination&options',
    clinicController.getClinicsWithPaginationAndOptions.bind(clinicController),
);
clinicRouter.get(
    '/get-common-clinic',
    clinicController.getCommonClinic.bind(clinicController),
);

clinicRouter.put(
    '/update-views/:id',
    clinicController.updateViewsClinic.bind(clinicController),
);

export default clinicRouter;
