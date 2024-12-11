import { Router } from 'express';
import { container } from 'tsyringe';
import { DoctorController } from '../controllers/doctorController';
import { authenticate } from '../middlewares/authMiddleware';
const doctorRouter = Router();
const doctorController = container.resolve(DoctorController);

doctorRouter.post(
    '/create',
    authenticate,
    doctorController.createDoctor.bind(doctorController),
);
doctorRouter.delete(
    '/delete/:id',
    authenticate,
    doctorController.deleteDoctor.bind(doctorController),
);
doctorRouter.put(
    '/update',
    authenticate,
    doctorController.updateDoctor.bind(doctorController),
);
doctorRouter.get(
    '/getById/:id',
    doctorController.getDoctorById.bind(doctorController),
);
doctorRouter.post(
    '/view',
    doctorController.getDoctorView.bind(doctorController),
);
doctorRouter.post(
    '/get-common-doctor',
    doctorController.getCommonDoctor.bind(doctorController),
);

doctorRouter.put(
    '/update-views-doctor/:id',
    doctorController.updateViewsDoctor.bind(doctorController),
);
export default doctorRouter;
