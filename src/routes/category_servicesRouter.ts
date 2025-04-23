import { container } from 'tsyringe';
import { CategoryServiceController } from '../controllers/service_category.controller';
import { Router } from 'express';

const categoryServicesRouter = Router();
const categoryServicesController = container.resolve(CategoryServiceController);

categoryServicesRouter.get(
    '/get-all',
    categoryServicesController.getAll.bind(categoryServicesController),
);
export default categoryServicesRouter;
