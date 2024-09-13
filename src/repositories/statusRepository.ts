import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Status } from '../models/status';
@injectable()
export class StatusRepository {
    constructor(private db: Database) {}
    async getAllStatus(): Promise<any> {
        try {
            const sql = 'CALL GetAllStatus(@err_code,@err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            }
            return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
