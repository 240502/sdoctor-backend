import { injectable } from 'tsyringe';
import { TimeRepository } from '../repositories/timeRepository';
import { Time } from '../models/time';

@injectable()
export class TimeService {
    constructor(private timeRepository: TimeRepository) {}
    async getTimeById(id: number): Promise<any> {
        return this.timeRepository.getTimeById(id);
    }
    async getTimeByTimeType(timeType: string): Promise<any> {
        return this.timeRepository.getTimeByTimeType(timeType);
    }
}
