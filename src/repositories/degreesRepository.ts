import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class DegreesRepository {
    constructor(private db: Database) {}

    async getAllDegrees() {
        try {
            const query = 'CALL GetAllDegrees(@err_code,@err_msg)';
            const [res] = await this.db.query(query, []);
            if (res.length > 0 && Array.isArray(res)) {
                return res;
            }
            return null;
        } catch (err: Error | any) {
            throw err;
        }
    }
}
