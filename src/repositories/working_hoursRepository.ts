import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { WorkingHours, WorkingHoursCreateDto } from '../models/working_hours';

@injectable()
export class WorkingHoursRepository {
    constructor(private db: Database) {}

    async createWorkingHours(workingHours: WorkingHoursCreateDto) {
        try {
            const sql = 'CALL CreateWorkingHours(?,?,?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                workingHours.clinicId,
                workingHours.dayOfWeek,
                workingHours.startTime,
                workingHours.endTime,
            ]);
            return result;
        } catch (err: any) {
            throw err;
        }
    }

    async updateWorkingHours(workingHours: WorkingHours) {
        try {
            const sql = 'CALL UpdateWorkingHours(?,?,?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                workingHours.id,
                workingHours.dayOfWeek,
                workingHours.startTime,
                workingHours.endTime,
            ]);
            return result;
        } catch (err: any) {
            throw err;
        }
    }

    async deleteWorkingHours(id: number) {
        try {
            const sql = 'CALL DeleteWorkingHours(?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [id]);
            return result;
        } catch (err: any) {
            throw err;
        }
    }

    async getWorkingHoursByClinicId(clinicId: number) {
        try {
            const sql = 'CALL GetWorkingHoursByClinicId(?,@err_code,@err_msg)';
            const [result] = await this.db.query(sql, [clinicId]);
            if (!Array.isArray(result) || result.length === 0) {
                return null;
            }
            return result;
        } catch (err: any) {
            throw err;
        }
    }
}
