import { injectable } from 'tsyringe';
import { HomeMenu } from '../models/home_menu';
import { Database } from '../config/database';
@injectable()
export class HomeMenuRepository {
    constructor(private db: Database) {}
    async getHomeMenu(): Promise<any> {
        try {
            const sql = 'CALL GetHomeMenu(@err_code,@err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
