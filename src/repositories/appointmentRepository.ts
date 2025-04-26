import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { AppointmentCreateDto, AppointmentRes } from '../models';
@injectable()
export class AppointmentRepository {
    constructor(private db: Database) {}

    async getAppointmentWithOptions(
        offset: number | null,
        pageSize: number | null,
        status: number | null,
        userId: number | null,
    ) {
        try {
            console.log(offset, pageSize, status, userId);

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
            console.log(results);

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
            console.log([uuid, pageSize, offset]);

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
                'CALL StatisticsAppointmentsByDay(?,?,?,@err_code,@err_msg)';
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
            console.log(id, status, reason);

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
