import { Router } from 'express';
import { container } from 'tsyringe';
import { ServiceController } from '../controllers/service.controller';

/**
 * @swagger
 * tags:
 *   name: DoctorServices
 */

const serviceRouter = Router();
const serviceController = container.resolve(ServiceController);

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
serviceRouter.get(
    '/get-all',
    serviceController.getAllDoctorServices.bind(serviceController),
);

/**
 * @swagger
 * /doctor-services/get-by-department/{departmentId}:
 *   get:
 *     tags: [DoctorServices]
 *     parameters:
 *       - in: path
 *         name: departmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the department to filter services by
 *     responses:
 *       200:
 *         description: List of services for the specified department
 *       404:
 *         description: No records found for the specified department ID
 *       500:
 *         description: Server error
 */
serviceRouter.get(
    '/get-by-department/:departmentId',
    serviceController.getServiceByDepartmentId.bind(serviceController),
);
export default serviceRouter;
