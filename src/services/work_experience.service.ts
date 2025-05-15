import { injectable } from 'tsyringe';
import { WorkExperienceRepository } from '../repositories/work_experienceRepository';
import {
    WorkExperienceCreateDto,
    WorkExperienceUpdateDto,
} from '../models/work_experience';

@injectable()
export class WorkExperiencesService {
    constructor(private workExperienceRepository: WorkExperienceRepository) {}
    async getWorkExperienceByDoctorId(doctorId: number): Promise<any> {
        try {
            if (!doctorId) {
                throw new Error('Thiếu tham số để lấy dữ liệu !');
            }
            return await this.workExperienceRepository.getWorkExperienceByDoctorId(
                doctorId,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async createWorkExperiences(
        doctorId: number,
        workExperience: WorkExperienceCreateDto[],
    ): Promise<any> {
        try {
            if (
                !doctorId ||
                !Array.isArray(workExperience) ||
                workExperience.length === 0
            ) {
                throw new Error('Thiếu tham số để  thêm dữ liệu !');
            }
            return await this.workExperienceRepository.createWorkExperiences(
                doctorId,
                workExperience,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async updateWorkExperience(
        workExperience: WorkExperienceUpdateDto,
    ): Promise<any> {
        try {
            if (
                !workExperience.id ||
                !workExperience.position ||
                !workExperience.workplace
            ) {
                throw new Error('Thiếu tham số để cập nhật!');
            }
            return await this.workExperienceRepository.updateWorkExperience(
                workExperience,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async deleteWorkExperience(id: number): Promise<any> {
        try {
            if (!id) {
                throw new Error('Thiếu tham số để xóa!');
            }
            return await this.workExperienceRepository.deleteWorkExperience(id);
        } catch (err: any) {
            throw err;
        }
    }
}
