import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Clinic } from '../models/clinic';
@injectable()
export class ClinicRepository {
    constructor(private db: Database) {}
    async createClinic(clinic: Clinic): Promise<any> {
        try {
            const sql = 'CALL CreateClinic(?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                clinic.name,
                clinic.description,
                clinic.location,
                clinic.avatar,
                clinic.cover_image,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updateViewsClinic(id: number): Promise<any> {
        try {
            const sql = 'CALL UpdateViewsClinic(?,@err_code,@err_msg)';
            await this.db.query(sql, [id]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updateClinic(clinic: Clinic): Promise<any> {
        try {
            const sql = 'CALL UpdateClinic(?,?,?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                clinic.id,
                clinic.name,
                clinic.description,
                clinic.location,
                clinic.avatar,
                clinic.cover_image,
                clinic.created_at,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async deleteClinic(id: number): Promise<any> {
        try {
            const sql = 'CALL DeleteClinic(?,@err_code,@err_msg)';
            await this.db.query(sql, [id]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getClinicView(
        pageIndex: number,
        pageSize: number,
        location: string | null,
        name: string | null,
    ): Promise<any> {
        try {
            const sql = 'CALL GetClinicView(?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                location,
                name,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            }
            return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getClinicById(id: number): Promise<any> {
        try {
            const sql = 'CALL GetClinicById(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [id]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }
            return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getQuantityClinic(): Promise<any> {
        try {
            const sql = 'CALL GetCountClinic(@err_code,@err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }
            return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getCommonClinic(): Promise<any> {
        try {
            const sql = 'CALL GetCommonClinic(@err_code,@err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
