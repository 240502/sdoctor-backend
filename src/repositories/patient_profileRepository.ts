import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { PatientProfile } from '../models/patient_profile';

@injectable()
export class PatientProfileRepository {
    constructor(private db: Database) {}
    async createPatientProfile(profile: PatientProfile): Promise<any> {
        try {
            const sql =
                'CALL CreatePatientProfile(?,?,?,?,?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                profile.patient_name,
                profile.gender,
                profile.patient_phone,
                profile.patient_email,
                profile.birthday,
                profile.province,
                profile.district,
                profile.commune,
                profile.uuid,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updatePatientProfile(profile: PatientProfile): Promise<any> {
        try {
            const sql =
                'CALL UpdatePatientProfile(?,?,?,?,?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                profile.patient_name,
                profile.gender,
                profile.patient_phone,
                profile.patient_email,
                profile.birthday,
                profile.province,
                profile.district,
                profile.commune,
                profile.uuid,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async deletePatientProfile(uuid: string): Promise<any> {
        try {
            const sql = 'CALL DeletePatientProfile(?,@err_code,@err_msg)';
            await this.db.query(sql, [uuid]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
