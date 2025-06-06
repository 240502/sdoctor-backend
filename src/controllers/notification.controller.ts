import { injectable } from 'tsyringe';
import { NotificationService } from '../services/notification.service';
import { NotificationCreate, Notifications } from '../models/notifications';
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
                    notifications: results,
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
            const notification: NotificationCreate =
                req.body as NotificationCreate;
            const result =
                await this._notificationsService.createNotification(
                    notification,
                );
            res.json({ message: 'Successfully', result: result });
            const io = getSocket();
            io.to(`doctor_${notification.userId}`).emit(
                'newNotification',
                result,
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
