import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { DoctorExpertisesCreateDto } from '../models/doctor_expertises';

@injectable()
export class DoctorExpertisesRepository {
    constructor(private db: Database) {}

    async getDoctorExpertisesByDoctorId(doctorId: number): Promise<any> {
        try {
            const sql =
                'CALL GetDoctorExpertisesByDoctorId(?,@err_code,@err_msg)';
            const [result] = await this.db.query(sql, [doctorId]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async createDoctorExpertises(
        doctorId: number,
        expertises: string[],
    ): Promise<any> {
        try {
            const sql = 'CALL CreateDoctorExpertise(?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                doctorId,
                JSON.stringify(expertises),
            ]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async updateDoctorExpertise(id: number, expertise: string): Promise<any> {
        try {
            const sql = 'CALL UpdateDoctorExpertise(?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [id, expertise]);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }
    async deleteDoctorExpertise(id: number): Promise<any> {
        try {
            const sql = 'CALL DeleteDoctorExpertise(?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [id]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
