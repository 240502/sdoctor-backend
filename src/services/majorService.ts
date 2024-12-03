import { injectable } from 'tsyringe';
import { MajorRepository } from '../repositories/majorRepository';

@injectable()
export class MajorService {
    constructor(private majorRepository: MajorRepository) {}
    async getCommonMajor(): Promise<any> {
        return this.majorRepository.getCommonMajor();
    }
    async getAllMajor(): Promise<any> {
        return this.majorRepository.getAllMajor();
    }
    async getMajorById(id: number): Promise<any> {
        return this.majorRepository.getMajorById(id);
    }
    async viewMajor(pageIndex: number, pageSize: number): Promise<any> {
        return this.majorRepository.viewMajor(pageIndex, pageSize);
    }
}
