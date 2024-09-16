import { Router } from 'express';
import { container } from 'tsyringe';
import { ClinicController } from '../controllers/clinicController';
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
    '/getById/:id',
    clinicController.getClinicById.bind(clinicController),
);
clinicRouter.post(
    '/view',
    clinicController.getClinicView.bind(clinicController),
);

export default clinicRouter;
