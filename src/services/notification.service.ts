import { injectable } from 'tsyringe';
import { NotificationsRepository } from '../repositories/notificationsRepository';
import { NotificationCreate, Notifications } from '../models/notifications';

@injectable()
export class NotificationService {
    constructor(private _notificationsRepository: NotificationsRepository) {}

    async getNotificationByUserId(userId: number): Promise<any> {
        return this._notificationsRepository.getNotificationByUserId(userId);
    }
    async markAsRead(id: number): Promise<any> {
        return this._notificationsRepository.markAsRead(id);
    }
    async markAllRead(userId: number): Promise<any> {
        return this._notificationsRepository.markAllRead(userId);
    }
    async createNotification(notification: NotificationCreate): Promise<any> {
        return this._notificationsRepository.createNotification(notification);
    }
    async deleteNotification(id: number): Promise<any> {
        return this._notificationsRepository.deleteNotification(id);
    }
}
