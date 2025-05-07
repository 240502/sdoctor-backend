import { injectable } from 'tsyringe';
import { WorkExperienceRepository } from '../repositories/work_experienceRepository';
import { WorkExperienceCreateDto } from '../models/work_experience';

@injectable()
export class WorkExperiencesService {
    constructor(private workExperienceRepository: WorkExperienceRepository) {}

    async createWorkExperiences(
        doctorId: number,
        workExperiences: WorkExperienceCreateDto[],
    ): Promise<any> {
        try {
            if (
                !doctorId ||
                !Array.isArray(workExperiences) ||
                workExperiences.length === 0
            ) {
                throw new Error('Thiếu tham số để  thêm dữ liệu !');
            }
            return await this.workExperienceRepository.createWorkExperiences(
                doctorId,
                workExperiences,
            );
        } catch (err: any) {
            throw err;
        }
    }
}
