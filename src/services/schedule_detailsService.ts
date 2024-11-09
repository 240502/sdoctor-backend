import { injectable } from 'tsyringe';
import { ScheduleDetailsRepository } from '../repositories/schedule_detailsRepository';
import { ScheduleDetails } from '../models/schedule_details';
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
        scheduleDetails: ScheduleDetails[],
    ): Promise<any> {
        return this.scheduleDetailsRepository.createScheduleDetails(
            scheduleId,
            scheduleDetails,
        );
    }
    async deleteScheduleDetails(
        scheduleDetails: ScheduleDetails[],
    ): Promise<any> {
        return this.scheduleDetailsRepository.deleteScheduleDetails(
            scheduleDetails,
        );
    }
}
