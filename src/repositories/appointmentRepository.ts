import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Appointment } from '../models/appointment';
@injectable()
export class AppointmentRepository {
    constructor(private db: Database) {}
    async getQuantityRejectedAppointmentByYearAndMonth(
        year: number,
        month: number,
    ): Promise<any> {
        try {
            const sql =
                'CALL GetQuantityRejectedAppointmentByYearAndMonth(?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [month, year]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0].RecordCount;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getAllAppointmentByYearAndMonth(
        year: number,
        month: number,
    ): Promise<any> {
        try {
            const sql =
                'CALL GetAllAppointmentByYearAndMonth(?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [month, year]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0].RecordCount;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
