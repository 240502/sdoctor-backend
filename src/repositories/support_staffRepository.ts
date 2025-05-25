import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import {
    SupportStaff,
    SupportStaffCreateDTO,
    SupportStaffUpdateDTO,
} from '../models/support_staff';
const md5 = require('md5');

@injectable()
export class SupportStaffRepository {
    constructor(private db: Database) {}

    async getSupportStaffById(
        employeeId: string,
    ): Promise<SupportStaff | null> {
        try {
            const sql = 'CALL GetSupportStaffById(?,@err_code,@err_msg)';

            const [results] = await this.db.query(sql, [employeeId]);
            if (!Array.isArray(results)) {
                return null;
            }
            return results[0];
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async getSupportStaffs(
        pageSize: number | null,
        offset: number | null,
        searchContent: string | null,
    ): Promise<SupportStaff[] | null> {
        try {
            const sql = 'CALL GetSupportStaffs(?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                pageSize,
                offset,
                searchContent,
            ]);

            if (!Array.isArray(results)) {
                return null;
            }
            return results;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async createSupportStaff(
        supportStaff: SupportStaffCreateDTO,
    ): Promise<any> {
        try {
            const sql =
                'CALL CreateSupportStaff(?, ?, ?, ?, ?,?, ?, ?, ?, ?,?,@err_code, @err_msg)';
            const result = await this.db.query(sql, [
                supportStaff.email,
                supportStaff.gender,
                supportStaff.phone,
                supportStaff.image,
                supportStaff.fullName,
                supportStaff.birthday,
                supportStaff.city,
                supportStaff.district,
                supportStaff.commune,
                supportStaff.supporterId,
                md5(supportStaff.email),
            ]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async updateSupportStaff(
        supportStaff: SupportStaffUpdateDTO,
    ): Promise<any> {
        try {
            const sql =
                'CALL UpdateSupportStaff(?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?,@err_code, @err_msg)';
            const result = await this.db.query(sql, [
                supportStaff.employeeId,
                supportStaff.image,
                supportStaff.fullName,
                supportStaff.gender,
                supportStaff.phone,
                supportStaff.email,
                supportStaff.city,
                supportStaff.district,
                supportStaff.commune,
                supportStaff.birthday,
                supportStaff.supporterId,
            ]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async deleteSupportStaff(id: number) {
        try {
            const sql = `CALL DeleteSupportStaff(?,@err_code,@err_msg)`;
            const result = await this.db.query(sql, [id]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
