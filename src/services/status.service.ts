import { injectable } from 'tsyringe';
import { Status } from '../models/status';
import { StatusRepository } from '../repositories/statusRepository';
@injectable()
export class StatusService {
    constructor(private statusRepository: StatusRepository) {}

    async getAllStatus(): Promise<any> {
        return this.statusRepository.getAllStatus();
    }
}
