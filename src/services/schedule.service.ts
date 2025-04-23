import { injectable } from 'tsyringe';
import { ScheduleRepository } from '../repositories/schedulesRepository';
import { DoctorSchedule } from '../models/doctor_schedule';
import { Schedules } from '../models';

@injectable()
export class ScheduleService {
    constructor(private scheduleRepository: ScheduleRepository) {}
    async createSchedule(schedule: DoctorSchedule): Promise<any> {
        return this.scheduleRepository.createSchedule(schedule);
    }
    async updateSchedule(id: number, scheduleDetails: any): Promise<any> {
        return this.scheduleRepository.updateSchedule(id, scheduleDetails);
    }
    async deleteSchedule(id: number) {
        return this.scheduleRepository.deleteSchedule(id);
    }
    async viewSchedules(
        entityId: number,
        date: Date,
        entityType: string,
    ): Promise<any> {
        return this.scheduleRepository.viewSchedules(
            entityId,
            date,
            entityType,
        );
    }
    async getScheduleByEntityIdForDoctor(
        entityId: number | null,
        date: string | null,
        entityType: string | null,
    ): Promise<Schedules[] | null> {
        try {
            let errors: string[] = [];
            if (!entityId) {
                errors.push('entityId is not empty');
            } else if (!date) {
                errors.push('date is not empty');
            }
            if (errors.length > 0) {
                throw new Error(errors.join('/n'));
            }
            return await this.scheduleRepository.getScheduleByEntityIdForDoctor(
                entityId,
                date,
                entityType,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async updateScheduleStatus(payload: any): Promise<any> {
        return this.scheduleRepository.updateScheduleStatus(payload);
    }
    async deleteSchedules(ids: number[]): Promise<any> {
        try {
            if (ids.length === 0 && !Array.isArray(ids)) {
                throw new Error('Thiếu thông tin để xóa dữ liệu !');
            }
            return await this.scheduleRepository.deleteSchedules(ids);
        } catch (err: any) {
            throw err;
        }
    }
    //     async viewScheduleForClient(
    //         date: string,
    //         subscriberId: number,
    //         type: string,
    //     ): Promise<any> {
    //         return this.scheduleRepository.viewScheduleForClient(
    //             date,
    //             subscriberId,
    //             type,
    //         );
    //     }
    //     async viewScheduleForDoctor(date: string, doctor_id: number): Promise<any> {
    //         return this.scheduleRepository.viewScheduleForDoctor(date, doctor_id);
    //     }
    // }
}
