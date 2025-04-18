import { Router } from 'express';
import { container } from 'tsyringe';
import { MailerController } from '../controllers/mailer.controller';

const mailerController = container.resolve(MailerController);
const mailerRouter = Router();

mailerRouter.post(
    '/send-booking-success-mail',
    mailerController.sendBookingSuccess.bind(mailerController),
);
export default mailerRouter;
