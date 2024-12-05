import { injectable } from 'tsyringe';
import { ScheduleDetailsRepository } from '../repositories/doctorScheduleDetailsRepository';
import { DoctorScheduleDetail } from '../models/doctor_schedule_detail';
@injectable()
export class ScheduleDetailsService {
    constructor(private scheduleDetailsRepository: ScheduleDetailsRepository) {}
    async getScheduleDetailsByScheduleId(scheduleId: number): Promise<any> {
        return this.scheduleDetailsRepository.getScheduleDetailsByScheduleId(
            scheduleId,
        );
    }
    async updateAvailableScheduleDetails(
        scheduleDetailId: number,
    ): Promise<any> {
        return this.scheduleDetailsRepository.updateAvailableScheduleDetails(
            scheduleDetailId,
        );
    }
    async createScheduleDetails(
        scheduleId: number,
        scheduleDetails: DoctorScheduleDetail[],
    ): Promise<any> {
        return this.scheduleDetailsRepository.createScheduleDetails(
            scheduleId,
            scheduleDetails,
        );
    }
    async deleteScheduleDetails(
        scheduleDetails: DoctorScheduleDetail[],
    ): Promise<any> {
        return this.scheduleDetailsRepository.deleteScheduleDetails(
            scheduleDetails,
        );
    }
}
