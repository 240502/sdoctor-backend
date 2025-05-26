import { injectable } from 'tsyringe';
import { InvoicesRepository } from '../repositories/invoicesRepository';
import { Invoices, InvoicesCreateDto } from '../models/invoices';
@injectable()
export class InvoicesService {
    constructor(private invoicesRepository: InvoicesRepository) {}

    async getInvoiceById(id: number): Promise<Invoices | null> {
        try {
            if (!id) {
                throw new Error('Thiếu tham số để lấy hóa đơn !');
            }
            return this.invoicesRepository.getInvoiceById(id);
        } catch (err: any) {
            throw err;
        }
    }
    async createInvoice(invoice: InvoicesCreateDto): Promise<any> {
        try {
            return this.invoicesRepository.createInvoice(invoice);
        } catch (err: any) {
            throw err;
        }
    }
    async updateInvoice(invoice: Invoices): Promise<any> {
        try {
            return this.invoicesRepository.updateInvoice(invoice);
        } catch (err: any) {
            throw err;
        }
    }
    async deleteInvoice(id: number): Promise<any> {
        try {
            if (!id) {
                throw new Error('Thiếu tham số để xóa !');
            }
            return this.invoicesRepository.deleteInvoice(id);
        } catch (err: any) {
            throw err;
        }
    }
    async getRecentInvoice(userId: number): Promise<any> {
        return this.invoicesRepository.getRecentInvoice(userId);
    }
    async getTotalRevenueByDateInNowWeek(
        startWeek: Date,
        endWeek: Date,
        doctorId: number,
    ): Promise<any> {
        return this.invoicesRepository.getTotalRevenueByDateInNowWeek(
            startWeek,
            endWeek,
            doctorId,
        );
    }
    async viewInvoice(
        pageIndex: number,
        pageSize: number,
        status: string,
        doctorId: number,
        fromDate: Date,
        toDate: Date,
    ): Promise<any> {
        try {
            return this.invoicesRepository.viewInvoice(
                pageIndex,
                pageSize,
                status,
                doctorId,
                fromDate,
                toDate,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async updateInvoiceStatus(id: number, status: string): Promise<any> {
        try {
            if (!id || !status) {
                throw new Error('Thiếu id và stauts');
            }
            return this.invoicesRepository.updateInvoiceStatus(id, status);
        } catch (err: any) {
            throw err;
        }
    }
    async getInvoiceByAppointmentId(
        appointmentId: number,
    ): Promise<Invoices | null> {
        try {
            if (!appointmentId) {
                throw new Error('Thiếu tham số !');
            }
            return this.invoicesRepository.getInvoiceByAppointmentId(
                appointmentId,
            );
        } catch (err: any) {
            throw err;
        }
    }
}
