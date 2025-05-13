import { Router } from 'express';
import { container } from 'tsyringe';
import { DoctorController } from '../controllers/doctor.controller';
import { authenticate } from '../middlewares/authMiddleware';

const doctorRouter = Router();
const doctorController = container.resolve(DoctorController);

/**
 * @swagger
 * tags:
 *   name: Doctor
 */

/**
 * @swagger
 * /doctor/create:
 *   post:
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Doctor created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
doctorRouter.post(
    '/create',
    // authenticate,
    doctorController.createDoctor.bind(doctorController),
);

/**
 * @swagger
 * /doctor/delete/{id}:
 *   delete:
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized
 */
doctorRouter.delete(
    '/delete/:id',
    authenticate,
    doctorController.deleteDoctor.bind(doctorController),
);

/**
 * @swagger
 * /doctor/update:
 *   put:
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
doctorRouter.put(
    '/update',
    authenticate,
    doctorController.updateDoctor.bind(doctorController),
);

/**
 * @swagger
 * /doctor/get-by-id/{id}:
 *   get:
 *     tags: [Doctor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor information
 *       404:
 *         description: Doctor not found
 */
doctorRouter.get(
    '/get-by-id/:id',
    doctorController.getDoctorById.bind(doctorController),
);

/**
 * @swagger
 * /doctor/view:
 *   post:
 *     tags: [Doctor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: integer
 *               limit:
 *                 type: integer
 *               filters:
 *                 type: object
 *     responses:
 *       200:
 *         description: List of doctors
 */
doctorRouter.post(
    '/view',
    doctorController.getListDoctorsWithPaginationAndFilters.bind(
        doctorController,
    ),
);

/**
 * @swagger
 * /doctor/get-common-doctor:
 *   post:
 *     tags: [Doctor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               specialty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Common doctor information
 */
doctorRouter.post(
    '/get-common-doctor',
    doctorController.getCommonDoctor.bind(doctorController),
);

/**
 * @swagger
 * /doctor/update-doctor-views/{id}:
 *   put:
 *     tags: [Doctor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor view count updated successfully
 */
doctorRouter.put(
    '/update-doctor-views/:id',
    doctorController.updateViewsDoctor.bind(doctorController),
);

/**
 * @swagger
 * /doctor/get-by-user-id/{userId}:
 *   get:
 *     tags: [Doctor]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor information
 *       404:
 *         description: Doctor not found
 */
doctorRouter.get(
    '/get-by-user-id/:userId',
    doctorController.getDoctorByUserId.bind(doctorController),
);

export default doctorRouter;
