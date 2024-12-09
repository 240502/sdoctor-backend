import { container } from 'tsyringe';
import { NotificationController } from '../controllers/notificationController';
import { Router } from 'express';

const notificationRouter = Router();
const notificationController = container.resolve(NotificationController);

notificationRouter.get(
    '/get-by-user-id/:userId',
    notificationController.getNotificationByUserId.bind(notificationController),
);

notificationRouter.put(
    '/mark-as-read/:id',
    notificationController.markAsRead.bind(notificationController),
);

notificationRouter.delete(
    '/delete/:id',
    notificationController.deleteNotification.bind(notificationController),
);
notificationRouter.put(
    '/mark-all-read/:userId',
    notificationController.markAllRead.bind(notificationController),
);
notificationRouter.post(
    '/create',
    notificationController.createNotification.bind(notificationController),
);
export default notificationRouter;
