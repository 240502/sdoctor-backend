import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { PatientProfile } from '../models/patient_profile';

@injectable()
export class PatientProfileRepository {
    constructor(private db: Database) {}

    async getPatientProfiles(uuid: string): Promise<PatientProfile[] | null> {
        try {
            const sql = 'CALL GetPatientProfiles(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [uuid]);
            if (!Array.isArray(results) && results.length > 0) {
                return null;
            }
            return results;
        } catch (err: any) {
            throw err;
        }
    }

    async getProfileByPhoneOrEmail(
        searchContent: string,
    ): Promise<PatientProfile | null> {
        try {
            const sql = 'CALL GetProfileByPhoneOrEmail(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [searchContent]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getRecentPatient(): Promise<PatientProfile | null> {
        try {
            const sql = 'CALL GetRecentPatient(@err_code,@err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async createPatientProfile(profile: PatientProfile): Promise<any> {
        try {
            const sql =
                'CALL CreatePatientProfile(?,?,?,?,?,?,?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                profile.id,
                profile.patientName,
                profile.gender,
                profile.patientPhone,
                profile.patientEmail,
                profile.birthday,
                profile.province,
                profile.district,
                profile.commune,
                profile.uuid,
            ]);
            return results[0];
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updatePatientProfile(profile: PatientProfile): Promise<any> {
        try {
            const sql =
                'CALL UpdatePatientProfile(?,?,?,?,?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                profile.patientName,
                profile.gender,
                profile.patientPhone,
                profile.patientEmail,
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
    async getPatientProfileByUuid(uuid: string): Promise<any> {
        try {
            const sql = 'CALL GetPatientProfileByUuid(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [uuid]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
