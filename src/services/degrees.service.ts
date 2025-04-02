import { injectable } from 'tsyringe';
import { DegreesRepository } from '../repositories/degreesRepository';

@injectable()
export class DegreesService {
    constructor(private degreesRepository: DegreesRepository) {}

    async getAllDegrees() {
        return await this.degreesRepository.getAllDegrees();
    }
}
