import { Router } from 'express';
import { container } from 'tsyringe';
import { MajorController } from '../controllers/major.controller';

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
majorRouter.get(
    '/get-by-id/:id',
    majorController.getMajorById.bind(majorController),
);
majorRouter.post('/view', majorController.viewMajor.bind(majorController));
export default majorRouter;
