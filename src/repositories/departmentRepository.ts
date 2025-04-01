import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { DepartmentResponse } from '../models/department';

@injectable()
export class DepartmentRepository {
    constructor(private db: Database) {}

    async getAllDepartment(): Promise<DepartmentResponse[] | any> {
        try {
            const sql = 'CALL GetAllDepartment(@err_code,@err_msg)';
            const [results] = await this.db.query(sql, []);
            return !results || results.length === 0 ? null : results;
        } catch (err: Error | any) {
            throw new Error(err);
        }
    }
    async getDepartmentByClinicId(
        clinicId: number,
    ): Promise<DepartmentResponse[] | any> {
        try {
            const sql = 'CALL GetDepartmentByClinicId(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [clinicId]);
            return !results || results.length === 0 ? null : results;
        } catch (err: Error | any) {
            throw err;
        }
    }
}
