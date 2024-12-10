import { injectable } from 'tsyringe';
import { NotificationService } from '../services/notificationService';
import { Notifications } from '../models/notifications';
import { Request, Response } from 'express';
import { getSocket } from '../socket';
@injectable()
export class NotificationController {
    constructor(private _notificationsService: NotificationService) {}
    async getNotificationByUserId(req: Request, res: Response): Promise<void> {
        try {
            const userId: number = Number(req.params.userId);
            const results =
                await this._notificationsService.getNotificationByUserId(
                    userId,
                );
            if (Array.isArray(results) && results.length > 0) {
                res.json({
                    data: results,
                    totalItems: results[0].RecordCount,
                });
            } else {
                res.status(404).json({ message: 'Không tồn tại bản ghi nào!' });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async markAsRead(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            await this._notificationsService.markAsRead(id);
            res.json({ message: 'Successfully', result: true });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async markAllRead(req: Request, res: Response): Promise<void> {
        try {
            const userId: number = Number(req.params.userId);
            await this._notificationsService.markAllRead(userId);
            res.json({ message: 'Successfully', result: true });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async createNotification(req: Request, res: Response): Promise<void> {
        try {
            const notification: Notifications = req.body as Notifications;
            await this._notificationsService.createNotification(notification);
            res.json({ message: 'Successfully', result: true });
            console.log(notification.user_id);
            const io = getSocket();
            io.to(`doctor_${notification.user_id}`).emit(
                'newNotification',
                notification,
            );
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async deleteNotification(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            await this._notificationsService.deleteNotification(id);
            res.json({ message: 'Successfully', result: true });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}
