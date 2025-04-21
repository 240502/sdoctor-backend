import { injectable } from 'tsyringe';
import { ScheduleRepository } from '../repositories/doctorScheduleRepository';
import { DoctorSchedule } from '../models/doctor_schedule';

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
    async updateScheduleStatus(payload: any): Promise<any> {
        return this.scheduleRepository.updateScheduleStatus(payload);
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
