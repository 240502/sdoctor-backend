import { injectable } from 'tsyringe';
import { InvoicesRepository } from '../repositories/invoicesRepository';
import { Invoices } from '../models/invoices';
@injectable()
export class InvoicesService {
    constructor(private invoicesRepository: InvoicesRepository) {}
    async createInvoice(invoice: Invoices): Promise<any> {
        return this.invoicesRepository.createInvoice(invoice);
    }
    async updateInvoice(invoice: Invoices): Promise<any> {
        return this.invoicesRepository.updateInvoice(invoice);
    }
    async deleteInvoice(id: number): Promise<any> {
        return this.invoicesRepository.deleteInvoice(id);
    }
    async getRecentInvoice(): Promise<any> {
        return this.invoicesRepository.getRecentInvoice();
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
    ): Promise<any> {
        return this.invoicesRepository.viewInvoice(pageIndex, pageSize, status);
    }
    async updateInvoiceStatus(id: number, status: string): Promise<any> {
        return this.invoicesRepository.updateInvoiceStatus(id, status);
    }
    async getInvoiceByAppointmentId(
        appointmentId: number,
    ): Promise<Invoices | null> {
        return this.invoicesRepository.getInvoiceByAppointmentId(appointmentId);
    }
}
