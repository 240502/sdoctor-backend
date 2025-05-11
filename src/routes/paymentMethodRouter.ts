import { container } from 'tsyringe';
import { Router } from 'express';
import { PaymentMethodController } from '../controllers/payment_method.controller';

/**
 * @swagger
 * tags:
 *   name: PaymentMethod
 */

const paymentMethodRouter = Router();
const paymentMethodController = container.resolve(PaymentMethodController);

/**
 * @swagger
 * /payment-method/get-all:
 *   get:
 *     tags: [PaymentMethod]
 *     responses:
 *       200:
 *         description: Successfully fetched payment methods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
paymentMethodRouter.get(
    '/get-all',
    paymentMethodController.getAllPaymentMethod.bind(paymentMethodController),
);

export default paymentMethodRouter;
