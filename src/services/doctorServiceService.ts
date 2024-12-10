import { injectable } from 'tsyringe';
import { DoctorServiceRepository } from '../repositories/doctorServiceRepository';

@injectable()
export class DoctorServiceService {
    constructor(private doctorServiceRepository: DoctorServiceRepository) {}
    async getAllDoctorService(): Promise<any> {
        return this.doctorServiceRepository.getAllDoctorService();
    }
}
