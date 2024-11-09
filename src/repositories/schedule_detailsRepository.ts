import { injectable } from 'tsyringe';
import { ScheduleDetails } from '../models/schedule_details';
import { Database } from '../config/database';

@injectable()
export class ScheduleDetailsRepository {
    constructor(private db: Database) {}

    async createScheduleDetails(
        scheduleId: number,
        scheduleDetails: ScheduleDetails[],
    ): Promise<any> {
        try {
            const sql = 'CALL CreateScheduleDetails(?,?,@err_code,@err_msg)';
            await this.db.query(sql, [scheduleId, scheduleDetails]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async deleteScheduleDetails(
        scheduleDetails: ScheduleDetails[],
    ): Promise<any> {
        try {
            const sql = 'CALL DeleteScheduleDetails(?,@err_code,@err_msg)';
            await this.db.query(sql, [scheduleDetails]);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getScheduleDetailsByScheduleId(scheduleId: number): Promise<any> {
        try {
            const sql =
                'CALL getScheduleDetailsByScheduleId(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [scheduleId]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updateAvailableScheduleDetails(
        scheduleDetailId: number,
    ): Promise<any> {
        try {
            const sql =
                'CALL UpdateAvailableScheduleDetails(?,@err_code,@err_msg)';
            await this.db.query(sql, [scheduleDetailId]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
