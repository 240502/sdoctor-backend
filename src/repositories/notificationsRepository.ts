import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Notifications } from '../models/notifications';

@injectable()
export class NotificationsRepository {
    constructor(private db: Database) {}
    async getNotificationByUserId(userId: number): Promise<any> {
        try {
            const sql = 'CALL GetNotificationsByUserId(?,@err_code,@err_msg)';
            const [reuslts] = await this.db.query(sql, [userId]);
            if (Array.isArray(reuslts) && reuslts.length > 0) {
                return reuslts;
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async markAsRead(id: number): Promise<any> {
        try {
            const sql = 'CALL markAsRead(?,@err_code,@err_msg)';
            await this.db.query(sql, [id]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async markAllRead(userId: number): Promise<any> {
        try {
            const sql = 'CALL markAllRead(?,@err_code,@err_msg)';
            await this.db.query(sql, [userId]);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async createNotification(notification: Notifications): Promise<any> {
        try {
            const sql = 'CALL CreateNotification(?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                notification.user_id,
                notification.message,
                notification.appointment_id,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async deleteNotification(id: number): Promise<any> {
        try {
            const sql = 'CALL DeleteNotification(?,@err_code,@err_msg)';
            await this.db.query(sql, [id]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
