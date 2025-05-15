import { injectable } from 'tsyringe';
import { DoctorExpertisesRepository } from '../repositories/doctor_expertisesRepository';
import { DoctorExpertisesCreateDto } from '../models/doctor_expertises';

@injectable()
export class DoctorExpertisesService {
    constructor(
        private doctorExpertisesRepository: DoctorExpertisesRepository,
    ) {}
    async getDoctorExpertisesByDoctorId(doctorId: number): Promise<any> {
        try {
            if (!doctorId) {
                throw new Error('Thiếu tham số để lấy dữ liệu !');
            }
            return await this.doctorExpertisesRepository.getDoctorExpertisesByDoctorId(
                doctorId,
            );
        } catch (err: any) {
            throw err;
        }
    }
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
    async updateDoctorExpertise(id: number, expertise: string): Promise<any> {
        try {
            if (!id || !expertise) {
                throw new Error('Thiếu tham số để cập nhật');
            }
            return await this.doctorExpertisesRepository.updateDoctorExpertise(
                id,
                expertise,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async deleteDoctorExpertise(id: number): Promise<any> {
        try {
            if (!id) {
                throw new Error('Thiếu tham số !');
            }
            return await this.doctorExpertisesRepository.deleteDoctorExpertise(
                id,
            );
        } catch (err: any) {
            throw err;
        }
    }
}
