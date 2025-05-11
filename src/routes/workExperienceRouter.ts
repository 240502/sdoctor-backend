import { Router } from 'express';
import { container } from 'tsyringe';
import { WorkExperiencesController } from '../controllers/work_experience.controller';
import { authenticate } from '../middlewares/authMiddleware';

/**
 * @swagger
 * tags:
 *   name: WorkExperience
 */

const workExperiencesRouter = Router();
const workExperiencesController = container.resolve(WorkExperiencesController);

/**
 * @swagger
 * /work-experiences/create:
 *   post:
 *     tags: [WorkExperience]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobTitle:
 *                 type: string
 *               companyName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Work experience created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
workExperiencesRouter.post(
    '/create',
    authenticate,
    workExperiencesController.createWorkExperiences.bind(
        workExperiencesController,
    ),
);

export default workExperiencesRouter;
