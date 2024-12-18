import { container } from 'tsyringe';
import { Router } from 'express';

import { PaymentMethodController } from '../controllers/paymentMethodController';
const paymentMethodRouter = Router();
const paymentMethodController = container.resolve(PaymentMethodController);

paymentMethodRouter.get(
    '/get-all',
    paymentMethodController.getAllPaymentMethod.bind(paymentMethodController),
);
export default paymentMethodRouter;
