import { Router } from 'express';
import { container } from 'tsyringe';
import { WorkExperiencesController } from '../controllers/work_experience.controller';
import { authenticate } from '../middlewares/authMiddleware';

const workExperiencesRouter = Router();
const workExperiencesController = container.resolve(WorkExperiencesController);
workExperiencesRouter.post(
    '/create',
    authenticate,
    workExperiencesController.createWorkExperiences.bind(
        workExperiencesController,
    ),
);

export default workExperiencesRouter;
