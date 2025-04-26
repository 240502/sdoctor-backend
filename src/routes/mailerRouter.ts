import { Router } from 'express';
import { container } from 'tsyringe';
import { MailerController } from '../controllers/mailer.controller';

const mailerController = container.resolve(MailerController);
const mailerRouter = Router();

mailerRouter.post(
    '/send-booking-success-mail',
    mailerController.sendBookingSuccess.bind(mailerController),
);

mailerRouter.post(
    '/send-confirm-success-mail',
    mailerController.sendConfirmSuccessMail.bind(mailerController),
);

mailerRouter.post(
    '/send-rejection-mail',
    mailerController.sendRejectionMail.bind(mailerController),
);

export default mailerRouter;
