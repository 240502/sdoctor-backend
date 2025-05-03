import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Invoices, InvoicesCreateDto } from '../models/invoices';

@injectable()
export class InvoicesRepository {
    constructor(private db: Database) {}

    async getInvoiceByAppointmentId(
        appointmentId: number,
    ): Promise<Invoices | null> {
        try {
            const sql = 'CALL GetInvoiceByAppointmentId(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [appointmentId]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async createInvoice(invoice: InvoicesCreateDto): Promise<any> {
        try {
            const sql = 'CALL CreateInvoices(?,?,?,?,?,@err_code,@err_msg)';
            const newInvoice = await this.db.query(sql, [
                invoice.appointmentId,
                invoice.doctorId,
                invoice.serviceId,
                invoice.amount,
                invoice.paymentMethod,
            ]);
            return newInvoice;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async updateInvoice(invoice: Invoices): Promise<any> {
        try {
            const sql = 'CALL UpdateInvoices(?,?,?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                invoice.id,
                invoice.service_id,
                invoice.amount,
                invoice.status,
                invoice.payment_method,
                invoice.patient_name,
                invoice.patient_phone,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async deleteInvoice(id: number): Promise<any> {
        try {
            const sql = 'CALL DeleteInvoice(?,@err_code,@err_msg)';
            await this.db.query(sql, [id]);
            return true;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async getRecentInvoice(userId: number): Promise<any> {
        try {
            const sql = 'CALL GetRecentInvoice(?,@err_code, @err_msg)';
            const [results] = await this.db.query(sql, [userId]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async getTotalRevenueByDateInNowWeek(
        startWeek: Date,
        endWeek: Date,
        doctorId: number,
    ): Promise<any> {
        try {
            const sql =
                'CALL GetTotalRevenueByDateInNowWeek(?,?,?,@err_code,@err_msg)';
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
    async viewInvoice(
        pageIndex: number,
        pageSize: number,
        status: string,
    ): Promise<any> {
        try {
            const sql = 'CALL ViewInvoice(?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                status,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updateInvoiceStatus(id: number, status: string) {
        try {
            const sql = 'CALL UpdateInvoiceStatus(?,?,@err_code,@err_msg)';
            await this.db.query(sql, [id, status]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
