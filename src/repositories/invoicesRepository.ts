import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Invoices } from '../models/invoices';

@injectable()
export class InvoicesRepository {
    constructor(private db: Database) {}
    async createInvoice(invoice: Invoices): Promise<any> {
        try {
            const sql = 'CALL CreateInvoices(?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                invoice.appointment_id,
                invoice.doctor_id,
                invoice.service_id,
                invoice.amount,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async updateInvoice(invoice: Invoices): Promise<any> {
        try {
            const sql = 'CALL UpdateInvoices(?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                invoice.id,
                invoice.service_id,
                invoice.amount,
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
}
