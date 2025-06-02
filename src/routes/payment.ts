import axios from 'axios';
const CryptoJS = require('crypto-js'); // npm install crypto-js
import { Router } from 'express';
import { container } from 'tsyringe';
import { PaymentController } from '../controllers/payment.controller';

/**
 * @swagger
 * tags:
 *   name: Payment
 */

const paymentRouter = Router();
const paymentController = container.resolve(PaymentController);

/**
 * @swagger
 * /payment/create/{appointmentId}:
 *   post:
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *               currency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created payment
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
paymentRouter.post(
    '/create/:appointmentId',
    paymentController.createPayment.bind(paymentController),
);

/**
 * @swagger
 * /payment/callback:
 *   post:
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               paymentId:
 *                 type: string
 *               appointmentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully processed payment callback
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
paymentRouter.post(
    '/callback',
    paymentController.callBack.bind(paymentController),
);

paymentRouter.post(
    '/vnpay/create/:appointmentId',
    paymentController.createPaymentVnPay.bind(paymentController),
);
paymentRouter.get(
    '/vnpay/check-payment',
    paymentController.checkPaymentVnpay.bind(paymentController),
);

export default paymentRouter;
