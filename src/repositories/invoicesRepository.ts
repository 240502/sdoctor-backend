import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Invoices, InvoicesCreateDto } from '../models/invoices';

@injectable()
export class InvoicesRepository {
    constructor(private db: Database) {}
    async createInvoiceDetail(
        data: [
            {
                invoiceId: number;
                serviceId: number;
                price: number;
            },
        ],
    ): Promise<any> {
        try {
            const sql = 'CALL CreateInvoiceDetail(?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [JSON.stringify(data)]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async deleteInvoiceDetail(id: number): Promise<any> {
        try {
            const sql = 'CALL DeleteInvoiceDetail(?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [id]);
            console.log('Kết quả xóa hóa đơn:', result);

            return true;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async getInvoiceById(id: number): Promise<Invoices | null> {
        try {
            const sql = 'CALL GetInvoiceById(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [id]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err);
        }
    }

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
                invoice.amount,
                JSON.stringify(invoice.services),
                invoice.paymentMethod,
            ]);
            return newInvoice;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async updateInvoice(invoice: {
        invoiceId: number;
        paymentMethod: number;
    }): Promise<any> {
        try {
            const sql = 'CALL UpdateInvoices(?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                invoice.invoiceId,
                invoice.paymentMethod,
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
        doctorId?: number,
        createdAt?: Date,
    ): Promise<any> {
        try {
            const sql = 'CALL ViewInvoice(?,?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                status,
                doctorId,
                createdAt,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            console.log('Có lõi khi lấy danh sách hóa đơn:', err);

            throw new Error(err);
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
