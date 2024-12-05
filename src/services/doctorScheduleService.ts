import { injectable } from 'tsyringe';
import { DoctorScheduleRepository } from '../repositories/doctorScheduleRepository';
import { DoctorSchedule } from '../models/doctor_schedule';
import { DoctorScheduleDetail } from '../models/doctor_schedule_detail';

@injectable()
export class DoctorScheduleService {
    constructor(private scheduleRepository: DoctorScheduleRepository) {}
    async createSchedule(schedule: DoctorSchedule): Promise<any> {
        return this.scheduleRepository.createSchedule(schedule);
    }
    async updateSchedule(id: number, scheduleDetails: any): Promise<any> {
        return this.scheduleRepository.updateSchedule(id, scheduleDetails);
    }
    async deleteSchedule(id: number) {
        return this.scheduleRepository.deleteSchedule(id);
    }
    async viewSchedule(
        date: Date,
        pageIndex: number,
        pageSize: number,
    ): Promise<any> {
        return this.scheduleRepository.ViewSchedule(date, pageIndex, pageSize);
    }
    async viewScheduleForClient(
        date: string,
        subscriberId: number,
        type: string,
    ): Promise<any> {
        return this.scheduleRepository.viewScheduleForClient(
            date,
            subscriberId,
            type,
        );
    }
    async viewScheduleForDoctor(
        date: string,
        doctor_id: number,
    ): Promise<any> {
        return this.scheduleRepository.viewScheduleForDoctor(
            date,
            doctor_id,
        );
    }
}
