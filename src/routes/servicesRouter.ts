import { Router } from 'express';
import { container } from 'tsyringe';
import { ServicesController } from '../controllers/servicesController';
import { authenticate } from '../middlewares/authMiddleware';
const serviceRouter = Router();
const servicesController = container.resolve(ServicesController);

serviceRouter.post(
    '/create',
    authenticate,
    servicesController.createService.bind(servicesController),
);

serviceRouter.put(
    '/update',
    authenticate,
    servicesController.updateService.bind(servicesController),
);
serviceRouter.delete(
    '/delete/:id',
    authenticate,
    servicesController.deleteService.bind(servicesController),
);
serviceRouter.post(
    '/view',
    servicesController.getServiceView.bind(servicesController),
);
serviceRouter.get(
    '/getById/:id',
    servicesController.getServiceById.bind(servicesController),
);

serviceRouter.get(
    '/get-common-service/',
    servicesController.getCommonService.bind(servicesController),
);

export default serviceRouter;
