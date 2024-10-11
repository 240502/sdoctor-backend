import { container } from 'tsyringe';
import { CategoryServiceController } from '../controllers/categorySerivcesController';
import { Router } from 'express';

const categoryServicesRouter = Router();
const categoryServicesController = container.resolve(CategoryServiceController);

categoryServicesRouter.get(
    '/get-all',
    categoryServicesController.getAllCategoryServices.bind(
        categoryServicesController,
    ),
);
export default categoryServicesRouter;
