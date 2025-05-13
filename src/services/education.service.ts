import { injectable } from 'tsyringe';
import { EducationCreateDto } from '../models/education';
import { EducationRepository } from '../repositories/eduationRepository';

@injectable()
export class EducationService {
    constructor(private educationRepository: EducationRepository) {}
    async getEducationByDoctorId(doctorId: number): Promise<any> {
        try {
            if (!doctorId) {
                throw new Error('Thiếu tham số để lấy dữ liệu !');
            }
            return await this.educationRepository.getEducationByDoctorId(
                doctorId,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async createEducation(
        doctorId: number,
        educations: EducationCreateDto[],
    ): Promise<any> {
        try {
            if (
                !doctorId ||
                !Array.isArray(educations) ||
                educations.length === 0
            ) {
                throw new Error('Thiếu tham số để  thêm dữ liệu !');
            }
            return await this.educationRepository.createDoctorExpertises(
                doctorId,
                educations,
            );
        } catch (err: any) {
            throw err;
        }
    }
}
