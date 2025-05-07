import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { WorkExperienceCreateDto } from '../models/work_experience';

@injectable()
export class WorkExperienceRepository {
    constructor(private db: Database) {}
    async createWorkExperiences(
        doctorId: number,
        workExperiences: WorkExperienceCreateDto[],
    ): Promise<any> {
        try {
            const sql = 'CALL CreateWorkExperience(?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                doctorId,
                JSON.stringify(workExperiences),
            ]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
