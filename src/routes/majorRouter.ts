import { Router } from 'express';
import { container } from 'tsyringe';
import { MajorController } from '../controllers/majorController';

const majorRouter = Router();
const majorController = container.resolve(MajorController);

majorRouter.get(
    '/get-common-major',
    majorController.getCommonMajor.bind(majorController),
);
majorRouter.get(
    '/get-all-major',
    majorController.getAllMajor.bind(majorController),
);

export default majorRouter;
