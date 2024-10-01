import { injectable } from 'tsyringe';
import { MajorRepository } from '../repositories/majorRepository';
import { Major } from '../models/major';

@injectable()
export class MajorService {
    constructor(private majorRepository: MajorRepository) {}
    async getCommonMajor(): Promise<any> {
        return this.majorRepository.getCommonMajor();
    }
}
