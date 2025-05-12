import { injectable } from 'tsyringe';
import { DoctorExpertisesRepository } from '../repositories/doctor_expertisesRepository';
import { DoctorExpertisesCreateDto } from '../models/doctor_expertises';

@injectable()
export class DoctorExpertisesService {
    constructor(
        private doctorExpertisesRepository: DoctorExpertisesRepository,
    ) {}

    async createDoctorExpertises(
        doctorId: number,
        expertises: string[],
    ): Promise<any> {
        try {
            if (
                !doctorId ||
                !Array.isArray(expertises) ||
                expertises.length === 0
            ) {
                throw new Error('Thiếu tham số để  thêm dữ liệu !');
            }
            return await this.doctorExpertisesRepository.createDoctorExpertises(
                doctorId,
                expertises,
            );
        } catch (err: any) {
            throw err;
        }
    }
}
