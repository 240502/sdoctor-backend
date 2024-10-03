import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Schedule } from '../models/schedule';
@injectable()
export class ScheduleRepository {
    constructor(private db: Database) {}
    async createSchedule(schedule: Schedule): Promise<any> {
        try {
            const sql = 'CALL CreateSchedule(?,?,?,?,@err_code,@err_msg)';
            this.db.query(sql, [
                schedule.subscriber_id,
                schedule.date,
                schedule.type,
                schedule.time,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updateSchedule(id: number, time: string): Promise<any> {
        try {
            const sql = 'CALL UpdateSchedule(?,?,@err_code,@err_msg)';
            this.db.query(sql, [id, time]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async deleteSchedule(id: number): Promise<any> {
        try {
            const sql = 'CALL DeleteSchedule(?,@err_code,@err_msg)';
            this.db.query(sql, [id]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async ViewSchedule(
        date: Date,
        pageIndex: number,
        pageSize: number,
    ): Promise<any> {
        try {
            const sql = 'CALL ViewSchedule(?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                date,
                pageIndex,
                pageSize,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getScheduleByDateAndSubscriberId(
        date: string,
        subscriberId: number,
    ): Promise<any> {
        try {
            const sql =
                'CALL GetScheduleByDateAndSubscriberId(?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [subscriberId, date]);
            if (results.length > 0 && Array.isArray(results)) {
                return results[0];
            } else return null;
        } catch (err: any) {
            console.log(err.message);
        }
    }
}
