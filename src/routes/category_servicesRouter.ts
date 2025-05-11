import { container } from 'tsyringe';
import { CategoryServiceController } from '../controllers/service_category.controller';
import { Router } from 'express';

const categoryServicesRouter = Router();
const categoryServicesController = container.resolve(CategoryServiceController);

/**
 * @swagger
 * /category-services/get-all:
 *   get:
 *     tags: [CategoryServices]
 *     responses:
 *       200:
 *         description: Danh sách tất cả các danh mục dịch vụ
 */
categoryServicesRouter.get(
    '/get-all',
    categoryServicesController.getAll.bind(categoryServicesController),
);

export default categoryServicesRouter;
