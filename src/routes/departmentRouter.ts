import { Router } from 'express';
import { container } from 'tsyringe';
import { DepartmentController } from '../controllers/department.controller';

const departmentRouter = Router();
const departmentController = container.resolve(DepartmentController);

/**
 * @swagger
 * tags:
 *   name: Department
 */
departmentRouter.get(
    '/get-departments-with-pagination',
    departmentController.getDepartmentWithPagination.bind(departmentController),
);

/**
 * @swagger
 * /department/get-all-departments:
 *   get:
 *     tags: [Department]
 *     responses:
 *       200:
 *         description: A list of departments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 */
departmentRouter.get(
    '/get-all-departments',
    departmentController.getAllDepartment.bind(departmentController),
);

/**
 * @swagger
 * /department/get-department-by-clinicid/{clinicId}:
 *   get:
 *     tags: [Department]
 *     parameters:
 *       - in: path
 *         name: clinicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 */
departmentRouter.get(
    '/get-department-by-clinicid/:clinicId',
    departmentController.getDepartmentByClinicId.bind(departmentController),
);

export default departmentRouter;
