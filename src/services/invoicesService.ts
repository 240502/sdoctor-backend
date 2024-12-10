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
}
