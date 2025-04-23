import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { DoctorSchedule } from '../models/doctor_schedule';
import { Schedules } from '../models';
import { markScheduleIfExpired } from '../utils';
import dayjs from 'dayjs';
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

    async updateScheduleStatus(payload: any): Promise<any> {
        try {
            const sql = 'CALL UpdateScheduleStatus(?,@err_code,@err_msg)';
            return await this.db.query(sql, [JSON.stringify(payload)]);
        } catch (err: any) {
            throw err;
        }
    }
    async viewSchedules(
        entityId: number,
        date: Date,
        entityType: string,
    ): Promise<any> {
        try {
            const sql =
                'CALL GetScheduleByEntityIdAndDate(?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                entityId,
                date,
                entityType,
            ]);
            let schedulesRes: Schedules[] = results;
            if (date.toString() === dayjs().format('YYYY-MM-DD')) {
                if (results && results?.length > 0) {
                    const { schedules, updatedScheduleIds } =
                        markScheduleIfExpired(results);
                    schedulesRes = schedules.filter(
                        (schedule: Schedules) =>
                            schedule.status === 'available',
                    );
                    if (updatedScheduleIds.length > 0) {
                        await this.updateScheduleStatus(
                            updatedScheduleIds.map((id) => {
                                return { scheduleId: id, status: 'expired' };
                            }),
                        );
                    }
                } else {
                    return null;
                }
            }

            if (Array.isArray(schedulesRes) && schedulesRes.length > 0) {
                return schedulesRes;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    /**
     * Lấy danh sách lịch làm việc
     * @param(number) entityId
     * @param(string) date
     * @param(entityType)
     */
    async getScheduleByEntityIdForDoctor(
        entityId: number | null,
        date: string | null,
        entityType: string | null,
    ): Promise<Schedules[] | null> {
        try {
            const sql =
                'CALL GetScheduleByEntityIdAndDate(?,?,?,@err_code,@err_msg)';

            const [results] = await this.db.query(sql, [
                entityId,
                date,
                entityType,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            }
            return null;
        } catch (err: any) {
            throw err;
        }
    }

    /**
     * Xóa lịch làm việc
     * @param(number[]) ids
     */
    async deleteSchedules(ids: number[]): Promise<any> {
        try {
            const sql = 'CALL DeleteSchedules(?,@err_code,@err_msg)';
            const results = await this.db.query(sql, [JSON.stringify(ids)]);
            return results;
        } catch (err: any) {
            throw err;
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
