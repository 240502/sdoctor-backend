import { Router } from 'express';
import { container } from 'tsyringe';
import { EducationController } from '../controllers/education.controller';
import { authenticate } from '../middlewares/authMiddleware';

/**
 * @swagger
 * tags:
 *   name: Education
 */

const educationRouter = Router();
const educationController = container.resolve(EducationController);

/**
 * @swagger
 * /education/create:
 *   post:
 *     tags: [Education]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: string
 *               degree:
 *                 type: string
 *               university:
 *                 type: string
 *               yearGraduated:
 *                 type: string
 *     responses:
 *       201:
 *         description: Education record created successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
educationRouter.post(
    '/create',
    authenticate,
    educationController.createDoctorExpertises.bind(educationController),
);

export default educationRouter;
