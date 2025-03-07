import { container } from 'tsyringe';
import { Router } from 'express';
import { HomeMenuController } from '../controllers/home_menuController';

const homeMenuRouter = Router();
const homeMenuController = container.resolve(HomeMenuController);

homeMenuRouter.get(
    '/get-all',
    homeMenuController.getHomeMenu.bind(homeMenuController),
);
export default homeMenuRouter;
