import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class RoomsRepository {
    constructor(private db: Database) {}

    async getRoomsByClinicAndDepartment(
        clinicId: number,
        departmentId: number,
    ) {
        try {
            const sql = `CALL GetRoomsByClinicAndDepartment(?,?,@err_code,@err_msg)`;
            const [results] = await this.db.query(sql, [
                clinicId,
                departmentId,
            ]);
            if (!Array.isArray(results) && results.length === 0) {
                return null;
            }
            return results;
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
