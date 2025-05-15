import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import {
    WorkExperienceCreateDto,
    WorkExperienceUpdateDto,
} from '../models/work_experience';

@injectable()
export class WorkExperienceRepository {
    constructor(private db: Database) {}
    async getWorkExperienceByDoctorId(doctorId: number): Promise<any> {
        try {
            const sql =
                'CALL GetWorkExperienceByDoctorId(?,@err_code,@err_msg)';
            const [result] = await this.db.query(sql, [doctorId]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async createWorkExperiences(
        doctorId: number,
        workExperience: WorkExperienceCreateDto[],
    ): Promise<any> {
        try {
            const sql = 'CALL CreateWorkExperience(?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                doctorId,
                JSON.stringify(workExperience),
            ]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async updateWorkExperience(
        workExperience: WorkExperienceUpdateDto,
    ): Promise<any> {
        try {
            const sql =
                ' CALL UpdateWorkExperience(?,?,?,?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                workExperience.id,
                workExperience.workplace,
                workExperience.position,
                workExperience.fromYear,
                workExperience.toYear,
            ]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async deleteWorkExperience(id: number): Promise<any> {
        try {
            const sql = 'CALL DeleteWorkExperience(?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [id]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
