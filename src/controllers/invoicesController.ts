import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { InvoicesService } from '../services/invoicesService';
import { Invoices, InvoicesCreateDto } from '../models/invoices';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
@injectable()
export class InvoiceController {
    constructor(private invoicesService: InvoicesService) {}

    async createInvoicePdf(req: Request, res: Response): Promise<void> {
        const invoiceData = req.body;

        // Đường dẫn file PDF tạm thời
        const filePath = path.join(
            __dirname,
            `invoice_${invoiceData.invoiceId}.pdf`,
        );

        // Tạo file PDF
        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        // Header của hóa đơn
        doc.fontSize(20)
            .text('HÓA ĐƠN KHÁM BỆNH', { align: 'center' })
            .moveDown();

        // Thông tin bệnh nhân
        doc.fontSize(12)
            .text(`Họ và tên: ${invoiceData.patientName}`)
            .text(`Mã hóa đơn: ${invoiceData.invoiceId}`)
            .text(`Ngày khám: ${invoiceData.date}`)
            .moveDown();

        // Danh sách dịch vụ
        doc.text('Danh sách dịch vụ:', { underline: true });

        invoiceData.services.forEach(
            (service: { name: string; cost: number }) => {
                doc.text(
                    `${service.name}: ${service.cost.toLocaleString()} VND`,
                );
            },
        );

        // Tổng tiền
        doc.moveDown()
            .fontSize(14)
            .text(`Tổng tiền: ${invoiceData.total.toLocaleString()} VND`, {
                align: 'right',
            });

        // Footer
        doc.moveDown(2)
            .fontSize(10)
            .text('Cảm ơn quý khách đã sử dụng dịch vụ!', { align: 'center' });

        // Kết thúc và lưu file
        doc.end();

        writeStream.on('finish', () => {
            // Gửi file PDF về client
            res.download(
                filePath,
                `invoice_${invoiceData.invoiceId}.pdf`,
                (err) => {
                    if (err) {
                        console.error('Error while sending file:', err);
                        res.status(500).send('Lỗi khi tải file');
                    }

                    // Xóa file PDF tạm sau khi gửi
                    fs.unlinkSync(filePath);
                },
            );
        });
    }
    async createInvoice(req: Request, res: Response): Promise<void> {
        try {
            const invoice: InvoicesCreateDto = req.body as InvoicesCreateDto;
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
