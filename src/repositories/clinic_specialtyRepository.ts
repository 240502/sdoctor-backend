import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { ClinicSpecialty } from '../models/clinic_specialty';

@injectable()
export class ClinicSpecialtyRepository {
    constructor(private db: Database) {}

    async createClinicSpecialty(clinicSpecialty: ClinicSpecialty) {
        try {
            const sql = 'CALL CreateClinicDepartment(?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                clinicSpecialty.clinicId,
                clinicSpecialty.specialtyId,
            ]);
            return result;
        } catch (err: any) {
            throw err;
        }
    }
    async updateClinicSpecialty(clinicSpecialy: ClinicSpecialty) {
        try {
            const sql = 'CALL UpdateClinicSpecialty(?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                clinicSpecialy.id,
                clinicSpecialy.specialtyId,
            ]);
            return result;
        } catch (err: any) {
            throw err;
        }
    }

    async deleteClinicSpecialty(id: number) {
        try {
            const sql = 'CALL DeleteClinicSpecialty(?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [id]);
            return result;
        } catch (err: any) {
            throw err;
        }
    }

    async getClinicSpecialtyByClinicId(clinicId: number) {
        try {
            const sql =
                'CALL GetClinicSpecialtyByClinicId(?,@err_code,@err_msg)';
            const [result] = await this.db.query(sql, [clinicId]);

            if (!Array.isArray(result) && result.length === 0) {
                return null;
            }
            return result;
        } catch (err: any) {
            throw err;
        }
    }
}
