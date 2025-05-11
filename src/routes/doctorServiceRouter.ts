import { Router } from 'express';
import { container } from 'tsyringe';
import { DoctorServiceController } from '../controllers/doctor_service.controller';

/**
 * @swagger
 * tags:
 *   name: DoctorServices
 */

const doctorServiceRouter = Router();
const doctorServiceController = container.resolve(DoctorServiceController);

/**
 * @swagger
 * /doctor-services/get-all:
 *   get:
 *     tags: [DoctorServices]
 *     responses:
 *       200:
 *         description: List of all doctor services
 *       500:
 *         description: Server error
 */
doctorServiceRouter.get(
    '/get-all',
    doctorServiceController.getAllDoctorServices.bind(doctorServiceController),
);

export default doctorServiceRouter;
