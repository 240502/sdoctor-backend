import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Doctor, DoctorInfo } from '../models/doctor';
@injectable()
export class DoctorRepository {
    constructor(private db: Database) {}
    async createDoctor(doctor: DoctorInfo): Promise<any> {
        try {
            const sql =
                'CALL CreateDoctor(?,?,?,?,?,?,?,?,?,?,?,?,?,@err_code,@err_msg )';
            await this.db.query(sql, [
                doctor.clinic_id,
                doctor.major_id,
                doctor.summary,
                doctor.title,
                doctor.fee,
                doctor.introduction,
                doctor.email,
                doctor.gender,
                doctor.address,
                doctor.phone,
                doctor.image,
                doctor.full_name,
                doctor.birthday,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updateDoctor(doctor: DoctorInfo): Promise<any> {
        try {
            console.log(doctor);
            const sql =
                'CALL UpdateDoctor(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@err_code,@err_msg )';
            await this.db.query(sql, [
                doctor.doctor_id,
                doctor.user_id,
                doctor.full_name,
                doctor.clinic_id,
                doctor.major_id,
                doctor.summary,
                doctor.image,
                doctor.email,
                doctor.phone,
                doctor.address,
                doctor.gender,
                doctor.title,
                doctor.fee,
                doctor.introduction,
                doctor.birthday,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updateViewDoctor(doctor_id: number): Promise<any> {
        try {
            const sql = 'CALL UpdateViewDoctor(?,@err_code,@err_msg)';
            await this.db.query(sql, [doctor_id]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async deleteDoctor(doctor_id: Number): Promise<any> {
        try {
            const sql = 'CALL DeleteDoctor(?,@err_code,@err_msg)';
            await this.db.query(sql, [doctor_id]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getDoctorById(id: number): Promise<any> {
        try {
            const sql = 'CALL GetDoctorById(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [id]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }
            return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async GetDoctorView(
        pageIndex: Number,
        pageSize: Number,
        majorId: Number | null,
        name: string | null,
        clinicId: number | null,
    ): Promise<any> {
        try {
            const sql = 'CALL GetDoctorView(?,?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                majorId,
                name,
                clinicId,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            }
            return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getQuantityDoctor(): Promise<any> {
        try {
            const sql = 'CALL GetCountDoctor(@err_code, @err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results[0].CountDoctor;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getCommonDoctor(): Promise<any> {
        try {
            const sql = 'CALL GetCommonDoctor(@err_code, @err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
