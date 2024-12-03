import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Major } from '../models/major';
@injectable()
export class MajorRepository {
    constructor(private db: Database) {}
    async getCommonMajor(): Promise<any> {
        try {
            const sql = 'CALL GetCommonMajor(@err_code,@err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getAllMajor(): Promise<any> {
        try {
            const sql = 'CALL GetAllMajor(@err_code, @err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getMajorById(id: number): Promise<any> {
        try {
            const sql = 'CALL GetMajorById(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [id]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async viewMajor(pageIndex: number, pageSize: number): Promise<any> {
        try {
            const sql = 'CALL ViewMajors(?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [pageIndex, pageSize]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
