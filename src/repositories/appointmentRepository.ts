import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Appointment } from '../models/appointment';
@injectable()
export class AppointmentRepository {
    constructor(private db: Database) {}
    async cancelAppointment(id: number): Promise<any> {
        try {
            const sql = 'CALL CancelAppointment(?,@err_code,@err_msg)';
            await this.db.query(sql, [id]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async createAppointment(appointment: Appointment): Promise<any> {
        try {
            const sql =
                'CALL OrderAppointment(?,?,?,?,?,?,?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                appointment.doctor_id,
                appointment.appointment_date,
                appointment.patient_name,
                appointment.patient_phone,
                appointment.patient_email,
                appointment.year_of_birth,
                appointment.province,
                appointment.district,
                appointment.commune,
                appointment.examination_reason,
                appointment.time_id,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
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
    async ViewDetailAppointmentForPatient(
        pageIndex: number,
        pageSize: number,
        phone: string,
        statusId: number,
    ): Promise<any> {
        try {
            const sql =
                'CALL ViewAppointmentForPatient(?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                phone,
                statusId,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
