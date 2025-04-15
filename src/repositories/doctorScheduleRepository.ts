import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { DoctorSchedule } from '../models/doctor_schedule';
@injectable()
export class ScheduleRepository {
    constructor(private db: Database) {}
    async createSchedule(schedule: DoctorSchedule): Promise<any> {
        try {
            const sql = 'CALL CreateSchedules(?,@err_code,@err_msg)';
            const results = await this.db.query(sql, [
                JSON.stringify(schedule),
            ]);
            return results;
        } catch (err: any) {
            console.log('Có lỗi khi thêm schedules', err.message);

            throw new Error(err.message);
        }
    }
    async updateSchedule(id: number, scheduleDetails: any): Promise<any> {
        try {
            const sql = 'CALL UpdateSchedule(?,?,@err_code,@err_msg)';
            this.db.query(sql, [id, JSON.stringify(scheduleDetails)]);
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
    async viewSchedules(
        entityId: number,
        date: Date,
        entityType: string,
    ): Promise<any> {
        try {
            const sql = 'CALL ViewSchedule(?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                entityId,
                date,
                entityType,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // async viewScheduleForClient(
    //     date: string,
    //     doctor_id: number,
    //     type: string,
    // ): Promise<any> {
    //     try {
    //         const sql = 'CALL ViewScheduleForClient(?,?,@err_code,@err_msg)';

    //         const [results] = await this.db.query(sql, [doctor_id, date]);
    //         if (results.length > 0 && Array.isArray(results)) {
    //             const listScheduleDetails: DoctorScheduleDetail[] = [];
    //             for (let i = 0; i < results.length; i++) {
    //                 let ScheduleDetail: DoctorScheduleDetail = {
    //                     id: results[i].schedule_detail_id,
    //                     schedule_id: results[i].schedule_id,
    //                     start_time: results[i].start_time,
    //                     end_time: results[i].end_time,
    //                     time_id: results[i].time_id,
    //                     available: results[i].available,
    //                 };
    //                 listScheduleDetails.push(ScheduleDetail);
    //             }
    //             const schedule: DoctorSchedule = {
    //                 id: results[0].id,
    //                 entityId: results[0].doctor_id,
    //                 date: results[0].date,
    //                 created_at: results[0].created_at,
    //                 updated_at: results[0].updated_at,
    //                 entityType: results[0].type,
    //                 // listScheduleDetails: listScheduleDetails,
    //             };
    //             return schedule;
    //         } else return null;
    //     } catch (err: any) {
    //         console.log(err.message);
    //         throw err;
    //     }
    // }
    // async viewScheduleForDoctor(date: string, doctor_id: number): Promise<any> {
    //     try {
    //         const sql = 'CALL ViewScheduleForDoctor(?,?,@err_code,@err_msg)';

    //         const [results] = await this.db.query(sql, [doctor_id, date]);
    //         if (results.length > 0 && Array.isArray(results)) {
    //             const listScheduleDetails: DoctorScheduleDetail[] = [];
    //             for (let i = 0; i < results.length; i++) {
    //                 let ScheduleDetail: DoctorScheduleDetail = {
    //                     id: results[i].schedule_detail_id,
    //                     schedule_id: results[i].schedule_id,
    //                     start_time: results[i].start_time,
    //                     end_time: results[i].end_time,
    //                     time_id: results[i].time_id,
    //                     available: results[i].available,
    //                 };
    //                 listScheduleDetails.push(ScheduleDetail);
    //             }
    //             const schedule: DoctorSchedule = {
    //                 id: results[0].id,
    //                 doctor_id: results[0].doctor_id,
    //                 date: results[0].date,
    //                 created_at: results[0].created_at,
    //                 updated_at: results[0].updated_at,
    //                 type: results[0].type,
    //                 listScheduleDetails: listScheduleDetails,
    //             };
    //             return schedule;
    //         } else return null;
    //     } catch (err: any) {
    //         console.log(err.message);
    //     }
    // }
}
