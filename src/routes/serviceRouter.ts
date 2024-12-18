import { Router } from 'express';
import { container } from 'tsyringe';
import { ServiceController } from '../controllers/serviceController';
import { authenticate } from '../middlewares/authMiddleware';

const serviceRouter = Router();
const serviceController = container.resolve(ServiceController);

serviceRouter.post(
    '/create',
    authenticate,
    serviceController.createService.bind(serviceController),
);
serviceRouter.put(
    '/update',
    authenticate,
    serviceController.updateService.bind(serviceController),
);
serviceRouter.delete(
    '/delete/:id',
    authenticate,
    serviceController.deleteService.bind(serviceController),
);
serviceRouter.post(
    '/view',
    serviceController.viewService.bind(serviceController),
);
serviceRouter.get(
    '/get-by-id/:id',
    serviceController.getServiceById.bind(serviceController),
);
serviceRouter.get(
    '/get-common-service',
    serviceController.getCommonService.bind(serviceController),
);

export default serviceRouter;
