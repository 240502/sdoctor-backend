import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Schedule } from '../models/schedule';
import { ScheduleDetails } from '../models/schedule_details';
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
                JSON.stringify(schedule.listScheduleDetails),
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
        type: string,
    ): Promise<any> {
        try {
            const sql =
                'CALL GetScheduleByDateAndSubscriberId(?,?,?,@err_code,@err_msg)';

            const [results] = await this.db.query(sql, [
                subscriberId,
                date,
                type,
            ]);
            if (results.length > 0 && Array.isArray(results)) {
                const listScheduleDetails: ScheduleDetails[] = [];
                for (let i = 0; i < results.length; i++) {
                    let ScheduleDetail: ScheduleDetails = {
                        id: results[i].schedule_detail_id,
                        schedule_id: results[i].schedule_id,
                        time_id: results[i].time_id,
                        available: results[i].available,
                    };
                    listScheduleDetails.push(ScheduleDetail);
                }
                const schedule: Schedule = {
                    id: results[0].id,
                    subscriber_id: results[0].subscriber_id,
                    date: results[0].date,
                    created_at: results[0].created_at,
                    updated_at: results[0].updated_at,
                    type: results[0].type,
                    listScheduleDetails: listScheduleDetails,
                };
                return schedule;
            } else return null;
        } catch (err: any) {
            console.log(err.message);
        }
    }
}
