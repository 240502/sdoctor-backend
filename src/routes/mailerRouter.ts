import { Router } from 'express';
import { container } from 'tsyringe';
import { MailerController } from '../controllers/mailer.controller';

/**
 * @swagger
 * tags:
 *   name: Mail
 */

const mailerController = container.resolve(MailerController);
const mailerRouter = Router();

/**
 * @swagger
 * /mailer/send-booking-success-mail:
 *   post:
 *     tags: [Mailer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *                 description: The email address of the user
 *               bookingDetails:
 *                 type: string
 *                 description: The details of the booking
 *     responses:
 *       200:
 *         description: Booking success email sent successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
mailerRouter.post(
    '/send-booking-success-mail',
    mailerController.sendBookingSuccess.bind(mailerController),
);

/**
 * @swagger
 * /mailer/send-confirm-success-mail:
 *   post:
 *     tags: [Mailer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *                 description: The email address of the user
 *               confirmationDetails:
 *                 type: string
 *                 description: The details of the confirmation
 *     responses:
 *       200:
 *         description: Confirmation success email sent successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
mailerRouter.post(
    '/send-confirm-success-mail',
    mailerController.sendConfirmSuccessMail.bind(mailerController),
);

/**
 * @swagger
 * /mailer/send-rejection-mail:
 *   post:
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *                 description: The email address of the user
 *               rejectionReason:
 *                 type: string
 *                 description: The reason for the rejection
 *     responses:
 *       200:
 *         description: Rejection email sent successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
mailerRouter.post(
    '/send-rejection-mail',
    mailerController.sendRejectionMail.bind(mailerController),
);

export default mailerRouter;
