import { injectable } from 'tsyringe';
import { EducationCreateDto, EducationUpdateDto } from '../models/education';
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
            return await this.educationRepository.createEducation(
                doctorId,
                educations,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async updateEducation(education: EducationUpdateDto): Promise<any> {
        try {
            if (!education.id || !education.institution || !education.degree) {
                throw new Error('Thiếu tham số để cập nhật dữ liệu!');
            }
            return await this.educationRepository.updateEducation(education);
        } catch (err: any) {
            throw err;
        }
    }
    async deleteEducation(id: number): Promise<any> {
        try {
            if (!id) {
                throw new Error('Thiếu tham số để xóa !');
            }
            return await this.educationRepository.deleteEducation(id);
        } catch (err: any) {
            throw err;
        }
    }
}
