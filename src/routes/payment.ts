import axios from 'axios';
const CryptoJS = require('crypto-js'); // npm install crypto-js
import { Router } from 'express';
import { container } from 'tsyringe';
import { PaymentController } from '../controllers/payment.controller';
const paymentRouter = Router();
const paymentController = container.resolve(PaymentController);
paymentRouter.post(
    '/create/:appointmentId',
    paymentController.createPayment.bind(paymentController),
);
paymentRouter.post(
    '/callback',
    paymentController.callBack.bind(paymentController),
);
export default paymentRouter;
