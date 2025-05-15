import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { EducationCreateDto, EducationUpdateDto } from '../models/education';

@injectable()
export class EducationRepository {
    constructor(private db: Database) {}
    async getEducationByDoctorId(doctorId: number): Promise<any> {
        try {
            const sql = 'CALL GetEducationByDoctorId(?,@err_code,@err_msg)';
            const [result] = await this.db.query(sql, [doctorId]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async createEducation(
        doctorId: number,
        educations: EducationCreateDto[],
    ): Promise<any> {
        try {
            const sql = 'CALL CreateEducation(?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                doctorId,
                JSON.stringify(educations),
            ]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async updateEducation(education: EducationUpdateDto): Promise<any> {
        try {
            const sql = 'CALL UpdateEducation(?,?,?,?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                education.id,
                education.degree,
                education.institution,
                education.fromYear,
                education.toYear,
            ]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async deleteEducation(id: number): Promise<any> {
        try {
            const sql = 'CALL DeleteEducation(?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [id]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
