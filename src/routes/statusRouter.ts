import { Router } from 'express';
import { container } from 'tsyringe';
import { StatusController } from '../controllers/statusController';

const statusRouter = Router();
const statusController = container.resolve(StatusController);

statusRouter.get(
    '/getAll',
    statusController.getAllStatus.bind(statusController),
);

export default statusRouter;
