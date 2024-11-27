import { injectable } from 'tsyringe';
import { ScheduleRepository } from '../repositories/scheduleRepository';
import { Schedule } from '../models/schedule';

@injectable()
export class ScheduleService {
    constructor(private scheduleRepository: ScheduleRepository) {}
    async createSchedule(schedule: Schedule): Promise<any> {
        return this.scheduleRepository.createSchedule(schedule);
    }
    async updateSchedule(id: number, time: string): Promise<any> {
        return this.scheduleRepository.updateSchedule(id, time);
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
        subscriberId: number,
        type: string,
    ): Promise<any> {
        return this.scheduleRepository.viewScheduleForDoctor(
            date,
            subscriberId,
            type,
        );
    }
}
