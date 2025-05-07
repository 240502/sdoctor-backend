import { Router } from 'express';
import { container } from 'tsyringe';
import { EducationController } from '../controllers/education.controller';
import { authenticate } from '../middlewares/authMiddleware';

const educationRouter = Router();
const educationController = container.resolve(EducationController);
educationRouter.post(
    '/create',
    authenticate,
    educationController.createDoctorExpertises.bind(educationController),
);

export default educationRouter;
