import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class ServiceRepository {
    constructor(private db: Database) {}

    async getServiceByDepartmentAndDoctor(
        department: number,
        doctorId: number,
    ): Promise<any> {
        try {
            const sql = ` CALL GetServiceByDepartmentAndDoctor(?,?,@err_code,@err_msg)`;
            const [results] = await this.db.query(sql, [department, doctorId]);
            if (!Array.isArray(results) || results.length === 0) {
                return null;
            }
            return results;
        } catch (err: any) {}
    }

    async getAllDoctorService(): Promise<any> {
        try {
            const sql = 'CALL GetAllDoctorService(@err_code,@err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getServiceByDepartmentId(departmentId: number): Promise<any> {
        try {
            const sql = 'CALL GetServiceByDepartmentId(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [departmentId]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
