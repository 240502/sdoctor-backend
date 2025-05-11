import { Router } from 'express';
import { container } from 'tsyringe';
import { authenticate } from '../middlewares/authMiddleware';
import { DoctorExpertisesController } from '../controllers/doctor_expertises.controller';

const doctorExpertisesRouter = Router();
const doctorExpertisesController = container.resolve(
    DoctorExpertisesController,
);

/**
 * @swagger
 * tags:
 *   name: DoctorExertises
 */

/**
 * @swagger
 * /doctor-expertise/create:
 *   post:
 *     tags: [DoctorExertises]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: integer
 *               expertise:
 *                 type: string
 *     responses:
 *       201:
 *         description: Doctor expertise created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
doctorExpertisesRouter.post(
    '/create',
    authenticate,
    doctorExpertisesController.createDoctorExpertises.bind(
        doctorExpertisesController,
    ),
);

export default doctorExpertisesRouter;
