import { injectable } from 'tsyringe';
import { HomeDirectory } from '../models/home_directory';
import { Database } from '../config/database';
@injectable()
export class HomeDirectoryRepository {
    constructor(private db: Database) {}
    async getHomeDirectory(): Promise<any> {
        try {
            const sql = 'CALL GetHomeDirectory(@err_code,@err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
