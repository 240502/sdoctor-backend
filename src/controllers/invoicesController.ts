import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { InvoicesService } from '../services/invoicesService';
import { Invoices } from '../models/invoices';

@injectable()
export class InvoiceController {
    constructor(private invoicesService: InvoicesService) {}
    async createInvoice(req: Request, res: Response): Promise<void> {
        try {
            const invoice: Invoices = req.body as Invoices;
            const newInvoice =
                await this.invoicesService.createInvoice(invoice);
            res.json({ message: 'Success', result: newInvoice });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async updateInvoice(req: Request, res: Response): Promise<void> {
        try {
            const invoice: Invoices = req.body as Invoices;
            await this.invoicesService.updateInvoice(invoice);
            res.json({ message: 'Success', result: true });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async deleteInvoice(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            await this.invoicesService.deleteInvoice(id);
            res.json({ message: 'Success', result: true });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async getRecentInvoice(req: Request, res: Response): Promise<any> {
        try {
            const result = await this.invoicesService.getRecentInvoice();
            if (result) {
                res.json(result);
            } else {
                res.status(404).json({ message: 'Không tồn tại bản ghi nào!' });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async getTotalRevenueByDateInNowWeek(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            const { startWeek, endWeek, doctorId } = req.body;
            const data =
                await this.invoicesService.getTotalRevenueByDateInNowWeek(
                    startWeek,
                    endWeek,
                    doctorId,
                );
            if (data) {
                res.json(data);
            } else {
                res.status(404).json({ message: 'Không có doanh thu!' });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async viewInvoice(req: Request, res: Response): Promise<void> {
        try {
            const { pageIndex, pageSize, status } = req.body;
            const data = await this.invoicesService.viewInvoice(
                pageIndex,
                pageSize,
                status,
            );
            if (data) {
                res.status(200).json({
                    pageIndex: pageIndex,
                    data: data,
                    pageSize: pageSize,
                    totalItems: data[0].RecordCount,
                    pageCount: Math.ceil(data[0].RecordCount / pageSize),
                });
            } else {
                res.status(404).json({ message: 'Không tồn tại bản ghi nào!' });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async updateInvoiceStatus(req: Request, res: Response): Promise<void> {
        try {
            const { id, status } = req.body;
            await this.invoicesService.updateInvoiceStatus(id, status);
            res.json({ message: 'Success', result: true });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async getInvoiceByAppointmentId(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            const appointmentId: number = Number(req.params.appointmentId);
            const result =
                await this.invoicesService.getInvoiceByAppointmentId(
                    appointmentId,
                );
            if (result) {
                res.json(result);
            } else {
                res.status(404).json({ message: 'Không tồn tại bản ghi nào!' });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}
