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
}
