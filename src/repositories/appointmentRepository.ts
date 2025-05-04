import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { AppointmentCreateDto, AppointmentRes } from '../models';
@injectable()
export class AppointmentRepository {
    constructor(private db: Database) {}

    async getRecentAppointments(
        entityId: number,
        limit: number,
        withoutId: number,
    ): Promise<AppointmentRes[] | null> {
        try {
            const sql = 'CALL GetRecentAppointments(?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                entityId,
                limit,
                withoutId,
            ]);
            if (!Array.isArray(results) && results.length > 0) {
                return null;
            }
            return results;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async statisticsAppointmentsByDay(
        startWeek: Date,
        endWeek: Date,
        doctorId: number,
    ) {
        try {
            const sql = `CALL sdoctor.StatisticsAppointmentsByDay(?, ?, ?, @err_code, @err_msg)`;
            const [results] = await this.db.query(sql, [
                startWeek,
                endWeek,
                doctorId,
            ]);
            if (!Array.isArray(results) && results.length === 0) {
                return null;
            }
            return results;
        } catch (err: any) {
            throw err;
        }
    }
    async getAppointmentsInDay(
        doctorId: number,
    ): Promise<AppointmentRes[] | null> {
        try {
            const sql = 'CALL GetAppointmentsInDay(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [doctorId]);
            if (!Array.isArray(results) && results.length === 0) {
                return null;
            }
            return results;
        } catch (err: any) {
            throw err;
        }
    }
    async getWaitingPatientsCount(doctorId: number): Promise<any> {
        try {
            const sql = `CALl GetWaitingPatientsCount(?,@err_code,@err_msg)`;
            const [results] = await this.db.query(sql, [doctorId]);
            if (!Array.isArray(results) && results.length > 0) {
                return null;
            }
            return results[0];
        } catch (err: any) {
            throw err;
        }
    }

    async getAppointmentWithOptions(
        offset: number | null,
        pageSize: number | null,
        status: number | null,
        userId: number | null,
    ) {
        try {
            const sql =
                'CALL GetAppointmentWithOptions(?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                offset,
                pageSize,
                status,
                userId,
            ]);
            if (!Array.isArray(results) && results?.length === 0) {
                return null;
            }
            return results;
        } catch (err: any) {
            throw err;
        }
    }

    async getAppointmentByUuid(
        uuid: string,
        pageSize: number | null,
        offset: number | null,
        status: number | null,
    ): Promise<AppointmentRes[] | null> {
        try {
            const sql = 'CALL GetAppointmentByUuid(?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                uuid,
                pageSize,
                offset,
                status,
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
    async getAppointmentByType(
        pageIndex: number,
        pageSize: number,
        doctorId: number,
        type: number,
    ): Promise<any> {
        try {
            const sql =
                'CALL GetAppointmentsByStatus(?,?,?,?,@err_code,@err_msg)';
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

    async getTotalPatientInDay(doctorId: number): Promise<any> {
        try {
            const sql = 'CALL GetTotalPatientInDay(?,@err_code,@err_msg)';
            const [result] = await this.db.query(sql, [doctorId]);
            if (Array.isArray(result) && result.length > 0) {
                return result[0];
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getTotalAppointmentsCompleted(doctorId: number): Promise<any> {
        try {
            const sql =
                'CALL GetTotalAppointmentsCompleted(?,@err_code,@err_msg)';
            const [result] = await this.db.query(sql, [doctorId]);
            if (Array.isArray(result) && result.length > 0) {
                return result[0];
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

    async createAppointment(appointment: AppointmentCreateDto): Promise<any> {
        try {
            const sql =
                'CALL OrderAppointment(?,?,?,?,?,?,?,@err_code,@err_msg)';
            const [result] = await this.db.query(sql, [
                appointment.doctorId,
                appointment.appointmentDate,
                appointment.examinationReason,
                appointment.location,
                appointment.uuid,
                appointment.scheduleId,
                appointment.type,
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

    async getAppointmentById(id: number): Promise<any> {
        try {
            const sql = 'CALL GetAppointmentById(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [id]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getAppointmentAtInvoice(
        patientName: string,
        doctorName: string,
        patientPhone: string,
        appointmentDate: Date,
    ): Promise<any> {
        try {
            const sql =
                'CALL GetAppointmentAtInvoice(?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                patientName,
                doctorName,
                patientPhone,
                appointmentDate,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async updateIsValuate(appointmentId: number): Promise<any> {
        try {
            const sql = 'CALL UpdateIsEvaluate(?,@err_code,@err_msg)';
            await this.db.query(sql, [appointmentId]);
            return true;
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
