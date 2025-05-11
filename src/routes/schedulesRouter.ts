import { Router } from 'express';
import { container } from 'tsyringe';
import { ScheduleController } from '../controllers/schedule.controller';
import { authenticate } from '../middlewares/authMiddleware';

/**
 * @swagger
 * tags:
 *   name: Schedule
 */

const scheduleRouter = Router();
const scheduleController = container.resolve(ScheduleController);

/**
 * @swagger
 * /schedule/create:
 *   post:
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entityId:
 *                 type: string
 *               scheduleDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
scheduleRouter.post(
    '/create',
    authenticate,
    scheduleController.createSchedule.bind(scheduleController),
);

/**
 * @swagger
 * /schedule/update:
 *   put:
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduleId:
 *                 type: string
 *               status:
 *                 type: string
 *               scheduleDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
scheduleRouter.put(
    '/update',
    authenticate,
    scheduleController.updateSchedule.bind(scheduleController),
);

/**
 * @swagger
 * /schedule/delete/{id}:
 *   delete:
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID to delete
 *     responses:
 *       200:
 *         description: Schedule deleted successfully
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Internal server error
 */
scheduleRouter.delete(
    '/delete/:id',
    authenticate,
    scheduleController.deleteSchedule.bind(scheduleController),
);

/**
 * @swagger
 * /schedule/get-schedules-by-entityId:
 *   post:
 *     tags: [Schedule]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entityId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully fetched schedules
 *       500:
 *         description: Internal server error
 */
scheduleRouter.post(
    '/get-schedules-by-entityId',
    scheduleController.viewSchedules.bind(scheduleController),
);

/**
 * @swagger
 * /schedule/update-schedule-status:
 *   put:
 *     tags: [Schedule]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduleId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Schedule status updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
scheduleRouter.put(
    '/update-schedule-status',
    scheduleController.updateScheduleStatus.bind(scheduleController),
);

/**
 * @swagger
 * /schedule/get-schedule-by-entityid-for-doctor:
 *   get:
 *     tags: [Schedule]
 *     parameters:
 *       - in: query
 *         name: entityId
 *         required: true
 *         schema:
 *           type: string
 *         description: Entity ID for the doctor
 *     responses:
 *       200:
 *         description: Successfully fetched schedule
 *       500:
 *         description: Internal server error
 */
scheduleRouter.get(
    '/get-schedule-by-entityid-for-doctor',
    scheduleController.getScheduleByEntityIdForDoctor.bind(scheduleController),
);

/**
 * @swagger
 * /schedule/delete-schedules:
 *   post:
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduleIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Schedules deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
scheduleRouter.post(
    '/delete-schedules',
    authenticate,
    scheduleController.deleteSchedules.bind(scheduleController),
);

export default scheduleRouter;
