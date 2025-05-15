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
    // authenticate,
    doctorExpertisesController.createDoctorExpertises.bind(
        doctorExpertisesController,
    ),
);
/**
 * @swagger
 * /doctor-expertise/{doctorId}:
 *   get:
 *     tags: [DoctorExertises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         description: ID of the doctor
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Doctor expertise retrieved successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
doctorExpertisesRouter.get(
    '/get-expertises-by-doctorId/:doctorId',
    doctorExpertisesController.getDoctorExpertisesByDoctorId.bind(
        doctorExpertisesController,
    ),
);

doctorExpertisesRouter.put(
    '/update',
    doctorExpertisesController.updateDoctorExpertise.bind(
        doctorExpertisesController,
    ),
);

doctorExpertisesRouter.delete(
    '/delete/:id',
    doctorExpertisesController.deleteEducation.bind(doctorExpertisesController),
);
export default doctorExpertisesRouter;
