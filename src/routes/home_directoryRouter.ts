import { Router } from 'express';
import { container } from 'tsyringe';
import { HomeDirectoryController } from '../controllers/home_directory.controller';

const homeDirectoryRouter = Router();
const homeDirectoryController = container.resolve(HomeDirectoryController);

homeDirectoryRouter.get(
    '/get-home-directory',
    homeDirectoryController.getHomeDirectory.bind(homeDirectoryController),
);
export default homeDirectoryRouter;
