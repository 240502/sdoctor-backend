import { injectable } from 'tsyringe';
import { Database } from '../config/database';
@injectable()
export class AppointmentStatusRepository {
    constructor(private db: Database) {}

    async getAllAppointmentStatus(): Promise<any> {
        try {
            const sql = 'CALL GetAllAppointmentStatus(@err_code,@err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
