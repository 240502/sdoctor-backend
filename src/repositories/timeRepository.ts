import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Time } from '../models/time';
@injectable()
export class TimeRepository {
    constructor(private db: Database) {}
    async getTimeById(id: number): Promise<any> {
        try {
            const sql = 'CALL GetTimeById(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [id]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
