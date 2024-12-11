import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Appointment } from '../models/appointment';
@injectable()
export class AppointmentRepository {
    constructor(private db: Database) {}

    async getAppointmentByType(
        pageIndex: number,
        pageSize: number,
        doctorId: number,
        type: number,
    ): Promise<any> {
        try {
            const sql = 'CALL GetAppointmentByType(?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                doctorId,
                type,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getAppointmentInDay(doctorId: number): Promise<any> {
        try {
            const sql = 'CALL GetAppointmentInDay(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [doctorId]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getTotalPatientInDay(doctorId: number): Promise<any> {
        try {
            const sql = 'CALL GetTotalPatientInDay(?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [doctorId]);
            if (Array.isArray(result) && result.length > 0) {
                return result[0];
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getTotalPatientExaminedInDay(doctorId: number): Promise<any> {
        try {
            const sql =
                'CALL GetTotalPatientExaminedInDay(?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [doctorId]);
            if (Array.isArray(result) && result.length > 0) {
                return result[0];
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getTotalAppointmentByWeek(
        startWeek: Date,
        endWeek: Date,
        doctorId: number,
    ): Promise<any> {
        try {
            const sql =
                'CALL GetTotalAppointmentByWeek(?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                startWeek,
                endWeek,
                doctorId,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getRecentPatientExamined(): Promise<any> {
        try {
            const sql = 'CALL GetRecentPatientExamined(@err_code, @err_msg)';
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

    async getRecentPatientOrdered(): Promise<any> {
        try {
            const sql = 'CALL GetRecentPatientOrdered(@err_code, @err_msg)';
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

    async updateAppointmentStatus(
        id: number,
        status: number,
        reason: string,
    ): Promise<any> {
        try {
            const sql =
                'CALL UpdateAppointmentStatus(?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [id, status, reason]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getRevenueByMonth(month: number, year: number): Promise<any> {
        try {
            const sql = 'CALL GetRevenueByMonth(?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [month, year]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0].SumRevenue;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async createAppointment(appointment: Appointment): Promise<any> {
        try {
            const sql =
                'CALL OrderAppointment(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@err_code,@err_msg)';
            const [result] = await this.db.query(sql, [
                appointment.doctor_id,
                appointment.appointment_date,
                appointment.patient_name,
                appointment.patient_phone,
                appointment.patient_email,
                appointment.birthday,
                appointment.province,
                appointment.district,
                appointment.commune,
                appointment.examination_reason,
                appointment.time_id,
                appointment.gender,
                appointment.doctor_name,
                appointment.price,
                appointment.time_value,
                appointment.location,
                appointment.service_id,
                appointment.service_name,
            ]);
            if (Array.isArray(result) && result.length > 0) {
                return result[0];
            } else {
                return null;
            }
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
    async ViewAppointment(
        pageIndex: number,
        pageSize: number,
        phone: string,
        statusId: number,
    ): Promise<any> {
        try {
            const sql = 'CALL ViewAppointment(?,?,?,?,@err_code,@err_msg)';
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
    async getAppointmentById(id: number): Promise<any> {
        try {
            const sql = 'CALL GetAppointmentById(?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [id]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
