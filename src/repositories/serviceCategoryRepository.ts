import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class CategoryServiceRepository {
    constructor(private db: Database) {}
    async getAll(): Promise<any> {
        try {
            const sql =
                'CALL GetAllMedicalPackageCategories(@err_code,@err_msg)';
            const [results] = await this.db.query(sql, []);
            if (results.length > 0 && Array.isArray(results)) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
