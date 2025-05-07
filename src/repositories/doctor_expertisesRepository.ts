import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { DoctorExpertisesCreateDto } from '../models/doctor_expertises';

@injectable()
export class DoctorExpertisesRepository {
    constructor(private db: Database) {}
    async createDoctorExpertises(
        doctorId: number,
        specialtyId: number,
        expertises: DoctorExpertisesCreateDto[],
    ): Promise<any> {
        try {
            const sql = 'CALL CreateDoctorExpertise(?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                doctorId,
                specialtyId,
                JSON.stringify(expertises),
            ]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
