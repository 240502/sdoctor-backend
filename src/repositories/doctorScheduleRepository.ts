import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { DoctorSchedule } from '../models/doctor_schedule';
import { DoctorScheduleDetail } from '../models/doctor_schedule_detail';
@injectable()
export class DoctorScheduleRepository {
    constructor(private db: Database) {}
    async createSchedule(schedule: DoctorSchedule): Promise<any> {
        try {
            const sql = 'CALL CreateSchedule(?,?,?,?,@err_code,@err_msg)';
            this.db.query(sql, [
                schedule.doctor_id,
                schedule.date,
                schedule.type,
                JSON.stringify(schedule.listScheduleDetails),
            ]);
            return true;
        } catch (err: any) {
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

    async viewScheduleForClient(
        date: string,
        doctor_id: number,
        type: string,
    ): Promise<any> {
        try {
            const sql = 'CALL ViewScheduleForClient(?,?,?,@err_code,@err_msg)';

            const [results] = await this.db.query(sql, [doctor_id, date, type]);
            if (results.length > 0 && Array.isArray(results)) {
                const listScheduleDetails: DoctorScheduleDetail[] = [];
                for (let i = 0; i < results.length; i++) {
                    let ScheduleDetail: DoctorScheduleDetail = {
                        id: results[i].schedule_detail_id,
                        schedule_id: results[i].schedule_id,
                        time_id: results[i].time_id,
                        available: results[i].available,
                    };
                    listScheduleDetails.push(ScheduleDetail);
                }
                const schedule: DoctorSchedule = {
                    id: results[0].id,
                    doctor_id: results[0].doctor_id,
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
    async viewScheduleForDoctor(date: string, doctor_id: number): Promise<any> {
        try {
            const sql = 'CALL ViewScheduleForDoctor(?,?,@err_code,@err_msg)';

            const [results] = await this.db.query(sql, [doctor_id, date]);
            if (results.length > 0 && Array.isArray(results)) {
                const listScheduleDetails: DoctorScheduleDetail[] = [];
                for (let i = 0; i < results.length; i++) {
                    let ScheduleDetail: DoctorScheduleDetail = {
                        id: results[i].schedule_detail_id,
                        schedule_id: results[i].schedule_id,
                        time_id: results[i].time_id,
                        available: results[i].available,
                    };
                    listScheduleDetails.push(ScheduleDetail);
                }
                const schedule: DoctorSchedule = {
                    id: results[0].id,
                    doctor_id: results[0].doctor_id,
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
