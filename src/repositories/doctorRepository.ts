import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import {
    Doctor,
    DoctorCreateDto,
    DoctorInfo,
    DoctorUpdateDto,
} from '../models/doctor';
const md5 = require('md5');
@injectable()
export class DoctorRepository {
    constructor(private db: Database) {}

    async getDoctorByUserId(userId: number): Promise<any> {
        try {
            const sql = 'CALL GetDoctorByUserId(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [userId]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async createDoctor(doctor: DoctorCreateDto): Promise<any> {
        try {
            const sql =
                'CALL CreateDoctor(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@err_code,@err_msg)';
            const [result] = await this.db.query(sql, [
                doctor.email,
                doctor.gender,
                doctor.phone,
                doctor.image,
                doctor.fullName,
                doctor.birthday,
                doctor.city,
                doctor.district,
                doctor.commune,
                doctor.clinicId,
                doctor.summary,
                doctor.title,
                doctor.introduction,
                doctor.department,
                md5(doctor.email),
                doctor.roomId,
            ]);
            return result[0].lastUserId;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updateDoctor(doctor: DoctorUpdateDto): Promise<any> {
        try {
            const sql =
                'CALL UpdateDoctor(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@err_code,@err_msg )';
            const result = await this.db.query(sql, [
                doctor.doctorId,
                doctor.image,
                doctor.clinicId,
                doctor.department,
                doctor.fullName,
                doctor.gender,
                doctor.phone,
                doctor.email,
                doctor.city,
                doctor.district,
                doctor.commune,
                doctor.title,
                doctor.birthday,
                doctor.summary,
                doctor.introduction,
                doctor.roomId,
            ]);
            console.log(doctor);

            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updateViewDoctor(doctor_id: number): Promise<any> {
        try {
            const sql = 'CALL UpdateViewsDoctor(?,@err_code,@err_msg)';
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

    async getListDoctorsWithPaginationAndFilters(
        pageIndex: number | null,
        pageSize: number | null,
        departmentIds: string | null,
        clinicId: number | null,
        doctorTitles: string | null,
        startPrice: number | null,
        endPrice: number | null,
        gender: string | null,
        searchContent: string | null,
    ): Promise<any> {
        try {
            const sql =
                'CALL GetListDoctorsWithPaginationAndFilters(?,?,?,?,?,?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                departmentIds,
                clinicId,
                doctorTitles,
                startPrice,
                endPrice,
                gender,
                searchContent,
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
    async getCommonDoctor(
        pageIndex: number | null,
        pageSize: number | null,
        withoutId: number | null,
    ): Promise<any> {
        try {
            const sql = 'CALL GetCommonDoctor(?,?,?,@err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                withoutId,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updateAverageDoctorStar(doctorId: number): Promise<any> {
        try {
            const sql = 'CALL UpdateAverageStarDoctor(?,@err_code,@err_msg)';
            await this.db.query(sql, [doctorId]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
