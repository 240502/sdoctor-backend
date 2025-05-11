import { container } from 'tsyringe';
import { NotificationController } from '../controllers/notification.controller';
import { Router } from 'express';

/**
 * @swagger
 * tags:
 *   name: Notification
 */

const notificationRouter = Router();
const notificationController = container.resolve(NotificationController);

/**
 * @swagger
 * /notification/get-by-user-id/{userId}:
 *   get:
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched notifications for the user
 *       404:
 *         description: Notifications not found for the user
 *       500:
 *         description: Internal server error
 */
notificationRouter.get(
    '/get-by-user-id/:userId',
    notificationController.getNotificationByUserId.bind(notificationController),
);

/**
 * @swagger
 * /notification/mark-as-read/{id}:
 *   put:
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully marked notification as read
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */
notificationRouter.put(
    '/mark-as-read/:id',
    notificationController.markAsRead.bind(notificationController),
);

/**
 * @swagger
 * /notification/delete/{id}:
 *   delete:
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the notification
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */
notificationRouter.delete(
    '/delete/:id',
    notificationController.deleteNotification.bind(notificationController),
);

/**
 * @swagger
 * /notification/mark-all-read/{userId}:
 *   put:
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully marked all notifications as read
 *       404:
 *         description: No notifications found for the user
 *       500:
 *         description: Internal server error
 */
notificationRouter.put(
    '/mark-all-read/:userId',
    notificationController.markAllRead.bind(notificationController),
);

/**
 * @swagger
 * /notification/create:
 *   post:
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               message:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created notification
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
notificationRouter.post(
    '/create',
    notificationController.createNotification.bind(notificationController),
);

export default notificationRouter;
