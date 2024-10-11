import { injectable } from 'tsyringe';
import { CategoryService } from '../models/category_service';
import { Database } from '../config/database';

@injectable()
export class CategoryServiceRepository {
    constructor(private db: Database) {}
    async getAllCategoryServices(): Promise<any> {
        try {
            const sql = 'CALL GetAllCategoryServices(@err_code,@err_msg)';
            const [results] = await this.db.query(sql, []);
            if (results.length > 0 && Array.isArray(results)) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
