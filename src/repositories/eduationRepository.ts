import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { EducationCreateDto } from '../models/education';

@injectable()
export class EducationRepository {
    constructor(private db: Database) {}
    async createDoctorExpertises(
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
}
